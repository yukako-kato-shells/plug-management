import Link from "next/link";
import React, { useEffect } from 'react';
import LayoutRegistration from "../../component/layoutRegistration";
import styles from './index.module.css';
import { getCustomToken } from "../../api/getCustomToken";
// import { Player } from '@lottiefiles/react-lottie-player';
import { signInWithCustomToken } from 'firebase/auth';
import auth from '../../util/firebase';
import { IReqGetCustomToken } from "../../interfaces/IGetCustomToken";
import { useRouter } from "next/router";
import { useAuth } from "../../util/authContext";
import { toast } from "react-toastify";

const CompleteInstall: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (router.isReady && router.query) {
      if (!currentUser) {
        const body: IReqGetCustomToken = {
          user_id: String(router.query.user_id),
          token: String(router.query.token),
        }
        getCustomToken(body).then((res) => {
          signInWithCustomToken(auth, res.custom_token).then((result) => {
            toast.info('ログインしました。');
          })
        })
      }
    }
  }, [router.isReady, router.query])

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

