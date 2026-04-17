import { ForDb } from "../../types/app";
import { Project } from "../types/project";
import { getDb } from "./getDb";
import { cleanNullableText } from "./utils";

export async function createProject(data: ForDb<Project>): Promise<number> {
  const db = await getDb();

  const result = await db.runAsync(
    'INSERT INTO projects (description, title) VALUES (?, ?, ?);',
    [
      cleanNullableText(data.description), 
      data.title
    ]
  );

  return result.lastInsertRowId;
}

export async function readProject(id: number): Promise<Project|null> {
  const db = await getDb();

  return db.getFirstAsync<Project>(
    'SELECT * FROM projects WHERE id = ?;',
    [id]
  );
}

export async function readProjects(): Promise<Project[]> {
  const db = await getDb();

  return db.getAllAsync<Project>(
    'SELECT * FROM projects',
  );
}
