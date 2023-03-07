import { useEffect, useState } from 'react';
import Image from 'next/image';
import Router from 'next/router';

import ChatListItem from '@/components/ChatListItem';
import NoChatSelected from '@/components/NoChatSelected';
import Chat from '@/components/Chat';
import NewChatMenu from '@/components/NewChatMenu';
import { DonutLarge, ChatSharp, MoreVert, Search } from '@mui/icons-material';

import styles from '../styles/pages/Home.module.scss';

import { ChatType } from '@/typings/Chat';
import { useAppSelector } from '@/redux/hooks';
import firebase from '@/config/firebase';

export default function Home() {
  const user = useAppSelector((state) => state.user)?.user;

  const [chatList, setChatList] = useState<ChatType[]>([]);

  const [activeChat, setActiveChat] = useState<ChatType>({} as ChatType);
  const [showNewChat, setShowNewChat] = useState(false);

  function handleOpenNewChatMenu() {
    setShowNewChat(true);
  }

  function handleCloseNewChatMenu() {
    setShowNewChat(false);
  }

  useEffect(() => {
    if (!user?.id) {
      Router.push('/login');
    } else {
      const unsub = firebase.onChatList(user.id, setChatList);

      return unsub;
    }
  }, [user]);

  return (
    <main className={styles.main}>
      <div className={styles.appWindow}>
        <NewChatMenu
          user={user}
          chatList={chatList}
          visible={showNewChat}
          onClose={handleCloseNewChatMenu}
        />
        <aside className={styles.appSideBar}>
          <header className={styles.sideBarHeader}>
            <Image
              src={user?.avatar ?? ''}
              alt="Avatar image"
              width={40}
              height={40}
            />
            <div className={styles.headerButtons}>
              <div className={styles.headerBtn}>
                <DonutLarge className={styles.icon} />
              </div>
              <div className={styles.headerBtn} onClick={handleOpenNewChatMenu}>
                <ChatSharp className={styles.icon} titleAccess="New Chat" />
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
