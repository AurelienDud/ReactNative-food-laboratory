import { Project } from "@/src/data/types";
import { ForDb } from "@/src/types/app";
import { ProjectNewFormValues } from "./types";

export function projectNewFormValuesToProject(values: ProjectNewFormValues): ForDb<Project> {
  return {
    title: values.title,
    description: values.description,
  }
}