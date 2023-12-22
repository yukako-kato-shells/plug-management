import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './index.module.css';
import { useAuth } from '../../../util/authContext';
import { getMemberDashboard } from '../../../api/getMemberDashboard';
import {
  IReqGetMemberDashboard,
  IResGetMemberDashboard,
  IResGetMemberDashboardValueListDetail,
  defaultIResGetMemberDashboard,
} from '../../../interfaces/IGetMemberDashboard';
import Layout from '../../../component/layout';
import SelectValue from '../../../component/dashboard/selectValue';
import InputPeriod from '../../../component/dashboard/inputPeriod';
import CardMemberTotalCoreAction from '../../../component/dashboard/cardMemberTotalCoreAction';
import CardMemberTotalSupportAction from '../../../component/dashboard/cardMemberTotalSupportAction';
import CardMemberActionTransition from '../../../component/dashboard/cardMemberActionTransition';
import CardMemberActionList from '../../../component/dashboard/cardMemberActionList';
import IconWrapper from '../../../component/iconWrapper';

const MemberDashboard: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [period, setPeriod] = useState<Period>({start_month: '', end_month: ''})
  const [values, setValues] = useState<IResGetMemberDashboardValueListDetail[]>([]);
  const [valueUID, setValueUID] = useState<string>('');
  const [data, setData] = useState<IResGetMemberDashboard>(defaultIResGetMemberDashboard);

  useEffect(() => {
    if (!router.isReady || !router.query || !currentUser) return;

    // 初回アクセスの場合は、`start_month`と`end_month`は空の状態で送信。
    // その場合は、期初月から　12ヶ月を指定されたものとしてデータが返却される
    const body: IReqGetMemberDashboard = {
      member_uid: router.query.uid as string,
      start_month: String(router.query.start_month ? router.query.start_month : ''),
      end_month: String(router.query.end_month ? router.query.end_month : ''),
      value_uid: valueUID,
    }
    getMemberDashboard(body).then((res) => {
      setData(res);
      setPeriod(res.period);

      // valueのリストを作成
      let tmpValues = res.values.map((value: IResGetMemberDashboardValueListDetail) => {
        return { uid: value.uid, title: value.title }
      })
      tmpValues.unshift({uid: '', title: '全てのvalue'});
      setValues(tmpValues);
    })
  }, [currentUser, router.isReady, router.query, valueUID])

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.titleArea}>
          <div>
            <IconWrapper icon_url={data.icon_url} size={40} />
            <div className={styles.title}>{data.name}さんのダッシュボード</div>
          </div>
          <div className={styles.selectBoxArea}>
            <SelectValue
              values={values}
              valueUID={valueUID}
              setValueUID={setValueUID}
            />
            <InputPeriod
              registeredMonth={data.registered_month}
              beginningMonthOfTerm={data.beginning_month_of_term}
              period={period}
              setPeriod={setPeriod}
            />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.cardArea}>
            <div style={{ gridRow: '1 / 2', gridColumn: '1 / 2' }}>
              <CardMemberTotalCoreAction totalCoreActionNumber={data.core_actions.length} />
            </div>
            <div style={{ gridRow: '1 / 2', gridColumn: '2 / 3' }}>
              <CardMemberTotalSupportAction totalSupportActionNumber={data.support_actions.length} />
            </div>
            <div style={{ gridRow: '2 / 3', gridColumn: '1 / 3' }}>
              <CardMemberActionTransition actionTransitions={data.action_transition} values={data.values} />
            </div>
            <div style={{ gridRow: '1 / 3', gridColumn: '3 / 4' }}>
              <CardMemberActionList core_actions={data.core_actions} support_actions={data.support_actions} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MemberDashboard;