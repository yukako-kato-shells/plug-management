import Link from 'next/link';
import styles from './dashboardRecentlyCoreAction.module.css'
import { convertDateFormat, unescapeHTML } from '../../util/common';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { IResGetDashboardRecentlyCoreAction } from '../../interfaces/IGetDashboard';
import IconWrapper from '../iconWrapper';


interface DashboardRecentlyCoreActionProps {
  data: IResGetDashboardRecentlyCoreAction[];
}

const DashboardRecentlyCoreAction: React.FC<DashboardRecentlyCoreActionProps> = (props) => {
  return (
    <div className={styles.main}>
      {/* title */}
      <div className={styles.titleArea}>
        <div className={styles.title}>直近のコアアクション</div>
        <Link href=""><div className={styles.link}>もっと見る</div></Link>
      </div>

      {/* コアアクションのリスト */}
      <div className={styles.coreActions}>
        { props.data.length == 0 && <div className={styles.noActions}>この期間にアクションはありません</div>}
        {
          props.data.slice(0,10).map((action, index) => {
            return (
              <div key={index}>
                { index != 0 &&
                  <div className={styles.border}></div>
                }
                <div className={styles.coreAction}>
                  {/* 日付 */}
                  <div className={styles.datetime}>
                    {convertDateFormat(action.created_at)}
                  </div>
                  {/* タイトル */}
                  <div className={styles.value}>
                    {action.value_title}
                  </div>
                  {/* 送信者、受信者 */}
                  <div className={styles.memberArea}>
                    <div className={styles.member}>
                      <IconWrapper icon_url={action.user_from.icon_url} size={28} />
                      <div>{action.user_from.name}</div>
                    </div>
                    <MdOutlineKeyboardDoubleArrowRight />
                    <div className={styles.member}>
                      <IconWrapper icon_url={action.user_to.icon_url} size={28} />
                      <div>{action.user_to.name}</div>
                    </div>
                  </div>

                  <div className={styles.detail}>
                    {action.detail}
                  </div>
                  <div className={styles.actionNumber}>
                    <div>
                      { action.reactions.map((reaction, index) => {
                        return (
                          <div key={index} className={styles.emoji}>
                            {reaction.is_custom ?
                              <><img src={reaction.icon_url} width={16} height={16} alt={reaction.name} /><div>：{reaction.count}</div></>
                              :
                              <>{unescapeHTML(reaction.unicode)}：{reaction.count}</>
                            }
                          </div>
                        )}
                      )}
                    </div>
                    <div>アクション数：{action.reactions.map(r => r.count).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
     </div>
  )
}

export default DashboardRecentlyCoreAction