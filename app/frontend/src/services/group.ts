import { RequestGroupsDto, ResponseGroupsDto } from '@morak/apitype';

import { morakAPI } from './morakAPI';

export const group = {
  endPoint: {
    default: '/groups',
  },

  all: async () => {
    const { data } = await morakAPI.get<ResponseGroupsDto[]>(
      group.endPoint.default,
    );
    return data;
  },
  myGroup: async () => {
    const { data } = await morakAPI.get<ResponseGroupsDto[]>(
      `${group.endPoint.default}/my-groups`,
    );
    return data;
  },
  join: async ({ id }: Pick<ResponseGroupsDto, 'id'>) =>
    morakAPI.post<null>(`${group.endPoint.default}/${id}/join`),
  leave: async ({ id }: Pick<ResponseGroupsDto, 'id'>) =>
    morakAPI.delete<null>(`${group.endPoint.default}/${id}/leave`),
  create: async (form: RequestGroupsDto) =>
    morakAPI.post<null>(group.endPoint.default, form),
};
