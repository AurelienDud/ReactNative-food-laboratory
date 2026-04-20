import { useSuspenseQuery } from '@tanstack/react-query';
import { readProjectStepById } from '../db';
import { QueryKeyNamespace } from './constants';

interface UseGetProjectStepsConfig { 
  stepId: number; 
}

export function useGetProjectStep(config: UseGetProjectStepsConfig) {
  const { stepId } = config;

  const { data, isLoading } = useSuspenseQuery({
    queryKey: [QueryKeyNamespace.PROJECT_STEP, stepId],
    queryFn: () => readProjectStepById(stepId),
  })

  return { data, isLoading }
} 