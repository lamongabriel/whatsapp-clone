import firebase from '@/config/firebase';
import { useAppSelector } from '@/redux/hooks';
import { ChatType } from '@/typings/Chat';
import { User } from '@/typings/User';
import { ArrowBack } from '@mui/icons-material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

interface NewChatMenuProps {
  visible: boolean;
  user: User;
  chatList: ChatType[];
  onClose: () => void;
}

export default function NewChatMenu({ visible, onClose }: NewChatMenuProps) {
  const [contactList, setContactList] = useState<User[]>([] as User[]);
  const user = useAppSelector((state) => state.user)?.user;

  const newChatMenuStyles = { left: visible ? 0 : '-26rem' };

  useEffect(() => {
    const getContactList = async () => {
      if (!user?.id) {
        return;
      }

      const contacts = await firebase.getContactList(user.id);

      setContactList(contacts);
    };

    getContactList();
  }, []);

  if (contactList.length === 0) {
    return null;
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
          <div className={styles.newChatContact} key={index}>
            <Image
              src={contact.avatar as string}
              alt={contact.name as string}
              width={50}
              height={50}
            />
            <div>
              <h2>{contact.name}</h2>
              <p>Hey there! I am using Whatsapp</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
