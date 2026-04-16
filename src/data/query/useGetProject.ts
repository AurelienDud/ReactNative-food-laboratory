import { useSuspenseQuery } from '@tanstack/react-query';
import { readProject } from '../db';
import { QueryKeyNamespace } from './constants';

interface UseGetProjectConfig { 
  id: number; 
}

export function useGetProject(config: UseGetProjectConfig) {
  const { id } = config;
  
  const { data, isLoading } = useSuspenseQuery({
    queryKey: [QueryKeyNamespace.PROJECT, id],
    queryFn: () => readProject(id),
  })

  return { data, isLoading }
}