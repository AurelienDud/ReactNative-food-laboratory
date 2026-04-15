import { useSuspenseQuery } from '@tanstack/react-query'
import { readProjects } from '../db'

export function useGetProject() {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ['projects'],
    queryFn: readProjects,
  })

  return { data, isLoading }
}