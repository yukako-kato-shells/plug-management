import DashboardCard from "./card";
import styles from './cardMemberTotalCoreAction.module.css';

interface CardMemberTotalCoreActionProps {
  totalCoreActionNumber: number;
}

const CardMemberTotalCoreAction: React.FC<CardMemberTotalCoreActionProps> = (props) => {
  return (
    <DashboardCard>
      <div className={styles.main}>
        <div className={styles.titleArea}>
          <div className={styles.title}>コアアクション数</div>
        </div>
        <div className={styles.coreActions}>
          <div className={styles.number}>{props.totalCoreActionNumber}</div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default CardMemberTotalCoreAction;