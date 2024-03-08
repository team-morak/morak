import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Group, Member, Prisma } from '@prisma/client';
import { MemberInformationDto } from 'src/member/dto/member.dto';
import { CreateGroupsDto } from './dto/create-groups.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GroupsRepository {
  constructor(private prisma: PrismaService) {}

  private async getGroupMemberCount(groupId: number): Promise<number> {
    return this.prisma.groupToUser.count({
      where: {
        groupId: groupId,
      },
    });
  }

  private async getGroupAccessCode(groupId: number): Promise<string> {
    const groupAccessCode = await this.prisma.groupAccessCode.findFirst({
      where: { groupId },
    });

    return groupAccessCode.accessCode;
  }

  async getAllGroups(): Promise<(Group & { memberCount: number })[]> {
    const groups = await this.prisma.group.findMany();

    const groupPromises = groups.map(async (group) => {
      const memberCount = await this.getGroupMemberCount(Number(group.id));
      return { ...group, memberCount };
    });

    return Promise.all(groupPromises);
  }

  async getGroupByAccessCode(accessCode: string): Promise<Group & { memberCount: number }> {
    const groupAccessCode = await this.prisma.groupAccessCode.findUnique({
      where: {
        accessCode: accessCode,
      },
      include: {
        groupAccessCodes: true,
      },
    });

    if (!groupAccessCode) {
      throw new NotFoundException('Group not found for the provided access code');
    }

    const memberCount = await this.getGroupMemberCount(Number(groupAccessCode.groupId));
    return {
      ...groupAccessCode.groupAccessCodes,
      memberCount,
    };
  }

  async getGroups(id: number): Promise<Group & { memberCount: number }> {
    const group = await this.prisma.group.findUnique({
      where: {
        id: id,
      },
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found.`);
    }

    const memberCount = await this.getGroupMemberCount(id);
    return { ...group, memberCount };
  }

  async getAllMembersOfGroup(groupId: number): Promise<MemberInformationDto[]> {
    const groupToUsers = await this.prisma.groupToUser.findMany({
      where: {
        groupId: groupId,
      },
      include: {
        user: true,
      },
    });

    return groupToUsers.map((groupToUser) => ({
      providerId: groupToUser.user.providerId,
      email: groupToUser.user.email,
      nickname: groupToUser.user.nickname,
      profilePicture: groupToUser.user.profilePicture,
    }));
  }

  async createGroups(createGroupsDto: CreateGroupsDto, member: Member): Promise<void> {
    const { title, groupTypeId } = createGroupsDto;

    const group = await this.prisma.group.create({
      data: {
        title: title,
        groupTypeId: groupTypeId,
        member: {
          connect: { id: Number(member.id) },
        },
      },
    });

    const accessCode = uuidv4();
    await this.prisma.groupAccessCode.create({
      data: {
        accessCode,
        groupId: group.id,
      },
    });

    await this.joinGroup(Number(group.id), member);
  }

  async joinGroup(id: number, member: Member): Promise<void> {
    const group = await this.prisma.group.findUnique({
      where: { id },
    });

    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }

    const existingGroup = await this.prisma.groupToUser.findUnique({
      where: {
        groupId_userId: {
          groupId: group.id,
          userId: member.id,
        },
      },
    });

    if (existingGroup) {
      throw new ForbiddenException(`Member with id ${member.id} is already participating in Group with id ${id}`);
    }

    await this.prisma.groupToUser.create({
      data: {
        groupId: group.id,
        userId: member.id,
      },
    });
  }

  async leaveGroup(groupId: number, member: Member): Promise<void> {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found.`);
    }

    const isMemberOfGroup = await this.prisma.groupToUser.findUnique({
      where: {
        groupId_userId: {
          groupId: groupId,
          userId: member.id,
        },
      },
    });

    if (!isMemberOfGroup) {
      throw new NotFoundException(`Member with ID ${member.id} is not a member of Group with ID ${groupId}.`);
    }

    await this.prisma.groupToUser.delete({
      where: {
        groupId_userId: {
          groupId: groupId,
          userId: member.id,
        },
      },
    });
  }

  async getMyGroups(member: Member): Promise<(Group & { memberCount: number; accessCode: string })[]> {
    const groupToUsers = await this.prisma.groupToUser.findMany({
      where: { userId: member.id },
      include: {
        group: true,
      },
    });

    const groupsWithMemberCount = groupToUsers.map(async (groupToUser) => {
      const memberCount = await this.getGroupMemberCount(Number(groupToUser.groupId));
      const accessCode = await this.getGroupAccessCode(Number(groupToUser.groupId));
      return { ...groupToUser.group, memberCount, accessCode };
    });

    return Promise.all(groupsWithMemberCount);
  }

  async isJoinedGroup(groupId: number, memberId: number): Promise<boolean> {
    const userToGroup = await this.prisma.groupToUser.findUnique({
      where: {
        groupId_userId: {
          groupId: groupId,
          userId: memberId,
        },
      },
    });

    if (userToGroup) {
      return true;
    }

    return false;
  }

  async isGroupOwner(groupId: number, groupOwnerId: number): Promise<boolean> {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException(`Group with id ${groupId} not found.`);
    }

    return Number(group.groupOwnerId) === groupOwnerId;
  }

  async kickOutMember(id: number, memberId: number, groupOwner: Member): Promise<void> {
    const isGroupOwner = await this.isGroupOwner(id, Number(groupOwner.id));
    if (!isGroupOwner) {
      throw new ForbiddenException('Only group owners can kick out members.');
    }

    await this.prisma.groupToUser.delete({
      where: {
        groupId_userId: {
          groupId: id,
          userId: memberId,
        },
      },
    });
  }

  async applyGroupJoin(memberId: bigint, groupId: number): Promise<void> {
    try {
      await this.prisma.membershipRequest.create({
        data: {
          groupId: groupId,
          userId: memberId,
          status: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.log('A membership request for this group and user already exists');
        }
      } else {
        throw error;
      }
    }
  }

  async approveGroupJoin(memberId: number, groupId: number): Promise<void> {
    const membershipRequest = await this.prisma.membershipRequest.findUnique({
      where: {
        groupId_userId: {
          groupId: groupId,
          userId: memberId,
        },
      },
    });
    if (membershipRequest) {
      await this.prisma.membershipRequest.update({
        where: {
          id: membershipRequest.id,
        },
        data: {
          status: 1,
        },
      });
      await this.prisma.groupToUser.create({
        data: {
          groupId: groupId,
          userId: memberId,
        },
      });
    } else {
      console.error('Membership request not found.');
    }
  }

  async getMembershipRequests(groupId: number): Promise<{ userId: bigint }[]> {
    return await this.prisma.membershipRequest.findMany({
      where: {
        groupId,
      },
      select: {
        userId: true, // userId 필드만 선택
      },
    });
  }
}
