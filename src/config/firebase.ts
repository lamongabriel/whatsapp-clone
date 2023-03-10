import { initializeApp } from 'firebase/app';
import { FacebookAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

import {
  onSnapshot,
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  addDoc,
  updateDoc,
  arrayUnion,
  getDoc,
} from 'firebase/firestore';

import { ChatType } from '@/typings/Chat';
import { User } from '@/typings/User';
import { Message } from '@/typings/Message';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  // Popup to login with facebook
  fbPopup: async () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth(app);

    return signInWithPopup(auth, provider);
  },

  // Adds user to db, if it exists, it merges, resulting in one user only
  addUserToDb: async (user: User) => {
    await setDoc(
      doc(collection(db, 'users'), user.id as string),
      {
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      },
      { merge: true }
    );
  },

  // Gets every contact logged to the app
  getContactList: async (userId: string) => {
    const contactList = [] as User[];

    const contactsData = await getDocs(collection(db, 'users'));
    contactsData.forEach((contact) => {
      const data = contact.data();

      // Shows every contact but you
      if (contact.id !== userId) {
        contactList.push({
          id: contact.id,
          name: data.name,
          avatar: data.avatar,
          email: data.email,
        });
      }
    });

    return contactList;
  },

  // Handles new chat addition
  addNewChat: async (user1: User, user2: User) => {
    // Creates a new empty chat in the collections chats
    const newChat = await addDoc(collection(db, 'chats'), {
      messages: [],
      users: [user1.id, user2.id],
    });

    // Adds newly created chat to this user active chats

    // USER 1
    await updateDoc(doc(collection(db, 'users'), user1.id as string), {
      chats: arrayUnion({
        chatId: newChat.id,
        // Title of the chat is the name of the
        // person you are chatting with
        title: user2.name,

        // same for image
        image: user2.avatar,

        // reference to who you are chatting
        with: user2.id,
      }),
    });

    // USER 2
    await updateDoc(doc(collection(db, 'users'), user2.id as string), {
      chats: arrayUnion({
        chatId: newChat.id,
        title: user1.name,
        image: user1.avatar,
        with: user1.id,
      }),
    });
  },

  onChatList: (userId: string, setChatList: (chats: ChatType[]) => void) => {
    return onSnapshot(doc(collection(db, 'users'), userId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();

        if (data.chats) {
          setChatList(data.chats);
        }
      }
    });
  },

  onChatContent: (
    chatId: string,
    setMessagesList: (messageList: Message[]) => void,
    setUsers: (users: string[]) => void
  ) => {
    onSnapshot(doc(collection(db, 'chats'), chatId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();

        setMessagesList(data.messages);
        setUsers(data.users);
      }
    });
  },

  sendMessage: async (
    chat: ChatType,
    userId: string,
    type: string,
    message: string,
    users: string[]
  ) => {
    const now = new Date().toLocaleString();

    updateDoc(doc(collection(db, 'chats'), chat.chatId), {
      messages: arrayUnion({
        type,
        author: userId,
        body: message,
        date: now,
      }),
    });

    for (const user of users) {
      const thisUser = await getDoc(doc(collection(db, 'users'), user));

      const userData = thisUser.data();

      console.log(userData);

      if (!userData) return;

      if (userData.chats) {
        const chats = [...userData.chats];

        for (const userChat of chats) {
          if (userChat.chatId === chat.chatId) {
            userChat.lastMessage = message;
            userChat.lastMessageDate = now;
          }
        }

        await updateDoc(doc(collection(db, 'users'), user), {
          chats,
        });
      }
    }
  },
};
