import { Asset } from "../../types/asset";
import { getDb } from "./getDb";

export async function readAssetsByProjectId(id: number): Promise<Asset[]> {
  const db = await getDb();
  
  return db.getAllAsync<Asset>(
    `SELECT a.* FROM assets a
    INNER JOIN project_assets sa ON sa.asset_id = a.id
    WHERE sa.project_id = ?
    ORDER BY sa.position, a.id;`,
    [id]
  );
}