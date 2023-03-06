import { FacebookRounded } from '@mui/icons-material';
import Image from 'next/image';

import whatsAppSVG from '../assets/whatsApp.svg';
import styles from '../styles/pages/login.module.scss';

export default function Login() {
  return (
    <main className={styles.login}>
      <div className={styles.greenWrapper}>.</div>
      <div className={styles.loginWhiteBox}>
        <div className={styles.whiteBoxInfo}>
          <div>
            <h1>Use WhatsApp on your computer</h1>

            <ol type="1">
              <li>Open WhatsApp on your phone</li>
              <li>Open your facebook</li>
              <li>Check your login and password</li>
              <li>Login and use</li>
            </ol>

            <button>
              <FacebookRounded /> Continue with Facebook
            </button>
          </div>
          <div>
            <Image src={whatsAppSVG} alt="WhatsApp" height={264} width={264} />
          </div>
        </div>
        <footer className={styles.whiteBoxFooter}></footer>
      </div>
    </main>
  );
}
