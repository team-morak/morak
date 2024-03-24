import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { ReactComponent as People } from '@/assets/icons/people.svg';
import { Error, Loading } from '@/components';
import { GroupButton } from '@/components/Group/GroupButton';
import { queryKeys } from '@/queries';
import { getMyInfoQuery } from '@/queries/hooks';
import { vars } from '@/styles';

import { GroupMember } from './GroupMember';
import * as styles from './index.css';

const { grayscale200 } = vars.color;

export function GroupDetailPage() {
  const { groupId } = useParams();
  const { data: currentUser } = useQuery(getMyInfoQuery);
  const { data: groupMemberData, isLoading: groupMemberDataLoading } = useQuery(
    queryKeys.group.groupMembers(groupId!),
  );
  const { data: groupData, isLoading: groupDataLoading } = useQuery(
    queryKeys.group.groupDetail(groupId!),
  );

  if (!currentUser) {
    return <Error message="사용자 정보를 불러오지 못했습니다." />;
  }

  if (groupMemberDataLoading || groupDataLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Loading color={vars.color.grayscale200} />
        </div>
      </div>
    );
  }

  if (!groupData || !groupMemberData) {
    return (
      <div className={styles.container}>
        <Error message="그룹 정보를 불러오지 못했습니다." />
      </div>
    );
  }

  const isOwner = currentUser.providerId === groupData.member.providerId;
  const joined = groupMemberData.some(
    (member) => member.providerId === currentUser.providerId,
  );

  return (
    <div className={styles.container}>
      <div className={styles.groupHeader}>
        <div className={styles.groupTitleContainer}>
          <div className={styles.groupTitle}>{groupData.title}</div>
          <div>
            <People width={24} height={24} fill={grayscale200} />
          </div>
          <div className={styles.groupPeopleNumber}>
            {groupData.memberCount}
          </div>
        </div>
        <GroupButton
          id={groupId!}
          closed={groupData.groupTypeId === 0}
          joined={joined}
          owned={isOwner}
          deleted={groupData.deletedAt !== null}
        />
      </div>
      <ul className={styles.memberContainer}>
        {groupMemberData.map(({ id, providerId, nickname, profilePicture }) => (
          <li key={providerId}>
            <GroupMember
              id={groupData.id}
              memberId={id}
              userName={nickname}
              profileSrc={profilePicture}
              groupOwner={providerId === groupData.member.providerId}
              kickButton={isOwner}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
