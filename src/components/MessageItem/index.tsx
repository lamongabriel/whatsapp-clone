interface MessageItemProps {
  message: Message;
  user: User;
}

import { Message } from '@/typings/Message';
import { User } from '@/typings/User';
import styles from './styles.module.scss';

export default function MessageItem({ message, user }: MessageItemProps) {
  const isAuthorCurrentUser = message.author === user.id;

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
        <div className={styles.messageDate}>{message.date}</div>
      </div>
    </div>
  );
}
