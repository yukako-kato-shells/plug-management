import { useEffect, useState } from "react";
import { IResGetMemberDashboardAction } from "../../interfaces/IGetMemberDashboard";
import styles from './cardMemberActionList.module.css';
import { convertDateFormat } from "../../util/common";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

interface CardMemberActionListProps {
  core_actions: IResGetMemberDashboardAction[];
  support_actions: IResGetMemberDashboardAction[];
}

const CardMemberActionList: React.FC<CardMemberActionListProps> = (props) => {
  const [currentTab, setCurrentTab] = useState<string>("coreAction");

  return (
    <div className={styles.main}>
      <div className={styles.tabList}>
        <div
          className={styles.tab + (currentTab == "coreAction" ? " " + styles.active : "") }
          onClick={() => setCurrentTab("coreAction")}
        >
          コアアクション
        </div>
        <div
          className={styles.tab + (currentTab == "supportAction" ? " " + styles.active : "")}
          onClick={() => setCurrentTab("supportAction")}
        >
          サポートアクション
        </div>
      </div>
      <div className={styles.card}>
        {
            ((currentTab == "coreAction" && props.core_actions.length == 0) || (currentTab == "supportAction" && props.support_actions.length == 0)) ?
            <div className={styles.noActions}>この期間にアクションはありません</div>
            :
            <>
              {(currentTab == "coreAction" ? props.core_actions : props.support_actions).map((action, index) => {
                return (
                  <div key={index}>
                    { index != 0 &&
                      <div className={styles.border}></div>
                    }
                    <div className={styles.coreAction}>
                      {/* 送信者、受信者 */}
                      <div className={styles.memberArea}>
                        <div className={styles.member}>
                          <img src={action.member_from.icon_url} alt="member_from" className={styles.iconMember} />
                          <div>{action.member_from.name}</div>
                        </div>
                        <MdOutlineKeyboardDoubleArrowRight />
                        <div className={styles.member}>
                          <img src={action.member_to.icon_url} alt="member_to" className={styles.iconMember} />
                          <div>{action.member_to.name}</div>
                        </div>
                      </div>
                      {/* タイトル */}
                      <div className={styles.value}>
                        {action.value_title}
                      </div>
                      <div className={styles.detail}>
                        {action.detail}
                      </div>
                      <div className={styles.reactionArea}>
                        {/* 日付 */}
                        <div className={styles.datetime}>
                          {convertDateFormat(action.created_at)}
                        </div>
                        <div className={styles.actionNumber}>
                          アクション数：{action.reactions.map((reaction) => reaction.count)}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </>
          }
      </div>
    </div>
  )
}

export default CardMemberActionList;