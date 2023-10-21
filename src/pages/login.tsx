// React Modules
import { useState } from 'react'

// NEXT Modules
import Router from 'next/router'
import Image from 'next/image'
import Head from 'next/head'

// Firebase
import { FirebaseService } from '@/services/firebaseService'

// Redux
import { useAppDispatch } from '@/redux/hooks/useAppDispatch'
import { setUser } from '@/redux/slices/user'

// Styles and icons
import { GitHub, Warning } from '@mui/icons-material'
import whatsAppSVG from '../assets/whatsApp.svg'
import styles from '../styles/pages/Login.module.scss'

export default function Login() {
  const [error, setError] = useState(false)

  const firebase = new FirebaseService()

  const dispatch = useAppDispatch()

  async function handleFacebookLogin() {
    setError(false)

    try {
      const result = await firebase.loginWithGithub()

      if (result?.user && result?.token) {
        const user = {
          name: result.user.displayName ?? 'name',
          email: result.user.email ?? 'mail',
          id: result.user.uid,
          avatar: result.user.photoURL ?? 'photo',
        }

        dispatch(setUser(user))

        await firebase.createNewUser(user)

        Router.push('/')
      } else {
        setError(true)
      }
    } catch (err) {
      console.log(err)

      setError(true)
    }
  }

  return (
    <main className={styles.login}>
      <Head>
        <title>DevChat - Login</title>
      </Head>
      <div className={styles.greenWrapper}>.</div>
      <div className={styles.loginWhiteBox}>
        <div className={styles.whiteBoxInfo}>
          <div>
            <h1>Use DevChat on your computer</h1>

            <ol type="1">
              <li>Open DevChat on your phone</li>
              <li>Open your GitHub</li>
              <li>Check your login and password</li>
              <li>Login and use</li>
            </ol>

            <button onClick={handleFacebookLogin}>
              <GitHub /> Continue with GitHub
            </button>

            {error && (
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
  )
}
