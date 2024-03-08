import { useParams } from 'react-router-dom';

import { Button } from '@morak/ui';
import { useQuery } from '@tanstack/react-query';

import { ReactComponent as People } from '@/assets/icons/people.svg';
import { Error, Loading } from '@/components';
import { queryKeys } from '@/queries';
import { vars } from '@/styles';

import { GroupMember } from './GroupMember';
import * as styles from './index.css';

const { grayscale200 } = vars.color;

export function GroupDetailPage() {
  const { id } = useParams();
  const { data: groupMemberData, isLoading: groupMemberDataLoading } = useQuery(
    queryKeys.group.groupMembers(id!),
  );
  const { data: groupData, isLoading: groupDataLoading } = useQuery(
    queryKeys.group.groupDetail(id!),
  );

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
        <Button theme="danger" shape="fill" size="medium">
          그룹 삭제
        </Button>
      </div>
      <ul className={styles.memberContainer}>
        {groupMemberData.map(({ providerId, nickname, profilePicture }) => (
          <li key={providerId}>
            <GroupMember userName={nickname} profileSrc={profilePicture} />
          </li>
        ))}
      </ul>
    </div>
  );
}
