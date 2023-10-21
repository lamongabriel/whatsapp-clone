// React modules
import { useEffect, useState } from 'react'

// NEXT modules
import Image from 'next/image'

// Typings
import { Chat } from '@/typings/Chat'
import { User } from '@/typings/User'

// Icons
import { ArrowBack } from '@mui/icons-material'

import styles from './styles.module.scss'

// Firebase
import { FirebaseService } from '@/services/firebaseService'

// Redux
import { useAppSelector } from '@/redux/hooks/useAppSelector'

interface NewChatMenuProps {
  visible: boolean
  user: User
  chatList: Chat[]
  onClose: () => void
}

export default function NewChatMenu({ visible, onClose }: NewChatMenuProps) {
  const firebase = new FirebaseService()

  const [contactList, setContactList] = useState<User[]>([] as User[])
  const user = useAppSelector((state) => state.user)?.user

  const newChatMenuStyles = { left: visible ? 0 : '-26rem' }

  useEffect(() => {
    const getContactList = async () => {
      if (!user?.id) {
        return
      }

      const contacts = await firebase.getContactsByUserId(user.id)

      setContactList(contacts)
    }

    getContactList()
  }, [])

  async function handleAddChat(userToChat: User) {
    await firebase.createChatBetweenTwoUsers(user, userToChat)

    onClose()
  }

  if (contactList.length === 0) {
    return null
  }

  return (
    <div className={styles.newChatMenu} style={newChatMenuStyles}>
      <div className={styles.newChatHead}>
        <div className={styles.newChatBackButton} onClick={onClose}>
          <ArrowBack />
        </div>
        <div className={styles.newChatTitle}>
          <h2>New chat</h2>
        </div>
      </div>
      <div className={styles.newChatList}>
        {contactList.map((contact, index) => (
          <div
            className={styles.newChatContact}
            key={index}
            onClick={() => handleAddChat(contact)}
          >
            <Image
              src={contact.avatar as string}
              alt={contact.name as string}
              width={50}
              height={50}
            />
            <div>
              <h2>{contact.name}</h2>
              <p>Hey there! I am using DevChat</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
