import { useSuspenseQuery } from '@tanstack/react-query';
import { readProject } from '../db';

interface UseGetProjectConfig { 
  id: number; 
}

export function useGetProject(config: UseGetProjectConfig) {
  const { id } = config;
  
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ['project', id],
    queryFn: () => readProject(id),
  })

  return { data, isLoading }
}