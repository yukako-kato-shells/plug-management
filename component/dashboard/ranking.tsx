import { FC } from "react"
import styles from './ranking.module.css';
import { IResGetDashboardRanking } from "../../interfaces/IGetDashboard";
import IconWrapper from "../iconWrapper";

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
            <IconWrapper
              icon_url={props.data.core_action_rank.length == 0 ? "" : props.data.core_action_rank[0].icon_url}
              size={46}
            />
          </div>
          <div>{props.data.core_action_rank[0].name}</div>
        </div>
        <div className={styles.otherMemberList}>
          {
            [1, 2, 3, 4].map((num, index) => {
              return (
                <div className={styles.otherMember} key={index}>
                  <IconWrapper
                    icon_url={props.data.core_action_rank[num] == null ? "" : props.data.core_action_rank[num].icon_url}
                    size={36}
                  />
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
            <IconWrapper
              icon_url={props.data.support_action_rank.length == 0 ? "" : props.data.support_action_rank[0].icon_url}
              size={46}
            />
          </div>
          <div>{props.data.support_action_rank[0].name}</div>
        </div>
        <div className={styles.otherMemberList}>
          {
            [1, 2, 3, 4].map((num, index) => {
              return (
                <div className={styles.otherMember} key={index}>
                  <IconWrapper
                    icon_url={props.data.core_action_rank[num] == null ? "" : props.data.core_action_rank[num].icon_url}
                    size={36}
                  />
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