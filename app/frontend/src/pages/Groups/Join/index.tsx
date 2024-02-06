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
  const { isLoading, data: group } = useQuery(
    queryKeys.group.findByCode(accessCode!),
  );

  const goBack = () => navigate(-1);

  const onClickJoin = () => {
    if (!group) {
      return;
    }

    openJoinModal({ onClickConfirm: () => handleJoin(group.id) });
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {group ? (
        <>
          <h2 className={sansBold36}>그룹 참여</h2>
          <div className={styles.group}>
            <div className={styles.groupTitle}>
              <span>{group.title}</span>
              {group.groupTypeId === 1 && (
                <Lock width={24} height={24} fill={grayscale200} />
              )}
            </div>
            <span className={styles.participants}>
              <People width={24} height={24} fill={grayscale200} />
              {group.membersCount}
            </span>
          </div>
          <div className={styles.form}>
            {group.groupTypeId === 1 ? (
              <div className={styles.closedText}>
                <div>그룹에 가입 신청할까요?</div>
                <div className={styles.subText}>
                  비공개 그룹은 그룹장의 승인 후 참여 처리됩니다.
                </div>
              </div>
            ) : (
              '이 그룹에 참여할까요?'
            )}
            <div className={styles.buttons}>
              <Button
                theme="primary"
                shape="line"
                size="large"
                onClick={goBack}
              >
                취소
              </Button>
              {group.groupTypeId === 1 ? (
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
          </div>
        </>
      ) : (
        <Error message="유효하지 않은 초대 코드입니다." />
      )}
    </div>
  );
}
