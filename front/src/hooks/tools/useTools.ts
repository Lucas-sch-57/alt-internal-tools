import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { toolsApi } from '../../api/tools';
import type { ToolFormData } from '../../validators/tools';

export function useActiveToolsCount() {
  return useQuery({
    queryKey: ['tools', 'active-count'],
    queryFn: () =>
      toolsApi.getAll({ status: 'active' }).then(data => data.length),
  });
}

export function useRecentTools() {
  return useQuery({
    queryKey: ['tools', 'recent'],
    queryFn: () => toolsApi.getRecent(),
  });
}

export function useGetAll() {
  return useQuery({
    queryKey: ['tools'],
    queryFn: () => toolsApi.getAll(),
  });
}
