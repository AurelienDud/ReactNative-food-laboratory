import { ForDb } from "@/src/types/app";
import { Project } from "@/src/types/project";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "../db";
import { queryClient, QueryKeyNamespace } from "../query";

interface UsePostProjectConfig {
  onMutate?: () => void; 
  onSuccess?: (id: number) => void;
  onError?: () => void;
}
interface UsePostProjectResult {
  mutate: (payload: ForDb<Project>) => Promise<number>;
  isPending: boolean;
}

export function usePostProject(config: UsePostProjectConfig = {}): UsePostProjectResult {
  const { onError, onMutate, onSuccess } = config;
  
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProject,
    onError, 
    onMutate, 
    onSuccess: id => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyNamespace.PROJECTS]});
      queryClient.invalidateQueries({ queryKey: [QueryKeyNamespace.PROJECT, id]});
      onSuccess?.(id);
    }
  });

  return {
    mutate: payload => mutateAsync(payload),  
    isPending
  };
}