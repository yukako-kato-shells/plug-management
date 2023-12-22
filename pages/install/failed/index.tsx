import LayoutRegistration from '../../../component/layoutRegistration';
import styles from './index.module.css';

const InstallFailed: React.FC = () => {
  return (
    <LayoutRegistration
      monotone={true}
    >
      <div className={styles.main}>
        <img src='/assets/logo-dummy.svg' className={styles.logo} />
        <div className={styles.title}>
          インストールに失敗しました...
        </div>
        <img
          src='/assets/logo-failed-dummy.png'
          className={styles.logoFailed}
        />
        <div className={styles.memo}>
          大変お手数をおかけしますが、時間をおいて再度お試しください。
          <br />
          それでも解決しない場合は、お問い合わせからご連絡ください。
        </div>
      </div>
    </LayoutRegistration>
  )
}

export default InstallFailed;