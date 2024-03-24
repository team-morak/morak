import { ReactComponent as Copy } from '@/assets/icons/copy.svg';
import { ReactComponent as Crown } from '@/assets/icons/crown.svg';
import { ReactComponent as Lock } from '@/assets/icons/lock.svg';
import { ReactComponent as People } from '@/assets/icons/people.svg';
import { vars } from '@/styles';

import { GroupButton } from './GroupButton';
import * as styles from './index.css';

const { grayscale200 } = vars.color;

type GroupProps = {
  id: string;
  name: string;
  memberCount: number;
  accessCode?: string;
  closed: boolean;
  joined: boolean;
  owned?: boolean;
  deleted: boolean;
};
export function Group({
  id,
  name,
  memberCount,
  accessCode,
  closed,
  joined,
  owned = false,
  deleted,
}: GroupProps) {
  const onClickCopy = async () => {
    if (accessCode) {
      await navigator.clipboard.writeText(
        `${window.location.origin}/group/join?access_code=${accessCode}`,
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <div className={styles.nameWrapper}>
          {owned && <Crown />}
          <div className={styles.title}>{name}</div>
          {closed && <Lock width={24} height={24} fill={grayscale200} />}
          <div className={styles.memberCount}>
            <People width={16} height={16} fill={grayscale200} />
            <span>{memberCount}</span>
          </div>
        </div>
        <GroupButton
          id={id}
          closed={closed}
          joined={joined}
          owned={owned}
          deleted={deleted}
        />
      </div>
      {accessCode && (
        <div className={styles.code}>
          <span>초대 코드</span>
          <div className={styles.codeString}>{accessCode}</div>
          <button
            type="button"
            className={styles.copyButton}
            onClick={onClickCopy}
          >
            <Copy width={24} height={24} fill={grayscale200} />
          </button>
        </div>
      )}
    </div>
  );
}
