import {
  BrowserWindow,
  Menu,
  app,
  dialog,
  ipcMain,
  net,
  protocol
} from "electron";
import path, { basename, extname } from "node:path";
import os from "node:os";
import {
  registerQuasarRuntime,
  resolveElectronAssetsPath
} from "#q-app/electron/main";
import { store } from "./electron-store";
import { computeRomId } from "./rom/rom-id";
import { TGameMetadata, TRomEntry } from "@/types/rom";
import { lookupGbaByCrc } from "./rom/dat-lookup";
import { randomUUID } from "node:crypto";
import { downloadCover } from "./rom/cover-fetcher";
import { pathToFileURL } from "node:url";

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

let mainWindow: BrowserWindow | undefined;

// Window
ipcMain.on("window-minimize", () => mainWindow?.minimize());
ipcMain.on("window-maximize", () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});
ipcMain.on("window-close", () => mainWindow?.close());
ipcMain.on("window-fullscreen", () => {
  if (mainWindow!.isFullScreen()) {
    mainWindow!.setFullScreen(false);
  } else {
    mainWindow!.setFullScreen(true);
  }
});

// Config
ipcMain.handle("config-get", (_, key: string) => store.get(key));
ipcMain.handle("config-set", (_, key: string, value: unknown) => {
  store.set(key, value);
  return true;
});

// Roms
ipcMain.handle("rom-add-file", async () => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    title: "Sélectionner une ROM",
    properties: ["openFile"],
    filters: [{ name: "ROM Game Boy Advance", extensions: ["gba"] }]
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  const filePath = result.filePaths[0]!;
  const gameId = computeRomId(filePath);

  const entries = store.get("library.entries", []) as TRomEntry[];

  const existingSamePath = entries.find(e => e.path === filePath);
  if (existingSamePath) {
    return lookupGbaByCrc(gameId);
  }

  const allMetadata = store.get("library.gameMetadata", []) as TGameMetadata[];
  let metadata = allMetadata.find(m => m.gameId === gameId);
  if (!metadata) {
    const datEntry = lookupGbaByCrc(gameId);

    const coverPath = await downloadCover(gameId, "gba", datEntry?.name ?? "");

    if (datEntry) {
      metadata = {
        gameId,
        name: datEntry?.name,
        console: "gba",
        region: datEntry?.region,
        hasCover: !!coverPath
      };

      store.set("library.gameMetadata", [...allMetadata, metadata]);
    }
  }

  const newEntry: TRomEntry = {
    entryId: randomUUID(),
    gameId: gameId,
    path: filePath,
    name: basename(filePath, extname(filePath))
  };

  store.set("library.entries", [...entries, newEntry]);

  return lookupGbaByCrc(gameId);
});

async function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: resolveElectronAssetsPath("icons/icon.png"), // linux
    useContentSize: true,
    minWidth: 300,
    minHeight: 300,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      // https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.join(import.meta.dirname, "electron-preload.cjs")
    }
  });

  if (import.meta.env.QUASAR_DEV) {
    await mainWindow.loadURL(import.meta.env.QUASAR_APP_URL);
  } else {
    await mainWindow.loadFile("index.html");
  }

  if (import.meta.env.QUASAR_DEBUG) {
    // if on DEV or Production with debug enabled
    // mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  Menu.setApplicationMenu(null);
}

// Protocoles pour le transfert de cover
protocol.registerSchemesAsPrivileged([
  {
    scheme: "app-cover",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true
    }
  }
]);

void app.whenReady().then(async () => {
  protocol.handle("app-cover", request => {
    const url = new URL(request.url);
    const fileName = url.hostname.replace("app-cover://", "");
    const coversDir = path.join(app.getPath("userData"), "covers");
    const filePath = path.join(coversDir, fileName);

    return net.fetch(pathToFileURL(filePath).toString());
  });

  await registerQuasarRuntime();

  void createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});
