import Image from 'next/image';

import styles from './styles.module.scss';

import connectPhone from '../../assets/connectPhone.png';

export default function NoChatSelected() {
  return (
    <div className={styles.noChatSelected}>
      <Image
        src={connectPhone}
        alt="WhatsApp Connect Your Phone"
        height={250}
        width={250}
      />
      <h1>Keep your phone connected</h1>
      <h2>
        WhatsApp Web connects to your phone to sync messages. To reduce data
        usage, connect your phone to WI-FI.
      </h2>
    </div>
  );
}
