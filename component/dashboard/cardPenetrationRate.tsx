import DashboardCard from "./card";
import styles from "./cardPenetrationRate.module.css";
import CustomAreaChart from "./areaChart";
import { IResGetDashboardActionPercentageEachMonth } from "../../interfaces/IGetDashboard";

interface CardPenetrationRateProps {
  data: IResGetDashboardActionPercentageEachMonth[];
}

const CardPenetrationRate: React.FC<CardPenetrationRateProps> = (props) => {
  return (
    <DashboardCard>
      <div className={styles.main}>
        <div className={styles.titleArea}>
          <div className={styles.title}>バリュー浸透率</div>
        </div>
        <div className={styles.coreActions}>
        { props.data.length == 0 && <div className={styles.noActions}>この期間にアクションはありません</div>}
        { props.data.length != 0 &&
          <CustomAreaChart data={props.data} />
        }
        </div>
      </div>
    </DashboardCard>
  )
}

export default CardPenetrationRate;