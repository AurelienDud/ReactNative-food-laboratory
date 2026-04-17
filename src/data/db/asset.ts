import { ForDb } from "../../types/app";
import { Asset } from "../types/asset";
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

export async function readAssetsByProjectStepId(id: number): Promise<Asset[]> {
  const db = await getDb();
  
  return db.getAllAsync<Asset>(
    `SELECT a.* FROM assets a
    INNER JOIN projectStep_assets sa ON sa.asset_id = a.id
    WHERE sa.projectStep_id = ?
    ORDER BY a.created_at, a.id;`,
    [id]
  );
}

export async function readAssetsByProjectId(id: number): Promise<Asset[]> {
  const db = await getDb();
  
  return db.getAllAsync<Asset>(
    `SELECT DISTINCT a.* FROM assets a
    INNER JOIN projectStep_assets sa ON sa.asset_id = a.id
    INNER JOIN project_projectSteps ta ON ta.projectStep_id = sa.projectStep_id
    WHERE ta.project_id = ?
    ORDER BY a.created_at, a.id;`,
    [id]
  );
}