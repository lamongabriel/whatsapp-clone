import { Message } from '@/typings/Message';
import { User } from '@/typings/User';

import styles from './styles.module.scss';

interface MessageItemProps {
  message: Message;
  user: User;
}

export default function MessageItem({ message, user }: MessageItemProps) {
  const isAuthorCurrentUser = message.author === user.id;

  const now = new Date(message.date);

  const formattedDate = `${now.getHours()}:${now.getMinutes()}`;

  return (
    <div
      className={
        isAuthorCurrentUser
          ? styles.messageLineCurrentUser
          : styles.messageLineOtherUser
      }
    >
      <div className={styles.messageItem}>
        <div className={styles.messageText}>{message.body}</div>
        <div className={styles.messageDate}>{formattedDate}</div>
      </div>
    </div>
  );
}
