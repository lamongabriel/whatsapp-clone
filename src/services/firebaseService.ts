import { firebaseDB } from '@/config/firebaseConfig'

import { GithubAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

import {
  onSnapshot,
  collection,
  doc,
  setDoc,
  getDocs,
  addDoc,
  updateDoc,
  arrayUnion,
  getDoc,
} from 'firebase/firestore'

import { sortChats } from '@/utils/sortChats'

import { Chat } from '@/typings/Chat'
import { User } from '@/typings/User'
import { Message } from '@/typings/Message'

const provider = new GithubAuthProvider()
const auth = getAuth()

class FirebaseService {
  async loginWithGithub() {
    const result = await signInWithPopup(auth, provider)

    const credential = GithubAuthProvider.credentialFromResult(result)

    if (!credential) {
      throw new Error('Could not login')
    }

    const token = credential.accessToken
    const user = result.user

    return {
      token,
      user,
    }
  }

  /**
   * Adds user to Firebase,
   * if user exists, it merges.
   */
  async createNewUser(user: User) {
    await setDoc(
      doc(collection(firebaseDB, 'users'), user.id),
      {
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      },
      { merge: true },
    )
  }

  /**
   * Get all contacts from a user
   */
  async getContactsByUserId(userId: string) {
    const contactsList = [] as User[]

    const contacts = await getDocs(collection(firebaseDB, 'users'))

    contacts.forEach((contact) => {
      const data = contact.data()

      // Shows every contact but you
      if (contact.id !== userId) {
        contactsList.push({
          id: contact.id,
          name: data.name,
          avatar: data.avatar,
          email: data.email,
        })
      }
    })

    return contactsList
  }

  /**
   * Handles new chat addition between users
   */
  async createChatBetweenTwoUsers(user1: User, user2: User) {
    if (!user1.id || !user2.id) return

    const chatExists = await this.checkIfTwoUsersAlreadyHaveAChat(user1, user2)

    if (chatExists) {
      return
    }

    const newChat = await addDoc(collection(firebaseDB, 'chats'), {
      messages: [],
      users: [user1.id, user2.id],
    })

    // USER 1
    await updateDoc(doc(collection(firebaseDB, 'users'), user1.id as string), {
      chats: arrayUnion({
        chatId: newChat.id,
        title: user2.name,
        image: user2.avatar,
        with: user2.id,
      }),
    })

    // USER 2
    await updateDoc(doc(collection(firebaseDB, 'users'), user2.id as string), {
      chats: arrayUnion({
        chatId: newChat.id,
        title: user1.name,
        image: user1.avatar,
        with: user1.id,
      }),
    })
  }

  /**
   * Updates and sorts chats when a new conversation is started
   * Works bi-directionally
   */
  onChatList(userId: string, setChatList: (chats: Chat[]) => void) {
    return onSnapshot(doc(collection(firebaseDB, 'users'), userId), (doc) => {
      if (!doc.exists()) return

      const data = doc.data()
      if (!data?.chats) return

      const chats = [...data.chats] as Chat[]
      const sortedChats = sortChats(chats)

      setChatList(sortedChats)
    })
  }

  /**
   * Retrives chat data
   */
  onChatContent(
    chatId: string,
    setMessagesList: (messageList: Message[]) => void,
    setUsers: (users: string[]) => void,
  ) {
    onSnapshot(doc(collection(firebaseDB, 'chats'), chatId), (doc) => {
      if (doc.exists()) {
        const data = doc.data()

        setMessagesList(data.messages)
        setUsers(data.users)
      }
    })
  }

  /**
   * Handles user messages
   */
  async sendMessage(
    chat: Chat,
    userId: string,
    type: string,
    message: string,
    users: string[],
  ) {
    const now = new Date().toLocaleString()

    updateDoc(doc(collection(firebaseDB, 'chats'), chat.chatId), {
      messages: arrayUnion({
        type,
        author: userId,
        body: message,
        date: now,
      }),
    })

    for (const user of users) {
      const currentUser = await getDoc(
        doc(collection(firebaseDB, 'users'), user),
      )

      const userData = currentUser.data()
      if (!userData || !userData?.chats) return

      const userChats = [...userData.chats] as Chat[]

      const currentChatIndex = userChats.findIndex(
        (userChat) => userChat.chatId === chat.chatId,
      )
      if (currentChatIndex === -1) return

      userChats[currentChatIndex].lastMessage = message
      userChats[currentChatIndex].lastMessageDate = now

      await updateDoc(doc(collection(firebaseDB, 'users'), user), {
        userChats,
      })
    }
  }

  private async checkIfTwoUsersAlreadyHaveAChat(user1: User, user2: User) {
    const userDoc = await getDoc(doc(collection(firebaseDB, 'users'), user1.id))
    const userChats = userDoc.data()?.chats as Chat[]

    if (!userChats || userChats?.length === 0) return false

    userChats.forEach((chat) => {
      if (chat.with === user2.id) {
        return true
      }
    })

    return false
  }
}

export { FirebaseService }
