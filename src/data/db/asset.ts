import { ForDb } from "../../types/app";
import { Asset } from "../../types/asset";
import { getDb } from "./getDb";
import { saveFileLocally } from "./utils";

export async function createAsset(data: ForDb<Asset>) {
  const db = await getDb();
  const localUri = await saveFileLocally(data.uri, data.original_name);

  const result = await db.runAsync(
    `INSERT INTO assets (uri, type, mime_type, original_name, size, created_at)
    VALUES (?, ?, ?, ?, ?);`,
    [
      localUri,
      data.type,
      data.mime_type ?? null,
      data.original_name ?? null,
      data.size ?? null,
    ]
  );

  return result.lastInsertRowId;
}