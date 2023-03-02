import Image from 'next/image';
import styles from './styles.module.scss';

import defaultAvatar from '../../assets/avatar.png';

interface ChatListItemProps {
  onClick: () => void;
}

export default function ChatListItem({ onClick }: ChatListItemProps) {
  return (
    <div className={styles.chatListItem} onClick={onClick}>
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
          <div className={styles.chatListMessage}>
            <p>
              event - compiled client and server successfully in 726 ms (11167
              modules)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
