import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@morak/ui';
import { useQuery } from '@tanstack/react-query';

import { ReactComponent as Lock } from '@/assets/icons/lock.svg';
import { ReactComponent as People } from '@/assets/icons/people.svg';
import { Error, Loading } from '@/components';
import { useGroupJoinAndLeave } from '@/components/Group/hooks/useGroupJoinLeave';
import { useGroupModal } from '@/components/Group/hooks/useGroupModal';
import { queryKeys } from '@/queries';
import { fontStyle, vars } from '@/styles';

import * as styles from './index.css';

const { sansBold36 } = fontStyle;
const { grayscale200 } = vars.color;

export function GroupJoinPage() {
  const navigate = useNavigate();
  const { openJoinModal } = useGroupModal();
  const { handleJoin } = useGroupJoinAndLeave();
  const accessCode = new URLSearchParams(useLocation().search).get(
    'access_code',
  );
  const {
    data: myGroup,
    isLoading: isMyGroupLoading,
    isSuccess: isMyGroupSuccess,
  } = useQuery(queryKeys.group.myGroup());
  const {
    data: group,
    isLoading: isGroupLoading,
    isSuccess: isGroupSuccess,
  } = useQuery(queryKeys.group.groupInfo(accessCode!));

  const goBack = () => navigate(-1);

  const onClickJoin = () => {
    if (!group) {
      return;
    }

    openJoinModal({ onClickConfirm: () => handleJoin(group.id) });
  };

  if (isMyGroupLoading || isGroupLoading) {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );
  }

  if (!isMyGroupSuccess || !isGroupSuccess || !group) {
    return (
      <div className={styles.container}>
        <Error message="유효하지 않은 초대 코드입니다." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={sansBold36}>그룹 참여</h2>
      <div className={styles.group}>
        <div className={styles.groupTitle}>
          <span>{group.title}</span>
          {group.groupTypeId === 0 && (
            <Lock width={24} height={24} fill={grayscale200} />
          )}
        </div>
        <span className={styles.participants}>
          <People width={24} height={24} fill={grayscale200} />
          {group.membersCount}
        </span>
      </div>
      <div className={styles.form}>
        {myGroup.find((item) => item.id === group.id) ? (
          <>
            <div>이미 참여한 그룹입니다.</div>
            <div className={styles.buttons}>
              <Button
                theme="primary"
                shape="line"
                size="large"
                onClick={goBack}
              >
                돌아가기
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.closedText}>
              {group.groupTypeId === 0 ? (
                <>
                  <div>그룹에 가입 신청할까요?</div>
                  <div className={styles.subText}>
                    비공개 그룹은 그룹장의 승인 후 참여 처리됩니다.
                  </div>
                </>
              ) : (
                '이 그룹에 참여할까요?'
              )}
            </div>
            <div className={styles.buttons}>
              <Button
                theme="primary"
                shape="line"
                size="large"
                onClick={goBack}
              >
                돌아가기
              </Button>
              {group.groupTypeId === 0 ? (
                <Button theme="primary" shape="fill" size="large">
                  가입 신청
                </Button>
              ) : (
                <Button
                  theme="primary"
                  shape="fill"
                  size="large"
                  onClick={onClickJoin}
                >
                  참여하기
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
