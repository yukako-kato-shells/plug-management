import { useEffect, useState } from "react";
import DashboardCoreAction from "../../component/dashboard/coreAction";
import Layout from "../../component/layout";
import styles from './index.module.css';
import { useRouter } from "next/router";
import { useAuth } from "../../util/authContext";
import { getDashboard } from "../../api/getDashboard";
import InputPeriod from "../../component/inputPeriod";

const getCurrentMonth = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  return `${year}-${month}`;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [period, setPeriod] = useState<Period>({start_month: getCurrentMonth(), end_month: getCurrentMonth()})
  const [data, setData] = useState<IResGetDashboard>({recently_core_actions: [], registered_month: ""});

  useEffect(() => {
    if (router.isReady && router.query) {
      if (currentUser) {
        const body: IReqGetDashboard = {
          start_month: period.start_month,
          end_month: period.end_month,
        }
        getDashboard(body).then((res) => {
          setData(res);
        })
      }
    }
  }, [currentUser, router.isReady, router.query, period])

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.title}>
          <InputPeriod
            registeredMonth={data.registered_month}
            period={period}
            setPeriod={setPeriod}
          />
        </div>
      <div className={styles.content}>
        <div className={styles.firstFloor}>
          <DashboardCoreAction data={data.recently_core_actions} />
        </div>
        <div className={styles.secondFloor}></div>
      </div>
     </div>
    </Layout>
  )
}

export default Dashboard;