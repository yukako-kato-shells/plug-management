import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signInWithCustomToken } from 'firebase/auth';
import { toast } from "react-toastify";

import styles from './index.module.css';
import auth from '../../util/firebase';
import { useAuth } from '../../util/authContext';
import ButtonWithSlack from '../../component/buttonWithSlack';

const Login: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const authUrl = `https://slack.com/openid/connect/authorize?scope=openid&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_API_EXTERNAL_ROOT_URL}/login&client_id=${process.env.NEXT_PUBLIC_SLACK_CLIENT_ID}`

  useEffect(() => {
    //　ログイン処理
    if (!router.isReady || !router.query) return;
    if (currentUser || !router.query.custom_token) return;

    signInWithCustomToken(auth, String(router.query.custom_token)).then((result) => {
      toast.info('ログインしました。');
      //router.push('/dashboard');
    }).catch((error) => {
      toast.error('ログインに失敗しました。');
    })
  }, [currentUser, router.isReady, router.query])

  return (
    <div className={styles.main}>
      <div className={styles.loginContents}>
        <div>
          <img src="/assets/logo-dummy.svg" className={styles.logo} />
          <div className={styles.title}>
            管理画面に<br />サインインする
          </div>
          <ButtonWithSlack
            href={currentUser ? '/dashboard' : authUrl}
            title="Sign in with Slack"
          />
          <div className={styles.linkStartPlug}>
            これからPlugを始めたい方は<Link href="/"><span>こちら</span></Link>
          </div>
        </div>
      </div>
      <div className={styles.detailContents}>

      </div>
    </div>
  )
}

export default Login;