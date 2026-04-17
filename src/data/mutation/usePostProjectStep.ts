import { ProjectStep } from "@/src/data/types";
import { ForDb } from "@/src/types/app";
import { useMutation } from "@tanstack/react-query";
import { createProjectStep } from "../db";
import { queryClient, QueryKeyNamespace } from "../query";

interface UsePostProjectStepConfig {
  onMutate?: () => void; 
  onSuccess?: (id: number) => void;
  onError?: () => void;
}
interface UsePostProjectStepResult {
  mutate: (payload: ForDb<ProjectStep>) => Promise<number>;
  isPending: boolean;
}

export function usePostProjectStep(config: UsePostProjectStepConfig = {}): UsePostProjectStepResult {
  const { onError, onMutate, onSuccess } = config;
  
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProjectStep,
    onError, 
    onMutate, 
    onSuccess: id => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyNamespace.PROJECT_STEPS]});
      queryClient.invalidateQueries({ queryKey: [QueryKeyNamespace.PROJECT_STEP, id]});
      onSuccess?.(id);
    }
  });

  return {
    mutate: payload => mutateAsync(payload),  
    isPending
  };
}