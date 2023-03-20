import { useState } from 'react';
import Router from 'next/router';
import Image from 'next/image';

import firebase from '@/config/firebase';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setUser } from '@/redux/slices/user';

import { FacebookRounded, Warning } from '@mui/icons-material';
import whatsAppSVG from '../assets/whatsApp.svg';
import styles from '../styles/pages/Login.module.scss';
import Head from 'next/head';

export default function Login() {
  const [err, setErr] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user).user;

  async function handleFacebookLogin() {
    setErr(false);

    try {
      const result = await firebase.fbPopup();

      console.log(result);

      if (result) {
        const user = {
          name: result.user.displayName,
          email: result.user.email,
          id: result.user.uid,
          avatar: result.user.photoURL,
        };

        dispatch(setUser(user));

        await firebase.addUserToDb(user);

        Router.push('/');
      } else {
        setErr(true);
      }
    } catch (err) {
      setErr(true);
    }
  }

  return (
    <main className={styles.login}>
      <Head>
        <title>WhatsApp - Login</title>
      </Head>
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

            <button onClick={handleFacebookLogin}>
              <FacebookRounded /> Continue with Facebook
            </button>

            {err && (
              <div className={styles.err}>
                <Warning fontSize="small" /> Error logging in, please try again.
              </div>
            )}
          </div>
          <div>
            <Image
              src={whatsAppSVG}
              priority
              alt="WhatsApp"
              height={264}
              width={264}
            />
          </div>
        </div>
        <footer className={styles.whiteBoxFooter}></footer>
      </div>
    </main>
  );
}
