import { ProjectStep } from "@/src/data/types";
import { ForDb } from "@/src/types/app";
import { StepNewFormValues } from "./types";

export function stepNewFormValuesToProject(values: StepNewFormValues): ForDb<ProjectStep> {
  return {
    occurred_at: values.occurred_at.toLocaleDateString(),
    title: values.title,
    description: values.description,
  }
}