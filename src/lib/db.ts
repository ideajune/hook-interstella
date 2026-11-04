import fs from "fs";
import os from "os";
import path from "path";
import { INITIAL_DB } from "./initial-data";
import { DatabaseSchema } from "./types";

const BUNDLED_DB_FILE = path.join(process.cwd(), "data", "database.json");
const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

const DATA_DIR = IS_SERVERLESS
  ? path.join(os.tmpdir(), "hook-interstella-data")
  : path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "database.json");

let memoryCache: DatabaseSchema | null = null;
let lastMtimeMs = 0;

function ensureDbFile(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      if (IS_SERVERLESS && fs.existsSync(BUNDLED_DB_FILE)) {
        fs.copyFileSync(BUNDLED_DB_FILE, DB_FILE);
      } else {
        fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DB, null, 2), "utf-8");
      }
    }
  } catch {
    // Fallback to in-memory cache if filesystem is restricted
  }
}

export function readDb(): DatabaseSchema {
  try {
    ensureDbFile();
    if (fs.existsSync(DB_FILE)) {
      const stat = fs.statSync(DB_FILE);
      if (memoryCache && stat.mtimeMs === lastMtimeMs) {
        return memoryCache;
      }
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      memoryCache = JSON.parse(raw) as DatabaseSchema;
      lastMtimeMs = stat.mtimeMs;
      return memoryCache;
    }
    if (fs.existsSync(BUNDLED_DB_FILE)) {
      const raw = fs.readFileSync(BUNDLED_DB_FILE, "utf-8");
      memoryCache = JSON.parse(raw) as DatabaseSchema;
      return memoryCache;
    }
    return memoryCache ?? structuredClone(INITIAL_DB);
  } catch {
    return memoryCache ?? structuredClone(INITIAL_DB);
  }
}

export function writeDb(data: DatabaseSchema): void {
  memoryCache = data;
  try {
    ensureDbFile();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    lastMtimeMs = fs.statSync(DB_FILE).mtimeMs;
  } catch {
    // Keep updated state in memoryCache if disk write is unavailable
  }
}

export function updateDb<T>(mutator: (db: DatabaseSchema) => T): T {
  const db = readDb();
  const result = mutator(db);
  writeDb(db);
  return result;
}
