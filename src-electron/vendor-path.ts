import { app } from "electron";
import path from "path";

export function getVendorPath(...segments: string[]) {
  const base = app.isPackaged
    ? process.resourcesPath
    : path.join(process.cwd(), "src-electron", "vendor");

  const relativeBase = app.isPackaged ? path.join(base, "vendor") : base;

  return path.join(relativeBase, ...segments);
}
