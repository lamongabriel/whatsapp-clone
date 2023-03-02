import Image from 'next/image';
import styles from './styles.module.scss';

import defaultAvatar from '../../assets/avatar.png';

export default function ChatListItem() {
  return (
    <div className={styles.chatListItem}>
      <Image
        src={defaultAvatar}
        className={styles.chatListAvatar}
        alt="Avatar item"
      />
      <div className={styles.chatListLines}>
        <div className={styles.chatListLine}>
          <div>Gabriel Lamon Lopes</div>
          <time>09:38</time>
        </div>
        <div className={styles.chatListLine}>
          <p>How you doin?</p>
        </div>
      </div>
    </div>
  );
}
