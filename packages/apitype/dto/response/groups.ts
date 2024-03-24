import { Bigint } from "../type";

export interface ResponseGroupsDto {
  id: Bigint;
  title: string;
  groupOwnerId: Bigint;
  groupTypeId: number;
}

export interface ResponseGroupsWithMemberCountDto {
  id: Bigint;
  title: string;
  memberCount: number;
  groupOwnerId: Bigint;
  groupTypeId: number;
  deletedAt: Date;
  ownerProviderId: string;
}

export interface ResponseGroupsDetailDto {
  id: Bigint;
  title: string;
  memberCount: number;
  groupOwnerId: Bigint;
  groupTypeId: number;
  deletedAt: Date;
  member: {
    providerId: string;
  };
  accessCode: string;
}
export interface ResponseMyGroupsDto {
  id: Bigint;
  title: string;
  groupOwnerId: Bigint;
  groupTypeId: number;
  memberCount: number;
  accessCode: string;
}

export interface ResponseAccessCodeByGroupsDto {
  id: Bigint;
  title: string;
  groupOwnerId: Bigint;
  groupTypeId: number;
  memberCount: number;
}

export interface ResponseApplyListDto {
  memberId: Bigint;
}
