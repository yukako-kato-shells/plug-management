import Link from 'next/link';
import styles from './index.module.css';
import ButtonWithSlack from '../../component/buttonWithSlack';

const Login: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.loginContents}>
        <div>
          <img src="/assets/logo-dummy.svg" className={styles.logo} />
          <div className={styles.title}>
            管理画面に<br />サインインする
          </div>
          <ButtonWithSlack
            href="https://slack.com/openid/connect/authorize?scope=openid%20email&amp;response_type=code&amp;redirect_uri=https%3A%2F%2Fwhole-lionfish-champion.ngrok-free.app%2Fslack%2Foauth_redirect&amp;client_id=6050609319142.6051238786710&amp;state=http://localhost:3000/dashboard"
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