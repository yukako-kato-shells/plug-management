import DashboardCard from "./card";
import styles from "./cardGraphCoreActionNumber.module.css";
import CustomBarChart from "./barChart";
import { IResGetDashboardActionNumberEachMonth, IResGetDashboardValue } from "../../interfaces/IGetDashboard";

interface CardGraphCoreActionNumberProps {
  data: IResGetDashboardActionNumberEachMonth[];
  values: IResGetDashboardValue[];
}

const CardGraphCoreActionNumber: React.FC<CardGraphCoreActionNumberProps> = (props) => {
  return (
    <DashboardCard>
      <div className={styles.main}>
        <div className={styles.titleArea}>
          <div className={styles.title}>コアアクション数遷移</div>
          {/* <Link href=""><div className={styles.link}>詳細を見る</div></Link> */}
        </div>
        <div className={styles.coreActions}>
        { props.data.length == 0 && <div className={styles.noActions}>この期間にアクションはありません</div>}
        { props.data.length != 0 &&
          <CustomBarChart data={props.data} values={props.values} />
        }
        </div>
      </div>
    </DashboardCard>
  )
}

export default CardGraphCoreActionNumber;