import { ProjectStep } from "@/src/data/types";
import { ForDb } from "@/src/types/app";
import { useMutation } from "@tanstack/react-query";
import { createProjectStep } from "../db";
import { queryClient, QueryKeyNamespace } from "../query";

interface UsePostProjectStepConfig {
  projectId: number;
  onMutate?: () => void; 
  onSuccess?: (id: number) => void;
  onError?: () => void;
}

interface UsePostProjectStepResult {
  mutate: (payload: ForDb<ProjectStep>) => Promise<number>;
  isPending: boolean;
}

// Because Tanstack only allows a single argument
interface MutationFnArgs { 
  projectId: number, 
  payload: ForDb<ProjectStep> 
}

export function usePostProjectStep(config: UsePostProjectStepConfig): UsePostProjectStepResult {
  const { onError, onMutate, onSuccess, projectId } = config;
  
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ projectId, payload }: MutationFnArgs) => createProjectStep(projectId, payload),
    onError, 
    onMutate, 
    onSuccess: id => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyNamespace.PROJECT_STEPS]});
      queryClient.invalidateQueries({ queryKey: [QueryKeyNamespace.PROJECT_STEP, id]});
      onSuccess?.(id);
    }
  });

  return {
    mutate: payload => mutateAsync({ projectId, payload }),  
    isPending
  };
}