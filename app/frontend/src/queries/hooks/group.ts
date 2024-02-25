import { RequestGroupsDto } from '@morak/apitype';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/queries';
import { group } from '@/services';

export const useCreateGroupQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => group.leave({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.group.myGroup().queryKey,
      });
    },
  });
};

export const useJoinGroupQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => group.join({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.group.myGroup().queryKey,
      });
    },
  });
};

export const useLeaveGroupQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: RequestGroupsDto) => group.create(form),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.group.all().queryKey,
      });
    },
  });
};
