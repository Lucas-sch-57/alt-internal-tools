import { usersApi } from '@/api/users';
import { useQuery } from '@tanstack/react-query';

export function useGetAllUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => usersApi.getAll(),
  });
}
