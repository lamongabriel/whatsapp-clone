import Image from 'next/image'

import styles from './styles.module.scss'

import connectPhone from '../../assets/connectPhone.svg'

export default function NoChatSelected() {
  return (
    <div className={styles.noChatSelected}>
      <Image src={connectPhone} priority alt="DevChat Connect Your Phone" />
      <h1>Keep your phone connected</h1>
      <h2>
        DevChat Web connects to your phone to sync messages. To reduce data
        usage, connect your phone to WI-FI.
      </h2>
    </div>
  )
}
