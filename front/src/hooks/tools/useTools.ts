import { useQuery } from '@tanstack/react-query';
import { toolsApi } from '../../api/tools';

export function useActiveToolsCount() {
  return useQuery({
    queryKey: ['tools', 'active-count'],
    queryFn: () =>
      toolsApi.getAll({ status: 'active' }).then(data => data.length),
  });
}
