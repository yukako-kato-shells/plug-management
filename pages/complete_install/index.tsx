import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signInWithCustomToken } from 'firebase/auth';
import { toast } from 'react-toastify';

import styles from './index.module.css';
import auth from '../../util/firebase';
import { useAuth } from '../../util/authContext';
import { getValues } from '../../api/values/getValues';
import LayoutRegistration from '../../component/layoutRegistration';

const CompleteInstall: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!router.isReady || !router.query) return;

    if (currentUser) {
      // ログインしていた場合
      getValues().then((res) => {
        if (res.values.length != 0) router.push('/dashboard');
      }).catch((error) => {
        return;
      })
    } else {
      // 未ログインの場合
      const customToken = atob(String(router.query.plug ? router.query.plug : ''));
      if (customToken == '') router.push('/401');

      signInWithCustomToken(auth, customToken).then((res) => {
        toast.info('ログインしました。');
      })
    }
  }, [currentUser, router, router.isReady, router.query])

  return (
    <LayoutRegistration>
      <div className={styles.contentsArea}>
        <div className={styles.titleArea}>
          <img src='/assets/logo-dummy.svg' className={styles.logo} />
          <div className={styles.title}>
            インストールありがとうございます！
          </div>
        </div>
        <div className={styles.buttonArea}>
          <div>次に、組織のバリューを登録しましょう</div>
          <Link href='/values'>
            <div className={styles.valueButton}>
              <img src='/assets/icon_heart.png' className={styles.iconHeart} />
              <div>バリュー登録へ</div>
            </div>
          </Link>
        </div>
      </div>
    </LayoutRegistration>
  )
}

export default CompleteInstall;

