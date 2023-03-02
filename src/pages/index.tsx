import { Fragment, useState } from 'react';
import Image from 'next/image';

import ChatListItem from '@/components/ChatListItem';

import { DonutLarge, ChatSharp, MoreVert, Search } from '@mui/icons-material';
import styles from '../styles/pages/Home.module.scss';

import defaultAvatar from '../assets/avatar.png';

export default function Home() {
  const [chatList] = useState([{}, {}, {}, {}]);

  return (
    <main>
      <div className={styles.appWindow}>
        <aside className={styles.appSideBar}>
          <header className={styles.sideBarHeader}>
            <Image src={defaultAvatar} alt="Avatar image" />
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
              <Fragment key={key}>
                <ChatListItem />
              </Fragment>
            ))}
          </div>
        </aside>
        <div className={styles.appContent}>...</div>
      </div>
    </main>
  );
}
