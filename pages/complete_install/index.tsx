import Link from "next/link";
import React, { useEffect } from 'react';
import LayoutRegistration from "../../component/layoutRegistration";
import styles from './index.module.css';
import { signInWithCustomToken } from 'firebase/auth';
import auth from '../../util/firebase';
import { useRouter } from "next/router";
import { useAuth } from "../../util/authContext";
import { toast } from "react-toastify";

const CompleteInstall: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!router.isReady || !router.query) return;
    if (currentUser) {
      router.push('/dashboard'); // TODO: Value登録が一件もされていない場合はとどまる
    } else {
      const customToken = atob(String(router.query.plug ? router.query.plug : ""));
      if (customToken == "") return

      signInWithCustomToken(auth, customToken).then((result) => {
        toast.info('ログインしました。');
      })
    }
  }, [currentUser, router, router.isReady, router.query])

  return (
    <LayoutRegistration>
      <div className={styles.contentsArea}>
        <div className={styles.titleArea}>
          <img src="/assets/logo-dummy.svg" className={styles.logo} />
          <div className={styles.title}>
            インストールありがとうございます！
          </div>
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

