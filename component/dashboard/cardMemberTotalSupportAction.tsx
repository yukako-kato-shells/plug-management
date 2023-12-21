import DashboardCard from './card';
import styles from './cardMemberTotalSupportAction.module.css';

interface CardMemberTotalSupportActionProps {
  totalSupportActionNumber: number;
}

const CardMemberTotalSupportAction: React.FC<CardMemberTotalSupportActionProps> = (props) => {
  return (
    <DashboardCard>
      <div className={styles.main}>
        <div className={styles.titleArea}>
          <div className={styles.title}>サポートアクション数</div>
        </div>
        <div className={styles.coreActions}>
          <div className={styles.number}>{props.totalSupportActionNumber}</div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default CardMemberTotalSupportAction;