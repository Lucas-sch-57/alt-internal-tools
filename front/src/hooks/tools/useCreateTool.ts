import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ToolFormData } from '../../validators/tools';
import { toolsApi } from '../../api/tools';

export const useCreateTool = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ToolFormData) => toolsApi.create(data),
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ['tools'] }), onSuccess?.());
    },
  });
};
