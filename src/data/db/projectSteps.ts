import { ForDb } from "@/src/types/app";
import { ProjectStep } from "../types";
import { getDb } from "./getDb";
import { cleanNullableText } from "./utils";

export async function createProjectStep(projectId: number, data: ForDb<ProjectStep>): Promise<number> {
  const db = await getDb();

  const { lastInsertRowId: stepId } = await db.runAsync(
    'INSERT INTO projectSteps (occurred_at, description, title) VALUES (?, ?, ?);',
    [
      data.occurred_at,
      cleanNullableText(data.description), 
      data.title
    ]
  );

  await db.runAsync(
    `INSERT INTO project_projectSteps (project_id, projectStep_id) VALUES (?, ?)`,
    [projectId, stepId]
  );

  return stepId;
}

export async function readProjectStepById(id: number): Promise<ProjectStep|null> {
  const db = await getDb();
  
  return db.getFirstAsync<ProjectStep>(
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