import Link from 'next/link';
import ButtonSignInWithSlack from '../../component/ButtonSignInWithSlack';
import styles from './index.module.css';

const Login: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.loginContents}>
        <div>
          <img src="/assets/logo-dummy.svg" className={styles.logo} />
          <div className={styles.title}>
            管理画面に<br />サインインする
          </div>
          <ButtonSignInWithSlack />
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