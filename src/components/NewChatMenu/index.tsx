import { ChatType } from '@/typings/Chat';
import { User } from '@/typings/User';
import { ArrowBack } from '@mui/icons-material';
import Image from 'next/image';
import { useState } from 'react';
import styles from './styles.module.scss';

interface NewChatMenuProps {
  visible: boolean;
  user: User;
  chatList: ChatType[];
  onClose: () => void;
}

export default function NewChatMenu({ visible, onClose }: NewChatMenuProps) {
  const [contactList, setContactList] = useState([
    {
      id: 'asdsa34-zxczxt53-5osdcbv-xka',
      avatar:
        'https://pps.whatsapp.net/v/t61.24694-24/311028478_1398919310844779_8768775314489018039_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdS9MwZgo-TvMAidNABX7kltEUAp8e9tjX3nVdBQU1rFUw&oe=6410A587',
      name: 'Gabriel Lamon',
    },
    {
      id: 'asdsa34-zxczxt53-5osdcbv-xka',
      avatar:
        'https://pps.whatsapp.net/v/t61.24694-24/311028478_1398919310844779_8768775314489018039_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdS9MwZgo-TvMAidNABX7kltEUAp8e9tjX3nVdBQU1rFUw&oe=6410A587',
      name: 'Gabriel Lamon',
    },
    {
      id: 'asdsa34-zxczxt53-5osdcbv-xka',
      avatar:
        'https://pps.whatsapp.net/v/t61.24694-24/311028478_1398919310844779_8768775314489018039_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdS9MwZgo-TvMAidNABX7kltEUAp8e9tjX3nVdBQU1rFUw&oe=6410A587',
      name: 'Gabriel Lamon',
    },
    {
      id: 'asdsa34-zxczxt53-5osdcbv-xka',
      avatar:
        'https://pps.whatsapp.net/v/t61.24694-24/311028478_1398919310844779_8768775314489018039_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdS9MwZgo-TvMAidNABX7kltEUAp8e9tjX3nVdBQU1rFUw&oe=6410A587',
      name: 'Gabriel Lamon',
    },
  ]);

  const newChatMenuStyles = { left: visible ? 0 : '-26rem' };

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
              src={contact.avatar}
              alt={contact.name}
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
