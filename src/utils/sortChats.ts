import { Chat } from '@/typings/Chat'

export function sortChats(chats: Chat[]) {
  const chatsSorted = chats.sort((a, b) => {
    if (!a.lastMessageDate || !b.lastMessageDate) {
      return 1
    }

    const chat1LastMessageTime = new Date(a.lastMessageDate).getTime()
    const chat2LastMessageTime = new Date(b.lastMessageDate).getTime()

    return chat1LastMessageTime < chat2LastMessageTime ? 1 : -1
  })

  return chatsSorted
}
