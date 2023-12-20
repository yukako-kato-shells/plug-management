import { useState } from 'react';
import CheckBox from '../../component/checkbox';
import styles from './index.module.css';
import ButtonWithSlack from '../../component/buttonWithSlack';
import LayoutRegistration from '../../component/layoutRegistration';

const Install: React.FC = () => {
  const [checkedTerms, setCheckedTerms] = useState<boolean>(false);
  const [checkedEmail, setCheckedEmail] = useState<boolean>(false);

  return (
    <LayoutRegistration>
      <div className={styles.contentsArea}>
        <div className={styles.titleArea}>
          <img src="/assets/logo-dummy.svg" className={styles.logo} />
          <div className={styles.title}>
            アプリをインストールする
          </div>
        </div>
        <div>
          <div className={styles.checkboxArea}>
            <CheckBox
              checked={checkedTerms}
              label="利用規約とプライバシーポリシーに同意する"
              handleChange={() => setCheckedTerms(!checkedTerms)}
            />
            <CheckBox
              checked={checkedEmail}
              label="Slackワークスペース管理者のメールアドレスで通知を受け取る"
              handleChange={() => setCheckedEmail(!checkedEmail)}
            />
          </div>
          <div className={styles.buttonArea}>
            <ButtonWithSlack
              href={`${process.env.NEXT_PUBLIC_SLACK_APP_INSTALL_URL}`}
              title="インストールへすすむ"
              disabled={!checkedTerms || !checkedEmail}
            />
            <div>※Slackの認証ページが開きます</div>
          </div>
        </div>

        <div className={styles.memo}>インストール後、すぐメンバーにメッセージが<br />送られることはありませんのでご安心ください</div>
      </div>
    </LayoutRegistration>
  )
}

export default Install;