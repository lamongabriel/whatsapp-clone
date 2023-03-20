import { use, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import MessageItem from '../MessageItem';
import EmojiPicker, { EmojiStyle, EmojiClickData } from 'emoji-picker-react';
import {
  Search,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Send,
  Mic,
  Close,
} from '@mui/icons-material';

import bg from '../../assets/chatBg.png';
import styles from './styles.module.scss';

import { User } from '@/typings/User';
import { Message } from '@/typings/Message';
import { ChatType } from '@/typings/Chat';
import firebase from '@/config/firebase';

interface ChatProps {
  user: User;
  data: ChatType;
}

export default function Chat({ user, data }: ChatProps) {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [messageToSend, setMessageToSend] = useState('');

  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  const chatBodyRef = useRef<HTMLDivElement>(null);

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  function handleOpenEmoji() {
    setIsEmojiOpen(true);
  }

  function handleCloseEmoji() {
    setIsEmojiOpen(false);
  }

  function handleEmojiClick(data: EmojiClickData) {
    setMessageToSend(messageToSend + data.emoji);
  }

  function handleSendClick() {
    if (messageToSend === '' || messageToSend.length === 0 || !user.id) return;

    firebase.sendMessage(data, user.id, 'text', messageToSend, users);

    setMessageToSend('');
    setIsEmojiOpen(false);
  }

  function handleInputKeyup(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  }

  function startListening() {
    if (browserSupportsSpeechRecognition && isMicrophoneAvailable) {
      SpeechRecognition.startListening({ language: 'pt-br' });
    } else {
      alert(
        "Your browser doesn't support Speech Recognition our your mic is disabled."
      );
    }
  }

  function stopListening() {
    if (browserSupportsSpeechRecognition && isMicrophoneAvailable) {
      SpeechRecognition.stopListening();
    } else {
      alert(
        "Your browser doesn't support Speech Recognition our your mic is disabled."
      );
    }
  }

  useEffect(() => {
    setMessageToSend(transcript);
  }, [transcript]);

  useEffect(() => {
    const body = chatBodyRef.current;

    if (!body) return;

    if (body.scrollHeight > body.offsetHeight) {
      body.scrollTop = body.scrollHeight - body.offsetHeight;
    }
  }, [messagesList]);

  useEffect(() => {
    setMessagesList([]);

    const unsub = firebase.onChatContent(
      data.chatId,
      setMessagesList,
      setUsers
    );

    return unsub;
  }, [data.chatId]);

  return (
    <div className={styles.chatWindow}>
      <header className={styles.chatHeader}>
        <div className={styles.headerInfo}>
          <Image
            src={data.image}
            width={40}
            height={40}
            className={styles.headerAvatar}
            alt="Avatar item"
          />
          <div className={styles.headerName}>{data.title}</div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.btn}>
            <Search />
          </div>
          <div className={styles.btn}>
            <AttachFile />
          </div>
          <div className={styles.btn}>
            <MoreVert />
          </div>
        </div>
      </header>
      <div
        className={styles.chatBody}
        ref={chatBodyRef}
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        {messagesList.map((message, index) => (
          <MessageItem user={user} message={message} key={index} />
        ))}
      </div>
      <div
        className={styles.emojiPicker}
        style={{
          height: isEmojiOpen ? '12.5rem' : 0,
        }}
      >
        <EmojiPicker
          skinTonesDisabled
          searchDisabled
          emojiStyle={EmojiStyle.APPLE}
          previewConfig={{ showPreview: false }}
          onEmojiClick={handleEmojiClick}
        />
      </div>
      <footer className={styles.chatFooter}>
        <div className={styles.footerPre}>
          <div
            className={styles.btn}
            onClick={handleCloseEmoji}
            style={{ width: isEmojiOpen ? '2.5rem' : 0 }}
          >
            <Close />
          </div>
          <div className={styles.btn} onClick={handleOpenEmoji}>
            <InsertEmoticon />
          </div>
        </div>
        <div className={styles.footerMiddle}>
          <input
            type="text"
            placeholder="Type a message"
            value={messageToSend}
            onChange={(e) => setMessageToSend(e.target.value)}
            onKeyUp={handleInputKeyup}
          />
        </div>
        <div className={styles.footerPost}>
          {messageToSend.length === 0 && (
            <div
              className={styles.btn}
              onTouchStart={startListening}
              onMouseDown={startListening}
              onTouchEnd={stopListening}
              onMouseUp={stopListening}
            >
              <Mic className={listening ? styles.micActive : ''} />
            </div>
          )}
          {messageToSend.length > 0 && (
            <div className={styles.btn} onClick={handleSendClick}>
              <Send />
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
