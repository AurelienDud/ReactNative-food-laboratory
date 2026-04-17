import { ProjectStep } from "@/src/data/types";
import { ForDb } from "@/src/types/app";
import { ProjectStepNewFormValues } from "./types";

export function projectStepNewFormValuesToProject(values: ProjectStepNewFormValues): ForDb<ProjectStep> {
  return {
    occurred_at: values.occurred_at.toLocaleDateString(),
    title: values.title,
    description: values.description,
  }
}