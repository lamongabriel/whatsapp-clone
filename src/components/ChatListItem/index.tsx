import Image from 'next/image';
import styles from './styles.module.scss';

import { ChatType } from '@/typings/Chat';

interface ChatListItemProps {
  onClick: () => void;
  active: boolean;
  data: ChatType;
}

export default function ChatListItem({
  onClick,
  active,
  data,
}: ChatListItemProps) {
  return (
    <div
      className={`${styles.chatListItem} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      <Image
        src={data.image}
        className={styles.chatListAvatar}
        alt="Avatar item"
        width={50}
        height={50}
      />
      <div className={styles.chatListLines}>
        <div className={styles.chatListLine}>
          <div>{data.title}</div>
          <time>{data.title}</time>
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
