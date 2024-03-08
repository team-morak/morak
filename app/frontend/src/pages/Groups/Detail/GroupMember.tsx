import { ReactComponent as Delete } from '@/assets/icons/delete.svg';
import { UserChip } from '@/components';

import * as styles from './index.css';

type GroupMemberProps = {
  userName?: string;
  profileSrc?: string;
};

export function GroupMember({ userName, profileSrc }: GroupMemberProps) {
  return (
    <div className={styles.groupMember}>
      <UserChip username={userName} profileSrc={profileSrc} />
      <Delete className={styles.deleteButton} />
    </div>
  );
}
