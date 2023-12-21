import Link from 'next/link';
import DashboardCard from './card';
import styles from './cardRanking.module.css';
import Ranking from './ranking';
import { IResGetDashboardRanking } from '../../interfaces/IGetDashboard';

interface CardRankingProps {
  data: IResGetDashboardRanking;
}

const CardRanking: React.FC<CardRankingProps> = (props) => {
  return (
    <DashboardCard>
      <div className={styles.main}>
        <div className={styles.titleArea}>
          <div className={styles.title}>ランキング</div>
          {/* <Link href=''><div className={styles.link}>詳細を見る</div></Link> */}
        </div>
        <div className={styles.coreActions}>
        { (props.data.core_action_rank.length == 0 && props.data.support_action_rank.length == 0) ?
          <div className={styles.noActions}>この期間にアクションはありません</div>
          :
          <Ranking data={props.data} />
        }
        </div>
      </div>
    </DashboardCard>
  )
}

export default CardRanking;