import { ForDb } from "@/src/types/app";
import { ProjectStep } from "../types";
import { getDb } from "./getDb";
import { cleanNullableText } from "./utils";

export async function createProjectStep(data: ForDb<ProjectStep>): Promise<number> {
  const db = await getDb();

  const result = await db.runAsync(
    'INSERT INTO projects (occurred_at description, title) VALUES (?, ?, ?);',
    [
      data.occurred_at,
      cleanNullableText(data.description), 
      data.title
    ]
  );

  return result.lastInsertRowId;
}

export async function readProjectStepById(id: number): Promise<ProjectStep[]> {
  const db = await getDb();
  
  return db.getAllAsync<ProjectStep>(
    'SELECT * FROM projectSteps WHERE id = ?;',
    [id]
  );
}

export async function readProjectStepsByProjectId(id: number): Promise<ProjectStep[]> {
  const db = await getDb();
  
  return db.getAllAsync<ProjectStep>(
    `SELECT a.* FROM projectSteps a
    INNER JOIN project_projectSteps sa ON sa.projectStep_id = a.id
    WHERE sa.project_id = ?
    ORDER BY a.occurred_at, a.id;`,
    [id]
  );
}