import { ForDb } from "@/src/types/app";
import { Project } from "@/src/types/project";
import { ProjectNewFormValues } from "./types";

export function projectNewFormValuesToProject(values: ProjectNewFormValues): ForDb<Project> {
  return {
    created_at: values.created_at.toLocaleDateString(),
    title: values.title,
    description: values.description,
  }
}