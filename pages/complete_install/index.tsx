import Link from "next/link";
import LayoutRegistration from "../../component/layoutRegistration";
import styles from './index.module.css';
// import { Player } from '@lottiefiles/react-lottie-player';

const CompleteInstall: React.FC = () => {
  return (
    <LayoutRegistration>
      <div className={styles.contentsArea}>
        <div className={styles.titleArea}>
          <img src="/assets/logo-dummy.svg" className={styles.logo} />
          <div className={styles.title}>
            インストールありがとうございます！
          </div>
          {/* <Player
            src='/assets/lottie_animation/complete.json'
            className="player"
            loop={false}
            background='transparent'
            style={{ width: "200px", height: "200px", pointerEvents: 'none' }}
          /> */}
        </div>
        <div className={styles.buttonArea}>
          <div>次に、組織のバリューを登録しましょう</div>
          <Link href="/values">
            <div className={styles.valueButton}>
              <img src="/assets/icon_heart.png" className={styles.iconHeart} />
              <div>バリュー登録へ</div>
            </div>
          </Link>
        </div>
      </div>
    </LayoutRegistration>
  )
}

export default CompleteInstall;