/* eslint-disable react-hooks/exhaustive-deps */

// React Modules
import { useEffect, useState } from 'react'

// NEXT modules
import Image from 'next/image'
import Router from 'next/router'
import Head from 'next/head'

// Components
import ChatListItem from '@/components/ChatListItem'
import NoChatSelected from '@/components/NoChatSelected'
import Chat from '@/components/Chat'
import NewChatMenu from '@/components/NewChatMenu'
import Loading from '@/components/Loading'

// Icons and Styles
import { DonutLarge, ChatSharp, MoreVert, Search } from '@mui/icons-material'
import styles from '../styles/pages/Home.module.scss'

// Typings
import { Chat as ChatType } from '@/typings/Chat'
import { User } from '@/typings/User'

// Firebase
import { FirebaseService } from '@/services/firebaseService'
import { getAuth } from 'firebase/auth'

// Redux
import { useAppSelector } from '@/redux/hooks/useAppSelector'
import { useAppDispatch } from '@/redux/hooks/useAppDispatch'
import { setUser } from '@/redux/slices/user'

export default function Home() {
  const [chatList, setChatList] = useState<ChatType[]>([])
  const [activeChat, setActiveChat] = useState<ChatType>({} as ChatType)
  const [showNewChat, setShowNewChat] = useState(false)
  const [loading, setLoading] = useState(true)

  const firebase = new FirebaseService()
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.user)?.user

  function handleOpenNewChatMenu() {
    setShowNewChat(true)
  }

  function handleCloseNewChatMenu() {
    setShowNewChat(false)
  }

  useEffect(() => {
    const auth = getAuth()

    const checkAuthentication = async () => {
      const isFirebaseLogged = auth?.currentUser

      console.log(isFirebaseLogged)

      if (!isFirebaseLogged) {
        Router.push('/login')

        return
      }

      const user = {
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        id: auth.currentUser.uid,
        avatar: auth.currentUser.photoURL,
      }

      dispatch(setUser(user as User))
      firebase.onChatList(user.id, setChatList)

      setLoading(false)
    }

    auth.onAuthStateChanged(checkAuthentication)
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <main className={styles.main}>
      <Head>
        <title>DevChat - {user?.name}</title>
      </Head>
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
          {activeChat.chatId !== undefined && (
            <Chat user={user} data={activeChat} />
          )}
          {activeChat.chatId === undefined && <NoChatSelected />}
        </div>
      </div>
    </main>
  )
}
