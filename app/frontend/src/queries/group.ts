import { createQueryKeys } from '@lukemorales/query-key-factory';

import { group } from '@/services';

export const groupKeys = createQueryKeys('group', {
  all: () => ({
    queryKey: ['all'],
    queryFn: () => group.all(),
  }),
  myGroup: () => ({
    queryKey: ['myGroup'],
    queryFn: () => group.myGroup(),
  }),
  groupDetail: (id: string) => ({
    queryKey: [id],
    queryFn: () => group.groupDetail(id),
  }),
  groupMembers: (id: string) => ({
    queryKey: [id],
    queryFn: () => group.groupMembers(id),
  }),
  groupInfo: (accessCode: string) => ({
    queryKey: [accessCode],
    queryFn: () => group.groupInfo(accessCode),
  }),
});
