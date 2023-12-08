import { useEffect, useState } from "react";
import Layout from "../../component/layout";
import styles from './index.module.css';
import { useRouter } from "next/router";
import { useAuth } from "../../util/authContext";
import { getDashboard } from "../../api/getDashboard";
import InputPeriod from "../../component/dashboard/inputPeriod";
import DashboardRecentlyCoreAction from "../../component/dashboard/dashboardRecentlyCoreAction";
import SelectValue from "../../component/dashboard/selectValue";
import CardPenetrationRate from "../../component/dashboard/cardPenetrationRate";
import CardGraphCoreActionNumber from "../../component/dashboard/cardGraphCoreActionNumber";
import CardRanking from "../../component/dashboard/cardRanking";
import CardTotalCoreAction from "../../component/dashboard/cardTotalCoreAction";
import { IReqGetDashboard, IResGetDashboard, IResGetDashboardValueListDetail, defalutResGetDashboard } from '../../interfaces/IGetDashboard';
import CustomLegend from "../../component/dashboard/legend";

export interface Value {
  uid: string;
  title: string;
  color: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [period, setPeriod] = useState<Period>({start_month: '', end_month: ''})
  const [values, setValues] = useState<IResGetDashboardValueListDetail[]>([]);
  const [valueUID, setValueUID] = useState<string>("");
  const [data, setData] = useState<IResGetDashboard>(defalutResGetDashboard);

  // 初回アクセス
  useEffect(() => {
    if (router.isReady && router.query) {
      //if (currentUser) {
        // 初回アクセスの場合は、`start_month`と`end_month`は空の状態で送信。
        // その場合は、期初月から　12ヶ月を指定されたものとしてデータが返却される
        const body: IReqGetDashboard = {
          start_month: String(router.query.start_month ? router.query.start_month : ""),
          end_month: String(router.query.end_month ? router.query.end_month : ""),
          value_uid: valueUID,
        }
        getDashboard(body).then((res) => {
          setData(res);
          // valueのリストを作成
          let tmpValues = res.values.map((value: IResGetDashboardValueListDetail) => {
            return { uid: value.uid, title: value.title }
          })
          tmpValues.unshift({uid: "", title: "全てのvalue"});
          setValues(tmpValues);

          // 期間指定をstateに保存
          setPeriod({
            start_month: res.period.start_month,
            end_month: res.period.end_month,
          });
        })
      //}
    }
  }, [currentUser, router.isReady, router.query, valueUID])

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.dashboardArea}>
          <div className={styles.titleArea}>
            <div className={styles.title}>アクションダッシュボード</div>
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
            <div className={styles.firstFloor}>
              <div style={{ gridRow: '1 / 2', gridColumn: '1 / 3' }}>
                <CardPenetrationRate data={data.action_percentage_each_month} />
              </div>
              <div style={{ gridRow: '1 / 2', gridColumn: '3 / 4' }}>
                <CardRanking data={data.ranking} />
              </div>
              <div style={{ gridRow: '2 / 3', gridColumn: '1 / 2' }}>
                <CardTotalCoreAction
                  total={data.total}
                  values={data.values}
                />
              </div>
              <div style={{ gridRow: '2 / 3', gridColumn: '2 / 4' }}>
                <CardGraphCoreActionNumber
                  data={data.action_number_each_month}
                  values={data.values}
                />
              </div>
            </div>
            <CustomLegend values={data.values} />
          </div>
        </div>

        <DashboardRecentlyCoreAction data={data.recently_core_actions} />
      </div>
    </Layout>
  )
}

export default Dashboard;