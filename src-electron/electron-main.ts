import "dotenv/config";
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
import { TRomEntry } from "@/types/rom";
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";
import { loadGameMetadata, updateEntryGame } from "./rom/rom-helpers";
import { searchIgdbGames } from "./igdb/igdb-client";

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
    return null;
  }

  const gameFound = await loadGameMetadata(gameId);

  const newEntry: TRomEntry = {
    entryId: randomUUID(),
    gameId: gameFound ? gameId : null,
    path: filePath,
    name: basename(filePath, extname(filePath))
  };

  store.set("library.entries", [...entries, newEntry]);

  return { library: store.get("library"), newEntryId: newEntry.entryId };
});

ipcMain.handle("search-game", async (_, query: string) => {
  try {
    return await searchIgdbGames(query);
  } catch (err) {
    console.error("Erreur recherche IGDB :", err);
    return [];
  }
});

ipcMain.handle(
  "update-entry-game",
  async (_, entryId: string, gameId: string) => {
    await updateEntryGame(entryId, gameId);

    return store.get("library");
  }
);

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
