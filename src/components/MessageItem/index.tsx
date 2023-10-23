import { Message } from '@/typings/Message'
import { User } from '@/typings/User'

import styles from './styles.module.scss'
import { formatDate } from '@/utils/formatDate'

interface MessageItemProps {
  message: Message
  user: User
}

export default function MessageItem({ message, user }: MessageItemProps) {
  const isAuthorCurrentUser = message.author === user.id

  const date = formatDate(message.date)

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
        <div className={styles.messageDate}>{date}</div>
      </div>
    </div>
  )
}
