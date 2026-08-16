import { readFileSync } from "fs";
import { getVendorPath } from "../vendor-path";
import { TMergedEntry } from "../../scripts/dat-merger";

let gbaDatCache: TMergedEntry[] | null = null;

function getGbaDat() {
  if (!gbaDatCache) {
    const jsonPath = getVendorPath("dat", "gba.json");
    gbaDatCache = JSON.parse(readFileSync(jsonPath, "utf-8"));
  }
  return gbaDatCache;
}

export function lookupGbaByCrc(crc: string) {
  return getGbaDat()?.find(
    entry => entry.crc.toLowerCase() === crc.toLowerCase()
  );
}

export function lookupGbaByName(name: string) {
  return getGbaDat()?.filter(entry =>
    entry.name.toLowerCase().includes(name.toLowerCase())
  );
}
