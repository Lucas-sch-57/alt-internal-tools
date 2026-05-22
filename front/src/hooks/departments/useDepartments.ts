import { useQuery } from '@tanstack/react-query';
import { departmentsApi } from '../../api/departments';

export function useDepartmentsCount() {
  return useQuery({
    queryKey: ['departments', 'count'],
    queryFn: () => departmentsApi.getAll().then(data => data.length),
  });
}

export function useGetAllDepartments() {
  return useQuery({
    queryKey: ['departments', 'all'],
    queryFn: () => departmentsApi.getAll(),
  });
}
