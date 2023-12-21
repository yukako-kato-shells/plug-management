import Link from 'next/link'

import styles from './index.module.css'
import IconSlack from '../component/IconSlack'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <img src='/assets/logo-dummy.svg' className={styles.headerLogo} />
            <div className={styles.links}>
              <Link href=''>Plugとは</Link>
              <Link href=''>メリット</Link>
              <Link href=''>利用料金</Link>
              <Link href=''>お問い合わせ</Link>
            </div>
          </div>
          <Link href='/login'>
            <div className={styles.buttonSignIn}>
              サインイン
            </div>
          </Link>
        </div>

        <div className={styles.firstView}>
          <img src='/assets/img_background.svg' className={styles.imageBackground} />
          <div className={styles.titleArea}>
            <div className={styles.title}>
              Valueの浸透が<br />組織を強くする
            </div>
            <img src='/assets/logo-dummy.svg' className={styles.logo} />

            <div className={styles.grid}>
              <Link href='/install'>
                <div className={styles.startButton}>
                  <IconSlack size={28} />
                  <div>Slackに追加してはじめる</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
