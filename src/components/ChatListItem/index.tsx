import Image from 'next/image';
import styles from './styles.module.scss';

import { ChatType } from '@/typings/Chat';
import { formatDate } from '@/utils/formatDate';

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
          <time>
            {data.lastMessageDate ? formatDate(data.lastMessageDate) : ''}
          </time>
        </div>
        <div className={styles.chatListLine}>
          <div className={styles.chatListMessage}>
            <p>{data.lastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
