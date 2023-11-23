import Link from "next/link";
import DashboardCard from "./card";
import styles from './coreAction.module.css';
import { convertDateFormat } from "../../util/common";

interface DashboardCoreActionProps {
  data: IResGetDashboardRecentlyCoreAction[];
}

const DashboardCoreAction: React.FC<DashboardCoreActionProps> = (props) => {
  return (
    <DashboardCard>
      <div className={styles.main}>
        <div className={styles.titleArea}>
          <div className={styles.title}>直近のコアアクション</div>
          <Link href=""><div className={styles.link}>詳細を見る</div></Link>
        </div>
        <div className={styles.coreActions}>
        { props.data.length == 0 && <div className={styles.noActions}>この期間にアクションはありません</div>}
        {
          props.data.slice(0,2).map((action, index) => {
            return (
              <div key={index}>
                { index != 0 &&
                  <div className={styles.border}></div>
                }
                <div className={styles.coreAction}>
                  <div>
                    <div className={styles.value}>{action.value_title}</div>
                    <div className={styles.datetime}>{convertDateFormat(action.created_at)}</div>
                  </div>
                  <div>
                    <div className={styles.memberTo}>
                      <img src={action.user_to.icon_url} alt="member_to" className={styles.iconMemberTo} />
                      <div>{action.user_to.name}</div>
                    </div>
                    <div className={styles.actionNumber}>アクション数：{action.reaction_number}</div>
                  </div>
                  <div className={styles.detail}>{action.detail}</div>
                  <div>
                    <div></div>
                    <div className={styles.memberFrom}>
                      <div>from</div>
                      <img src={action.user_from.icon_url} alt="member_from" className={styles.iconMemberFrom} />
                      <div>{action.user_from.name}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
    </DashboardCard>
  )
}

export default DashboardCoreAction;