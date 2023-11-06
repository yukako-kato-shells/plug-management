import Link from 'next/link';
import styles from './index.module.css';
import ButtonWithSlack from '../../component/buttonWithSlack';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signInWithCustomToken } from 'firebase/auth';
import auth from '../../util/firebase';
import { useAuth } from '../../util/authContext';
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const authUrl = "https://slack.com/openid/connect/authorize?scope=openid%20email&amp;response_type=code&amp;redirect_uri=https%3A%2F%2Fvalued-bobcat-capital.ngrok-free.app%2Flogin&amp;client_id=6050609319142.6051238786710"

  useEffect(() => {
    //　ログイン処理
    if (router.isReady && router.query) {
      if (!currentUser && router.query.custom_token) {
          signInWithCustomToken(auth, String(router.query.custom_token)).then((result) => {
            toast.info('ログインしました。');
            //router.push('/dashboard');
          }).catch((error) => {
            toast.error('ログインに失敗しました。');
          })
      }
    }
  }, [router.isReady, router.query])

  return (
    <div className={styles.main}>
      <div className={styles.loginContents}>
        <div>
          <img src="/assets/logo-dummy.svg" className={styles.logo} />
          <div className={styles.title}>
            管理画面に<br />サインインする
          </div>
          {/* <div onClick={() => onClick()}>aaaaa</div> */}
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