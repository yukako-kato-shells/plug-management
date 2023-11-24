import { use, useEffect, useState } from "react";
import Layout from "../../../../component/layout";
import LayoutSetting from "../../../../component/layoutSetting";
import { useAuth } from "../../../../util/authContext";
import { useRouter } from "next/router";
import { getPlanUpgrade } from "../../../../api/getPlanUpgrade";
import styles from './index.module.css';
import { IResGetPlanUpgrade, defaultIResGetPlanUpgrade } from "../../../../interfaces/IGetPlanUpgrade";
import UpgradePlanDetail from "../../../../component/plan/planDetail";

const Upgrade: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [data, setData] = useState<IResGetPlanUpgrade>(defaultIResGetPlanUpgrade);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    if (router.isReady && router.query) {
      // if (currentUser) {
        getPlanUpgrade().then((res) => {
          setData(res);
          setIsLoading(false);
        }).catch((err) => {
          console.log(err);
          setIsLoading(false);
        })
      // }
    }
  }, [currentUser, router.isReady, router.query])

  return (
    <Layout>
      <LayoutSetting
        title="プランをアップグレード"
        isLoading={isLoading}
      >
        <div className={styles.main}>
          {/* アップグレード内容 */}
          <div className={styles.plan}>
            <div className={styles.planCard}>
              <div className={styles.planDetail}>
                <div className={styles.planDetailTitle}>プラン</div>
                <div className={styles.title}>BASICプラン</div>
              </div>
              <div className={styles.planDetail}>
                <div className={styles.planDetailTitle}>対象チャンネル</div>
                <div>#{data.channel_name}</div>
              </div>

              <div className={styles.planDetail}>
                <div className={styles.planDetailTitle}>現在の対象メンバー数</div>
                <div>{data.member_count}名</div>
              </div>

              <div className={styles.planDetail}>
                <div className={styles.planDetailTitle}>単価</div>
                <div>1人あたり月額 ¥{data.unit_price}（税込）</div>
              </div>
            </div>
          </div>
          <UpgradePlanDetail data={data} />
        </div>
      </LayoutSetting>
    </Layout>
  )
}

export default Upgrade