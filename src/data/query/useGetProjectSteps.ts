import { useSuspenseQuery } from '@tanstack/react-query';
import { readProjectStepsByProjectId } from '../db';
import { QueryKeyNamespace } from './constants';

interface UseGetProjectStepsConfig { 
  id: number; 
}

export function useGetProjectSteps(config: UseGetProjectStepsConfig) {
  const { id } = config;

  const { data, isLoading } = useSuspenseQuery({
    queryKey: [QueryKeyNamespace.PROJECT_STEPS],
    queryFn: () => readProjectStepsByProjectId(id),
  })

  return { data, isLoading }
} 