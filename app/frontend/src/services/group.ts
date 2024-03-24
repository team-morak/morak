import {
  ResponseGroupsDto,
  ResponseMemberDto,
  ResponseAccessCodeByGroupsDto,
  ResponseGroupsDetailDto,
} from '@morak/apitype';

import { morakAPI } from './morakAPI';

export const group = {
  endPoint: {
    default: '/groups',
  },

  all: async () => {
    const { data } = await morakAPI.get<ResponseGroupsDetailDto[]>(
      group.endPoint.default,
    );
    return data;
  },
  myGroup: async () => {
    const { data } = await morakAPI.get<ResponseGroupsDetailDto[]>(
      `${group.endPoint.default}/my-groups`,
    );
    return data;
  },
  groupDetail: async (id: string) => {
    const { data } = await morakAPI.get<ResponseGroupsDetailDto>(
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
  groupInfo: async (accessCode: string) => {
    const { data } = await morakAPI.get<ResponseAccessCodeByGroupsDto>(
      `${group.endPoint.default}/info`,
      {
        params: { access_code: accessCode },
      },
    );
    return data;
  },
  join: async ({ id }: Pick<ResponseGroupsDto, 'id'>) =>
    morakAPI.post<null>(`${group.endPoint.default}/${id}/join`),
  leave: async ({ id }: Pick<ResponseGroupsDto, 'id'>) =>
    morakAPI.delete<null>(`${group.endPoint.default}/${id}/leave`),
  kick: async ({ id, memberId }: { id: string; memberId: string }) =>
    morakAPI.delete<null>(`${group.endPoint.default}/${id}/kick/${memberId}`),
  delete: async (id: string) =>
    morakAPI.delete<null>(`${group.endPoint.default}/${id}`),
};
