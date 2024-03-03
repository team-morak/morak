import {
  ResponseGroupsDto,
  ResponseMemberDto,
  ResponseAccessCodeByGroupsDto,
} from '@morak/apitype';

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
  groupDetail: async (id: string) => {
    const { data } = await morakAPI.get<ResponseAccessCodeByGroupsDto>(
      `${group.endPoint.default}/${id}`,
    );
    return data;
  },
  groupMembers: async (id: string) => {
    const { data } = await morakAPI.get<ResponseMemberDto[]>(
      `${group.endPoint.default}/${id}/members`,
    );
    return data;
  },
  join: async ({ id }: Pick<ResponseGroupsDto, 'id'>) =>
    morakAPI.post<null>(`${group.endPoint.default}/${id}/join`),
  leave: async ({ id }: Pick<ResponseGroupsDto, 'id'>) =>
    morakAPI.delete<null>(`${group.endPoint.default}/${id}/leave`),
};
