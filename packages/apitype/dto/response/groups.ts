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
}

export interface ResponseMyGroupsDto {
  id: Bigint;
  title: string;
  groupOwnerId: Bigint;
  groupTypeId: number;
  memberCount: number;
  accessCode: string;
}

export interface ResponseAccesCodeByGroupsDto {
  id: Bigint;
  title: string;
  groupOwnerId: Bigint;
  groupTypeId: number;
  memberCount: number;
}