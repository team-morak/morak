import {
  ResponseAccessCodeByGroupsDto,
  ResponseApplyListDto,
  ResponseGroupsDto,
  ResponseGroupsWithMemberCountDto,
  ResponseMyGroupsDto,
} from '@morak/apitype/dto/response/groups';
import { ApiProperty } from '@nestjs/swagger';
import { Bigint } from '@morak/apitype/dto/type';

export class GroupsDto implements ResponseGroupsDto {
  @ApiProperty({ description: 'ID of the Group', example: '1' })
  id: Bigint;

  @ApiProperty({ description: 'title of the Group', example: '부스트캠프 웹・모바일 8기' })
  title: string;

  @ApiProperty({ description: 'GroupOwner Id', example: '1' })
  groupOwnerId: Bigint;

  @ApiProperty({ description: 'Group Type Id', example: '1' })
  groupTypeId: number;
}

export class GroupsWithMemberCountDto implements ResponseGroupsWithMemberCountDto {
  @ApiProperty({ description: 'ID of the Group', example: '1' })
  id: Bigint;

  @ApiProperty({ description: 'title of the Group', example: '부스트캠프 웹・모바일 8기' })
  title: string;

  @ApiProperty({ description: 'member count of the Group', example: '200' })
  memberCount: number;
}

export class MyGroupsDto implements ResponseMyGroupsDto {
  @ApiProperty({ description: 'ID of the Group', example: '1' })
  id: Bigint;

  @ApiProperty({ description: 'title of the Group', example: '부스트캠프 웹・모바일 8기' })
  title: string;

  @ApiProperty({ description: 'GroupOwner Id', example: '1' })
  groupOwnerId: Bigint;

  @ApiProperty({ description: 'Group Type Id', example: '1' })
  groupTypeId: number;

  @ApiProperty({ description: 'member count of the Group', example: '200' })
  memberCount: number;

  @ApiProperty({ description: 'access_code of the Group', example: '2de8dc563-0c08-42f2-ac18-2e41ead5fe4b' })
  accessCode: string;
}

export class AccessCodeByGroupsDto implements ResponseAccessCodeByGroupsDto {
  @ApiProperty({ description: 'ID of the Group', example: '1' })
  id: Bigint;

  @ApiProperty({ description: 'title of the Group', example: '부스트캠프 웹・모바일 8기' })
  title: string;

  @ApiProperty({ description: 'GroupOwner Id', example: '1' })
  groupOwnerId: Bigint;

  @ApiProperty({ description: 'Group Type Id', example: '1' })
  groupTypeId: number;

  @ApiProperty({ description: 'member count of the Group', example: '200' })
  memberCount: number;
}

export class GroupApplyListDto implements ResponseApplyListDto {
  @ApiProperty({ description: 'ID of the Group', example: '1' })
  memberId: Bigint;
}
