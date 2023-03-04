import { Fragment, useState } from 'react';
import Image from 'next/image';

import ChatListItem from '@/components/ChatListItem';
import NoChatSelected from '@/components/NoChatSelected';
import Chat from '@/components/Chat';
import { DonutLarge, ChatSharp, MoreVert, Search } from '@mui/icons-material';

import styles from '../styles/pages/Home.module.scss';
import defaultAvatar from '../assets/avatar.png';

import { ChatType } from '@/typings/Chat';
import { User } from '@/typings/User';

export default function Home() {
  const [chatList] = useState<ChatType[]>([
    { chatId: 's45tgc-4cxvghh6-zcz4hg', title: 'Chat 1' },
    { chatId: '0xvccv-d29tvaax-fmmv38', title: 'Chat 2' },
  ]);

  const [activeChat, setActiveChat] = useState<ChatType>({} as ChatType);
  const [user, setUser] = useState<User>({
    id: '13040-sdasxc34-gosd',
    avatar: defaultAvatar.src,
    name: 'Gabriel Lamon Lopes',
    email: 'gabriel-lamon@outlook.com',
  });

  return (
    <main className={styles.main}>
      <div className={styles.appWindow}>
        <aside className={styles.appSideBar}>
          <header className={styles.sideBarHeader}>
            <Image
              src={user.avatar}
              alt="Avatar image"
              width={40}
              height={40}
            />
            <div className={styles.headerButtons}>
              <div className={styles.headerBtn}>
                <DonutLarge className={styles.icon} />
              </div>
              <div className={styles.headerBtn}>
                <ChatSharp className={styles.icon} />
              </div>
              <div className={styles.headerBtn}>
                <MoreVert className={styles.icon} />
              </div>
            </div>
          </header>

          <div className={styles.sideBarSearch}>
            <div className={styles.searchInput}>
              <Search fontSize="small" className={styles.icon} />
              <input type="search" placeholder="Search or start new chat" />
            </div>
          </div>

          <div className={styles.sideBarChatList}>
            {chatList.map((chat, key) => (
              <ChatListItem
                data={chat}
                active={chat.chatId === activeChat.chatId}
                key={key}
                onClick={() => setActiveChat(chat)}
              />
            ))}
          </div>
        </aside>
        <div className={styles.appContent}>
          {activeChat.chatId !== undefined && <Chat user={user} />}
          {activeChat.chatId === undefined && <NoChatSelected />}
        </div>
      </div>
    </main>
  );
}
