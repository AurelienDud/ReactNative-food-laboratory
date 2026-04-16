import { useSuspenseQuery } from '@tanstack/react-query'
import { readProjects } from '../db'
import { QueryKeyNamespace } from './constants'

export function useGetProjects() {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: [QueryKeyNamespace.PROJECTS],
    queryFn: readProjects,
  })

  return { data, isLoading }
}