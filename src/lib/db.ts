import fs from "fs";
import path from "path";
import { INITIAL_DB } from "./initial-data";
import { DatabaseSchema } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "database.json");

let memoryCache: DatabaseSchema | null = null;
let lastMtimeMs = 0;

function ensureDbFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DB, null, 2), "utf-8");
  }
}

export function readDb(): DatabaseSchema {
  try {
    ensureDbFile();
    const stat = fs.statSync(DB_FILE);
    if (memoryCache && stat.mtimeMs === lastMtimeMs) {
      return memoryCache;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    memoryCache = JSON.parse(raw) as DatabaseSchema;
    lastMtimeMs = stat.mtimeMs;
    return memoryCache;
  } catch {
    return memoryCache ?? structuredClone(INITIAL_DB);
  }
}

export function writeDb(data: DatabaseSchema): void {
  ensureDbFile();
  memoryCache = data;
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  try {
    lastMtimeMs = fs.statSync(DB_FILE).mtimeMs;
  } catch {
    // ignore stat error
  }
}

export function updateDb<T>(mutator: (db: DatabaseSchema) => T): T {
  const db = readDb();
  const result = mutator(db);
  writeDb(db);
  return result;
}
