import styles from './card.module.css';

interface DashboardCardProps {
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = (props) => {
  return (
    <div className={styles.card}>{props.children}</div>
  )
}

export default DashboardCard;