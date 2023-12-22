import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import styles from './index.module.css';
import { useAuth } from '../../../util/authContext';
import { getPlan } from '../../../api/getPlan';
import { getCustomerPortalSession } from '../../../api/getCustomerPortalSession';
import { IResGetPlan, defaultIResGetPlan } from '../../../interfaces/IGetPlan';
import Layout from '../../../component/layout'
import LayoutSetting from '../../../component/layoutSetting';

const SettingPlan: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [data, setData] = useState<IResGetPlan>(defaultIResGetPlan);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    if (!router.isReady || !router.query || !currentUser) return;

    getPlan().then((res) => {
      setData(res);
      setIsLoading(false);
    }).catch((err) => {
      toast.error('プラン情報の取得に失敗しました');
    })
  }, [currentUser, router.isReady, router.query]);

  return (
    <Layout>
      <LayoutSetting
        title='プラン変更'
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      >
        <div className={styles.main}>
          <div className={styles.content}>
            <div className={styles.contentTitle}>ご契約プラン</div>
            <div className={styles.bar}></div>
            <div>
              <div><span className={styles.planName}>{data.current_plan.name}</span>（{data.current_plan.start_date} {data.current_plan.end_date != '' ? data.current_plan.end_date : 'より開始'}）</div>
              {(data.next_plan.name != '' ? <div>ご変更受付済： {data.next_plan.name} （{data.next_plan.start_date}〜）</div> : '')}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>ご利用人数</div>
            <div className={styles.bar}></div>
            <div>{data.next_charge.number}人（期間：{data.next_charge.start_date} - {data.next_charge.end_date}）</div>
          </div>

          <div className={styles.card}>
            <div>※トライアルが終了すると、自動的にFREEプランに移行します。いつでもBASICプランにプラン変更することができます。プランをアップグレードしても、フリープラン期間中は課金が発生しません。</div>
            <div className={styles.buttonArea}>
              <div className={styles.button}><Link href='/setting/plan/upgrade'>プランをアップグレードする</Link></div>
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
            支払いの履歴・クレジットカードの変更はこちら
          </div>
        </div>
      </LayoutSetting>
    </Layout>
  )
}

export default SettingPlan;