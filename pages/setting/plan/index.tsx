import Layout from "../../../component/layout"
import LayoutSetting from "../../../component/layoutSetting";
import styles from './index.module.css';

const Plan: React.FC = () => {
  return (
    <Layout>
      <LayoutSetting
        title="プラン変更"
      >
        <div className={styles.main}>
          <div className={styles.content}>
            <div className={styles.contentTitle}>ご契約プラン</div>
            <div className={styles.bar}></div>
            <div>BASICプランフリートライアル（2023/11/30まで）</div>
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>ご利用人数</div>
            <div className={styles.bar}></div>
            <div>2人（期間：2023/1030 - 11/30）</div>
          </div>

          <div className={styles.card}>
            <div>※トライアルが終了すると、自動的にFREEプランに移行します。いつでもBASICプランにプラン変更することができます。プランをアップグレードしても、フリープラン期間中は課金が発生しません。</div>
            <div className={styles.buttonArea}>
              <div className={styles.button}>プランをアップグレードする</div>
              <div className={styles.buttonOnline}>プランの詳細を確認する</div>
            </div>
          </div>
        </div>
      </LayoutSetting>
    </Layout>
  )
}

export default Plan;