interface MessageItemProps {
  message: string;
}

import styles from './styles.module.scss';

export default function MessageItem({ message }: MessageItemProps) {
  return (
    <div className={styles.messageLine}>
      <div className={styles.messageItem}>
        <div className={styles.messageText}>{message}</div>
        <div className={styles.messageDate}>19:00</div>
      </div>
    </div>
  );
}
