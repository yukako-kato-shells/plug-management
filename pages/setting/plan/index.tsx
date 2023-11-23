import { useEffect, useState } from "react";
import Layout from "../../../component/layout"
import LayoutSetting from "../../../component/layoutSetting";
import styles from './index.module.css';
import { useRouter } from "next/router";
import { useAuth } from "../../../util/authContext";
import { getPlan } from "../../../api/getPlan";
import { IResGetPlan, defaultIResGetPlan } from "../../../interfaces/IGetPlan";
import Link from "next/link";
import { getCustomerPortalSession } from "../../../api/getCustomerPortalSession";

const Plan: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [data, setData] = useState<IResGetPlan>(defaultIResGetPlan);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    if (router.isReady && router.query) {
      // if (currentUser) {
        getPlan().then((res) => {
          setData(res);
          setIsLoading(false);
        }).catch((err) => {
          console.log(err);
          setIsLoading(false);
        })
      // }
    }
  }, []); // currentUser, router.isReady, router.query

  return (
    <Layout>
      <LayoutSetting
        title="プラン変更"
        isLoading={isLoading}
      >
        <div className={styles.main}>
          <div className={styles.content}>
            <div className={styles.contentTitle}>ご契約プラン</div>
            <div className={styles.bar}></div>
            <div>
              <div><span className={styles.planName}>{data.plan.current_plan.name}</span>（{data.plan.current_plan.start_date} {data.plan.current_plan.end_date != "" ? data.plan.current_plan.end_date : "より開始"}）</div>
              {(data.plan.next_plan.name != "" ? <div>ご変更受付済： {data.plan.next_plan.name} （{data.plan.next_plan.start_date}〜）</div> : "")}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>ご利用人数</div>
            <div className={styles.bar}></div>
            <div>{data.member.number}人（期間：{data.member.start_date} - {data.member.end_date}）</div>
          </div>

          <div className={styles.card}>
            <div>※トライアルが終了すると、自動的にFREEプランに移行します。いつでもBASICプランにプラン変更することができます。プランをアップグレードしても、フリープラン期間中は課金が発生しません。</div>
            <div className={styles.buttonArea}>
              <div className={styles.button}><Link href="/setting/plan/upgrade">プランをアップグレードする</Link></div>
              <div className={styles.buttonOnline}>プランの詳細を確認する</div>
            </div>
          </div>

          <div
            className={styles.buttonToCustomerPortal}
            onClick={() => {
            getCustomerPortalSession().then((res) => {
              window.location.href = res.url;
            })
          }}>
            支払いの履歴・支払い方法の変更はこちら
          </div>
        </div>
      </LayoutSetting>
    </Layout>
  )
}

export default Plan;