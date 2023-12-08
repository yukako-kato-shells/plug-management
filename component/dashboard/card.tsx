import styles from './card.module.css';

interface DashboardCardProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = (props) => {
  return (
    <div
      className={styles.card}
      style={
        (props.backgroundColor ? {backgroundColor: props.backgroundColor} : {})
      }
    >
      {props.children}
    </div>
  )
}

export default DashboardCard;