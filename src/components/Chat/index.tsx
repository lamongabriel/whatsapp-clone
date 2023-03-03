import { useState } from 'react';
import Image from 'next/image';

import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import {
  Search,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Send,
  Mic,
  Close,
} from '@mui/icons-material';

import defaultAvatar from '../../assets/avatar.png';
import bg from '../../assets/chatBg.png';

import styles from './styles.module.scss';

export default function Chat() {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [message, setMessage] = useState('');

  function handleOpenEmoji() {
    setIsEmojiOpen(true);
  }

  function handleCloseEmoji() {
    setIsEmojiOpen(false);
  }

  return (
    <div className={styles.chatWindow}>
      <header className={styles.chatHeader}>
        <div className={styles.headerInfo}>
          <Image
            src={defaultAvatar}
            className={styles.headerAvatar}
            alt="Avatar item"
          />
          <div className={styles.headerName}>Gabriel Lamon Lopes</div>
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
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        ...
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className={styles.footerPost}>
          <div className={styles.btn}>
            <Send />
          </div>
        </div>
      </footer>
    </div>
  );
}
