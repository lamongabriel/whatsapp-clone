import Image from 'next/image';
import styles from './styles.module.scss';

import {
  Search,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Send,
  Mic,
} from '@mui/icons-material';

import defaultAvatar from '../../assets/avatar.png';
import bg from '../../assets/chatBg.png';

export default function Chat() {
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
      ></div>
      <footer className={styles.chatFooter}>
        <div className={styles.footerPre}>
          <div className={styles.btn}>
            <InsertEmoticon />
          </div>
        </div>
        <div className={styles.footerMiddle}>
          <input type="text" placeholder="Type a message" />
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
