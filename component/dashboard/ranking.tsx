import { FC } from "react"
import styles from './ranking.module.css';
import { IResGetDashboardRanking } from "../../interfaces/IGetDashboard";

interface RankingProps {
  data: IResGetDashboardRanking;
}

const Ranking: FC<RankingProps> = (props) => {
  return (
    <div className={styles.main}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>コアアクショントップ５</div>
        <div className={styles.topMember}>
          <div>
            { props.data.core_action_rank.length == 0 ?
              <div className={styles.noIconTop} />
              :
              <img src={props.data.core_action_rank[0].icon_url} />
            }
          </div>
          <div>{props.data.core_action_rank[0].name}</div>
        </div>
        <div className={styles.otherMemberList}>
          {
            [1, 2, 3, 4].map((num, index) => {
              return (
                <div className={styles.otherMember} key={index}>
                  { props.data.core_action_rank[num] == null ?
                    <div className={styles.noIcon}></div>
                    :
                    <img src={props.data.core_action_rank[num].icon_url} />
                  }
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>サポートアクショントップ５</div>
        <div className={styles.topMember}>
          <div>
            { props.data.support_action_rank.length == 0 ?
              <div className={styles.noIconTop} />
              :
              <img src={props.data.support_action_rank[0].icon_url} />
            }
          </div>
          <div>{props.data.support_action_rank[0].name}</div>
        </div>
        <div className={styles.otherMemberList}>
          {
            [1, 2, 3, 4].map((num, index) => {
              return (
                <div className={styles.otherMember} key={index}>
                  { props.data.core_action_rank[num] == null ?
                    <div className={styles.noIcon}></div>
                    :
                    <img src={props.data.core_action_rank[num].icon_url} />
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Ranking;