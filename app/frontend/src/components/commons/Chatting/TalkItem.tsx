import { ReactComponent as Profile } from '@assets/icons/profile.svg';
import { vars } from '@styles';
import { Talk } from '@types';
import dayjs from 'dayjs';

import * as styles from './TalkItem.css';

type TalkItemProps = {
  talk: Talk;
  isMine: boolean;
};

export function TalkItem({
  talk: {
    user: { username, profileSrc },
    datetime,
    content,
  },
  isMine,
}: TalkItemProps) {
  return (
    <div className={styles.container}>
      {!isMine && (
        <div className={styles.userInfo}>
          <div className={`${styles.profileImage} ${!profileSrc && styles.defaultProfileImage}`}>
            {profileSrc ? (
              <img src={profileSrc} alt={`${username}의 프로필 사진`} />
            ) : (
              <Profile fill={vars.color.morakGreen} />
            )}
          </div>
          <span>{username}</span>
        </div>
      )}
      <div className={`${styles.content} ${isMine && styles.isMine}`}>{content}</div>
      <div className={`${styles.datetime} ${isMine && styles.isMine}`}>{dayjs(datetime).format('MM.DD h:mm A')}</div>
    </div>
  );
}
