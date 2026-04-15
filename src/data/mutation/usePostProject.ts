import { ForDb } from "@/src/types/app";
import { Project } from "@/src/types/project";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "../db";

interface UsePostProjectResult {
  mutate: (payload: ForDb<Project>) => void;
  isPending: boolean;
}

export function usePostProject(): UsePostProjectResult {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProject,
  });

  return {
    mutate: payload => mutateAsync(payload),  
    isPending
  };
}