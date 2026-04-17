import { getDb } from "./getDb";

export async function initDb(): Promise<void> {
  try {
    const db = await getDb();
    
await db.execAsync(`
  CREATE TABLE IF NOT EXISTS projects (
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS projectSteps (
    occurred_at TEXT DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uri TEXT NOT NULL,
    type TEXT NOT NULL,
    mime_type TEXT,
    original_name TEXT,
    size INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS project_projectSteps (
    project_id INTEGER NOT NULL,
    projectStep_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, projectStep_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (projectStep_id) REFERENCES projectSteps(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS projectStep_assets (
    projectStep_id INTEGER NOT NULL,
    asset_id INTEGER NOT NULL,
    PRIMARY KEY (projectStep_id, asset_id),
    FOREIGN KEY (projectStep_id) REFERENCES projectSteps(id) ON DELETE CASCADE,
    FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_project_projectSteps_projectStep ON project_projectSteps(projectStep_id);
  CREATE INDEX IF NOT EXISTS idx_projectStep_assets_asset ON projectStep_assets(asset_id);
`);
  } catch (error) {
    throw new Error(`Error when initializing the DB. ${error}`)
  }
}