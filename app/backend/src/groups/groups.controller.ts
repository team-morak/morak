import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { GetUser } from 'libs/decorators/get-user.decorator';
import { AtGuard } from 'src/auth/guards/at.guard';
import { Group, Member } from '@prisma/client';
import { AccessCodeByGroupsDto, GroupApplyListDto, GroupsWithMemberCountDto, MyGroupsDto } from './dto/groups.dto';
import { MemberInformationDto } from 'src/member/dto/member.dto';
import { ParticipantResponseDto } from 'src/mogaco-boards/dto/response-participants.dto';
import { CreateGroupsDto } from './dto/create-groups.dto';

@ApiTags('Group API')
@Controller('groups')
@UseGuards(AtGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get('/')
  @ApiOperation({
    summary: '모든 그룹 조회',
    description: '존재하는 모든 그룹을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: 'Successfully retrieved', type: [GroupsWithMemberCountDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAllGroups(): Promise<(Group & { memberCount: number })[]> {
    return await this.groupsService.getAllGroups();
  }

  @Get('/my-groups')
  @ApiOperation({
    summary: '가입 그룹 확인',
    description: '해당 사용자가 가입한 그룹을 확인합니다.',
  })
  @ApiResponse({ status: 200, description: 'Successfully Check', type: [MyGroupsDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMyGroups(@GetUser() member: Member): Promise<(Group & { memberCount: number })[]> {
    return await this.groupsService.getMyGroups(member);
  }

  @Get('/info')
  @ApiOperation({
    summary: '승인코드를 사용하여 그룹 정보 추출',
    description: '승인 코드를 사용하여 특정 그룹 정보를 추출합니다.',
  })
  @ApiResponse({ status: 201, description: 'Successfully retrieved group information', type: [AccessCodeByGroupsDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Group not found for the provided access code' })
  async getGroupByAccessCode(@Query('access_code') accessCode: string): Promise<Group & { memberCount: number }> {
    return await this.groupsService.getGroupByAccessCode(accessCode);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '특정 그룹 정보 조회',
    description: '특정 그룹의 정보를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: 'Successfully retrieved', type: [GroupsWithMemberCountDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Group with id not found' })
  async getGroups(@Param('id', ParseIntPipe) id: number): Promise<Group & { memberCount: number }> {
    return await this.groupsService.getGroups(id);
  }

  @Get('/:id/members')
  @ApiOperation({
    summary: '특정 그룹 소속 인원 조회',
    description: '특정 그룹의 Id 값으로 해당 그룹의 소속 인원을 조회합니다.',
  })
  @ApiParam({ name: 'id', description: '조회할 그룹의 Id' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved', type: [ParticipantResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAllMembersOfGroup(@Param('id', ParseIntPipe) id: number): Promise<MemberInformationDto[]> {
    return await this.groupsService.getAllMembersOfGroup(id);
  }

  @Post('/')
  @ApiOperation({
    summary: '그룹 생성',
    description: '새로운 그룹을 생성합니다.',
  })
  @ApiBody({ type: CreateGroupsDto })
  @ApiResponse({ status: 201, description: 'Successfully created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createGroups(@Body() createGroupsDto: CreateGroupsDto, @GetUser() member: Member): Promise<void> {
    await this.groupsService.createGroups(createGroupsDto, member);
  }

  @Post('/:id/join')
  @ApiOperation({
    summary: '그룹 참가',
    description: '특정 그룹에 참가합니다.',
  })
  @ApiParam({ name: 'id', description: '참가할 그룹의 Id' })
  @ApiResponse({ status: 201, description: 'Successfully join' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group with id not found' })
  async joinGroup(@Param('id', ParseIntPipe) id: number, @GetUser() member: Member): Promise<void> {
    await this.groupsService.joinGroup(id, member);
  }

  @Get('/:id/apply-list')
  @ApiOperation({
    summary: '그룹 참가 신청 확인',
    description: '특정 그룹에 가입 신청 현황을 확인합니다.',
  })
  @ApiParam({ name: 'id', description: '그룹의 Id' })
  @ApiResponse({ status: 201, description: 'Successfully join' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group with id not found' })
  async getApplyList(@Param('id', ParseIntPipe) id: number, @GetUser() member: Member): Promise<GroupApplyListDto[]> {
    return this.groupsService.getApplyList(id, member);
  }

  @Post('/:id/apply')
  @ApiOperation({
    summary: '그룹 참가 신청',
    description: '특정 그룹에 가입 신청합니다.',
  })
  @ApiParam({ name: 'id', description: '가입 신청할 그룹의 Id' })
  @ApiResponse({ status: 201, description: 'Successfully join' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group with id not found' })
  async applyGroup(@Param('id', ParseIntPipe) id: number, @GetUser() member: Member): Promise<void> {
    return this.groupsService.applyGroup(id, member);
  }

  @Post('/:id/approve')
  @ApiOperation({
    summary: '그룹 참가 승인',
    description: '특정 그룹에 가입 신청을 승인합니다.',
  })
  @ApiResponse({ status: 201, description: 'Successfully join' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group with id not found' })
  async approveGroup(
    @Param('id', ParseIntPipe) id: number,
    @Query('memberId', ParseIntPipe) memberId: number,
    @GetUser() member: Member,
  ): Promise<void> {
    return this.groupsService.approveGroup(id, memberId, member);
  }

  @Delete('/:id/leave')
  @ApiOperation({
    summary: '그룹 참가 취소',
    description: '특정 그룹 참가를 취소합니다.',
  })
  @ApiParam({ name: 'id', description: '참가를 취소할 그룹의 Id' })
  @ApiResponse({ status: 200, description: 'Successfully leaved join' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Group with id not found' })
  async leaveGroup(@Param('id', ParseIntPipe) id: number, @GetUser() member: Member): Promise<void> {
    await this.groupsService.leaveGroup(id, member);
  }

  @Delete('/:id/kick/:memberId')
  @ApiOperation({
    summary: '멤버 강제퇴장',
    description: '특정 그룹에서 멤버를 강제로 퇴장시킵니다.',
  })
  @ApiParam({ name: 'groupId', description: '멤버를 강제로 퇴장시킬 그룹의 Id' })
  @ApiParam({ name: 'memberId', description: '강제로 퇴장시킬 멤버의 Id' })
  @ApiResponse({ status: 200, description: 'Successfully kicked out the member' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Only group owners can kick out members.' })
  @ApiResponse({ status: 404, description: 'Group or member not found' })
  async kickOutMember(
    @Param('id', ParseIntPipe) id: number,
    @Param('memberId', ParseIntPipe) memberId: number,
    @GetUser() groupOwner: Member,
  ): Promise<void> {
    await this.groupsService.kickOutMember(id, memberId, groupOwner);
  }
}
