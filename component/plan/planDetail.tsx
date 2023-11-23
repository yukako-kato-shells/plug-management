import { Dispatch, SetStateAction, useState } from 'react';
import { IResGetPlanUpgrade } from '../../interfaces/IGetPlanUpgrade';
import ButtonDefault from '../buttonDefault';
import styles from './planDetail.module.css';

interface UpgradePlanDetailProps {
  data: IResGetPlanUpgrade;
  setIsProcessing: Dispatch<SetStateAction<boolean>>;
}

const UpgradePlanDetail: React.FC<UpgradePlanDetailProps> = (props) => {

  return (
    <div className={styles.main}>
      {/* 請求予定 */}
      <div className={styles.billing}>
        <div className={styles.title}>ご請求予定</div>
        <div className={styles.billingWrapper}>
          <div className={styles.dotBar}></div>
          {/* フリートライアルのカード */}
          { props.data.trial_days > 0 &&
            <div className={styles.billingCardWrapper}>
              <div className={styles.dot}></div>
              <div className={styles.cardFreeTrial}>
                <div>
                  <div className={styles.cardFreeTrialTitle}>残り{props.data.trial_days}日間のフリートライアル</div>
                  <div className={styles.memo}>※この期間に解約した場合課金は発生しません。</div>
                </div>
                <div className={styles.price0}>¥0</div>
              </div>
            </div>
          }
          {/* 初回請求のカード */}
          <div className={styles.billingCardWrapper}>
            <div className={styles.dot}></div>
            <div className={styles.cardFirstBilling}>
              <div className={styles.cardFirstBillingTitleWrapper}>
                <div>{props.data.first_billing_start_date} - {props.data.first_billing_end_date}の利用料（推定）</div>
                <div className={styles.cardFirstBillingTitlePrice}>
                  <div><span className={styles.bold}>{props.data.member_count}名</span>ご利用の場合</div>
                  <div className={styles.bold}>¥{props.data.member_count * props.data.unit_price}（税込）</div>
                </div>
              </div>
              <div>
                <div className={styles.memo}>※該当期間（１ヶ月ごと）にPlugから質問が一通以上送信された人数分の料金が期間の末日に請求されます</div>
                <div className={styles.memo}>※Plugからの質問は、対象チャンネルに存在しているメンバーに対し、定期的に送信されます</div>
              </div>
            </div>
          </div>

          {/* それ以降 */}
          <div className={styles.billingCardWrapper}>
            <div className={styles.dot}></div>
            <div>以降１ヶ月ごとにご請求　-　いつでも解約することができます。</div>
          </div>

        </div>
      </div>

      {/* ボタン */}
      <div className={styles.buttonArea}>
        <ButtonDefault
          text={"支払い方法の追加へすすむ"}
          onClick={() => {props.setIsProcessing(true)}}
        />
      </div>
    </div>
  )
}

export default UpgradePlanDetail;