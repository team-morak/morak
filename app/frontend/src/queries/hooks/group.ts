import { useMutation, useQueryClient } from '@tanstack/react-query';

import { group } from '@/services';

export const useDeleteGroupQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => group.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['group'],
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
        queryKey: ['group'],
      });
    },
  });
};

export const useKickMemberQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, memberId }: { id: string; memberId: string }) =>
      group.kick({ id, memberId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['group'],
      });
    },
  });
};

export const useLeaveGroupQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => group.leave({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['group'],
      });
    },
  });
};
