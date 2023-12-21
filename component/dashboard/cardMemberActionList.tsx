import { useState } from 'react';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

import styles from './cardMemberActionList.module.css';
import { IResGetMemberDashboardAction } from '../../interfaces/IGetMemberDashboard';
import { convertDateFormat, unescapeHTML } from '../../util/common';
import IconWrapper from '../iconWrapper';

interface CardMemberActionListProps {
  core_actions: IResGetMemberDashboardAction[];
  support_actions: IResGetMemberDashboardAction[];
}

const CardMemberActionList: React.FC<CardMemberActionListProps> = (props) => {
  const [currentTab, setCurrentTab] = useState<string>('coreAction');

  return (
    <div className={styles.main}>
      <div className={styles.tabList}>
        <div
          className={styles.tab + (currentTab == 'coreAction' ? ' ' + styles.active : '') }
          onClick={() => setCurrentTab('coreAction')}
        >
          コアアクション
        </div>
        <div
          className={styles.tab + (currentTab == 'supportAction' ? ' ' + styles.active : '')}
          onClick={() => setCurrentTab('supportAction')}
        >
          サポートアクション
        </div>
      </div>
      <div className={styles.card}>
        {
            ((currentTab == 'coreAction' && props.core_actions.length == 0) || (currentTab == 'supportAction' && props.support_actions.length == 0)) ?
            <div className={styles.noActions}>この期間にアクションはありません</div>
            :
            <>
              {(currentTab == 'coreAction' ? props.core_actions : props.support_actions).map((action, index) => {
                return (
                  <div key={index}>
                    { index != 0 &&
                      <div className={styles.border}></div>
                    }
                    <div className={styles.coreAction}>
                      {/* 送信者、受信者 */}
                      <div className={styles.top}>
                        <div className={styles.memberArea}>
                          <div className={styles.member}>
                            <IconWrapper icon_url={action.member_from.icon_url} size={28} />
                            <div>{action.member_from.name}</div>
                          </div>
                          <MdOutlineKeyboardDoubleArrowRight />
                          <div className={styles.member}>
                            <IconWrapper icon_url={action.member_to.icon_url} size={28} />
                            <div>{action.member_to.name}</div>
                          </div>
                        </div>
                        {/* 日付 */}
                        <div className={styles.datetime}>
                          {convertDateFormat(action.created_at)}
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
                        <div>
                          { action.reactions.map((reaction, index) => {
                            return (
                              <div key={index} className={styles.emojiArea}>
                                {reaction.is_custom ?
                                  <><img src={reaction.icon_url} width={16} height={16} alt={reaction.name} /><div>：{reaction.count}</div></>
                                  :
                                  <><div className={styles.emoji}>{unescapeHTML(reaction.unicode)}</div><div>：{reaction.count}</div></>
                                }
                              </div>
                            )}
                          )}
                        </div>
                        <div>
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