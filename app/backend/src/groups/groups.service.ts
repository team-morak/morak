import { Injectable } from '@nestjs/common';
import { GroupsRepository } from './groups.repository';
import { Group, Member } from '@prisma/client';
import { MemberInformationDto } from 'src/member/dto/member.dto';
import { CreateGroupsDto } from './dto/create-groups.dto';
import { GroupApplyListDto } from './dto/groups.dto';

@Injectable()
export class GroupsService {
  constructor(private groupsRepository: GroupsRepository) {}

  async getAllGroups(): Promise<(Group & { memberCount: number })[]> {
    return await this.groupsRepository.getAllGroups();
  }

  async getGroupByAccessCode(accessCode: string): Promise<Group & { memberCount: number }> {
    return await this.groupsRepository.getGroupByAccessCode(accessCode);
  }

  async getGroups(id: number): Promise<Group & { memberCount: number }> {
    return await this.groupsRepository.getGroups(id);
  }

  async getAllMembersOfGroup(id: number): Promise<MemberInformationDto[]> {
    return await this.groupsRepository.getAllMembersOfGroup(id);
  }

  async createGroups(createGroupsDto: CreateGroupsDto, member: Member): Promise<void> {
    await this.groupsRepository.createGroups(createGroupsDto, member);
  }

  async joinGroup(id: number, member: Member): Promise<void> {
    await this.groupsRepository.joinGroup(id, member);
  }

  async applyGroup(groupId: number, member: Member): Promise<void> {
    const isJoined = await this.groupsRepository.isJoinedGroup(groupId, Number(member.id));
    if (!isJoined) {
      return this.groupsRepository.applyGroupJoin(member.id, groupId);
    }
  }

  async approveGroup(groupId: number, approvedMemberId: number, member: Member): Promise<void> {
    const isOwner = await this.groupsRepository.isGroupOwner(groupId, Number(member.id));
    if (isOwner) {
      return this.groupsRepository.approveGroupJoin(approvedMemberId, groupId);
    }
  }

  async leaveGroup(id: number, member: Member): Promise<void> {
    await this.groupsRepository.leaveGroup(id, member);
  }

  async getMyGroups(member: Member): Promise<(Group & { memberCount: number })[]> {
    return await this.groupsRepository.getMyGroups(member);
  }

  async kickOutMember(id: number, memberId: number, groupOwner: Member): Promise<void> {
    await this.groupsRepository.kickOutMember(id, memberId, groupOwner);
  }

  async getApplyList(groupId: number, member: Member): Promise<GroupApplyListDto[]> {
    if (this.groupsRepository.isGroupOwner(groupId, Number(member.id))) {
      const userList = await this.groupsRepository.getMembershipRequests(groupId);

      return userList.map((value) => ({
        memberId: value.userId.toString(),
      }));
    }
    return [];
  }
}
