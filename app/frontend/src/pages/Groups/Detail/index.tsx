import { useParams } from 'react-router-dom';

import { Button } from '@morak/ui';
import { useQuery } from '@tanstack/react-query';

import { ReactComponent as People } from '@/assets/icons/people.svg';
import { Error, Loading } from '@/components';
import { useGroupModal } from '@/components/Group/hooks/useGroupModal';
import { queryKeys } from '@/queries';
import { getMyInfoQuery } from '@/queries/hooks';
import { useDeleteGroupQuery } from '@/queries/hooks/group';
import { vars } from '@/styles';

import { GroupMember } from './GroupMember';
import * as styles from './index.css';

const { grayscale200 } = vars.color;

export function GroupDetailPage() {
  const { id } = useParams();
  const { data: currentUser } = useQuery(getMyInfoQuery);
  const { data: groupMemberData, isLoading: groupMemberDataLoading } = useQuery(
    queryKeys.group.groupMembers(id!),
  );
  const { data: groupData, isLoading: groupDataLoading } = useQuery(
    queryKeys.group.groupDetail(id!),
  );
  const { mutate: deleteGroup } = useDeleteGroupQuery();
  const { openDeleteGroupModal } = useGroupModal();

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

  const isOwner = currentUser.id === groupData.groupOwnerId;

  const onClickDelete = () =>
    openDeleteGroupModal({ onClickConfirm: () => deleteGroup(groupData.id) });

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
        {isOwner && (
          <Button
            theme="danger"
            shape="fill"
            size="medium"
            onClick={onClickDelete}
          >
            그룹 삭제
          </Button>
        )}
      </div>
      <ul className={styles.memberContainer}>
        {groupMemberData.map(({ providerId, nickname, profilePicture }) => (
          <li key={providerId}>
            <GroupMember
              id={groupData.id}
              memberId={providerId}
              userName={nickname}
              profileSrc={profilePicture}
              isOwner={isOwner}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
