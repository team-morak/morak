import { Button } from '@morak/ui';

import { useDeleteGroupQuery } from '@/queries/hooks/group';

import { useGroupJoinAndLeave } from './hooks/useGroupJoinLeave';
import { useGroupModal } from './hooks/useGroupModal';
import * as styles from './index.css';

type GroupButtonProps = {
  id: string;
  closed: boolean;
  joined: boolean;
  owned: boolean;
  deleted: boolean;
};

export function GroupButton({
  id,
  closed,
  joined,
  owned,
  deleted,
}: GroupButtonProps) {
  const { handleLeave, handleJoin } = useGroupJoinAndLeave();
  const { mutate: deleteGroup } = useDeleteGroupQuery();
  const {
    openLeaveModal,
    openJoinModal,
    openApplyModal,
    openDeleteGroupModal,
  } = useGroupModal();

  const onClickLeave = () =>
    openLeaveModal({ onClickConfirm: () => handleLeave(id) });
  const onClickJoin = () =>
    openJoinModal({ onClickConfirm: () => handleJoin(id) });
  const onClickApply = () =>
    openApplyModal({
      onClickConfirm: () => {
        // 가입 신청 API 연동
      },
    });
  const onClickDelete = () =>
    openDeleteGroupModal({ onClickConfirm: () => deleteGroup(id) });

  return (
    <div className={styles.butonWrapper}>
      {deleted && (
        <Button
          type="button"
          theme="primary"
          shape="fill"
          size="medium"
          disabled
        >
          삭제된 그룹입니다
        </Button>
      )}
      {!deleted && owned && joined && (
        <Button
          type="button"
          theme="danger"
          shape="fill"
          size="medium"
          onClick={(e) => {
            e.preventDefault();
            onClickDelete();
          }}
        >
          그룹 삭제
        </Button>
      )}
      {!deleted &&
        (joined ? (
          <Button
            type="button"
            theme="danger"
            shape="fill"
            size="medium"
            onClick={(e) => {
              e.preventDefault();
              onClickLeave();
            }}
          >
            나가기
          </Button>
        ) : (
          <Button
            type="button"
            theme="primary"
            shape="fill"
            size="medium"
            onClick={(e) => {
              e.preventDefault();
              if (closed) {
                onClickApply();
              } else {
                onClickJoin();
              }
            }}
          >
            {closed ? '가입 신청' : '참여하기'}
          </Button>
        ))}
    </div>
  );
}
