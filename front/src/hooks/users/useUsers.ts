import { usersApi } from '@/api/users';
import { useQuery } from '@tanstack/react-query';

export function useGetAllUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => usersApi.getAll(),
  });
}
export function useGetUserTools() {
  return useQuery({
    queryKey: ['users', 'tools'],
    queryFn: () => usersApi.getTools(),
  });
}
