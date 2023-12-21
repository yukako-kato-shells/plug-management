import DashboardCard from './card';
import styles from './cardTotalCoreAction.module.css';
import CustomPieChart from './pieChart';
import { IResGetDashboardTotalDetail, IResGetDashboardValue } from '../../interfaces/IGetDashboard';

interface CardTotalCoreActionProps {
  total: IResGetDashboardTotalDetail[];
  values: IResGetDashboardValue[];
}

const CardTotalCoreAction: React.FC<CardTotalCoreActionProps> = (props) => {
  const getTotalCount = (): number => {
    return props.total
      .map((item) => item.number)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }
  return (
    <DashboardCard>
      <div className={styles.main}>
        <div className={styles.titleArea}>
          <div className={styles.title}>コアアクション数の合計</div>
        </div>
        <div className={styles.coreActions}>
        { getTotalCount() == 0 ?
          <div className={styles.noActions}>この期間にアクションはありません</div>
          :
          <>
            <div className={styles.sumNum}>{getTotalCount()}</div>
            <CustomPieChart data={props.total} values={props.values} />
          </>
        }
        </div>
      </div>
    </DashboardCard>
  )
}

export default CardTotalCoreAction;