import { useEffect, useState } from 'react';
import styles from './inputPeriod.module.css';
import { BiCalendar } from "react-icons/bi";

interface InputPeriodProps {
  registeredMonth: string;
  beginningMonthOfTerm: number;
  period: Period;
  onChangePeriod: (period: Period) => void;
}


// 期間指定できる年月のリストを取得
// 期間の初め：登録年月の直前の期初月まで
// 期間の終わり：現在から直近の次の期初月末まで

// param
// registeredMonth: 登録年月 (yyyy-mm)
// beginningMonthOfTerm: 期初月 (yyyy-mm)
function getSelectMonthList(registeredMonth: string, beginningMonthOfTerm: number): string[] {
  const yearMonthList: string[] = [];
  const registeredDate = new Date(registeredMonth);
  const now = new Date();

  // 開始日の計算
  let startDate = new Date();
  // 登録年月が期初月と同じ場合
  if (registeredDate.getMonth() + 1 == beginningMonthOfTerm) {
    startDate = registeredDate;
  } else {
    if (registeredDate.getMonth() + 1 < beginningMonthOfTerm) {
      startDate = new Date(registeredDate.getFullYear() - 1, beginningMonthOfTerm - 1, 1);
    } else {
      startDate = new Date(registeredDate.getFullYear(), beginningMonthOfTerm - 1, 1);
    }
  }

  // 終了日の計算
  let endDate = new Date();

  // 今月が期末月だった場合
  if (now.getMonth() + 2 == beginningMonthOfTerm) {
    endDate = new Date(now.getFullYear(), now.getMonth(), 1);
  } else {
    if (now.getMonth() + 2 < beginningMonthOfTerm) {
      endDate = new Date(now.getFullYear(), beginningMonthOfTerm - 2, 1);
    } else {
      endDate = new Date(now.getFullYear() + 1, beginningMonthOfTerm - 2, 1);
    }
  }

  while (startDate <= endDate) {
    let year = startDate.getFullYear();
    let month = startDate.getMonth() + 1; // 月は0-indexedなので1を加える
    yearMonthList.push(`${year}-${String(month).padStart(2, '0')}`); // 年月の形式にフォーマット
    startDate.setMonth(startDate.getMonth() + 1); // 1ヶ月進める
  }
  return yearMonthList;
}

function compareYearMonths(yearMonth1: string, yearMonth2: string): number {
  const [year1, month1] = yearMonth1.split("-");
  const [year2, month2] = yearMonth2.split("-");

  if (year1 === year2) {
    if (month1 === month2) {
      return 0; // 同じ年月
    } else {
      return month1 < month2 ? -1 : 1; // 月の比較
    }
  } else {
    return year1 < year2 ? -1 : 1; // 年の比較
  }
}

const formatPeriod = (dateStr: string) => {
  return dateStr.replace("-", "/")
}

const InputPeriod: React.FC<InputPeriodProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tmpPeriod, setTmpPeriod] = useState<Period>({start_month: props.period.start_month, end_month: props.period.end_month})

  useEffect(() => {
    setTmpPeriod(props.period)
  }, [props])

  const onSave = () => {
    props.onChangePeriod(tmpPeriod);
    setIsOpen(false);
  }

  return (
    <div className={styles.main}>
      <div className={styles.input} onClick={() => setIsOpen(!isOpen)}>
        <BiCalendar size={24} color={"gray"} />
        <div>{formatPeriod(props.period.start_month)} - {formatPeriod(props.period.end_month)}</div>
      </div>
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}
      { isOpen &&
        <div className={styles.modal}>
          <div className={styles.modalContents}>
            <div className={styles.modalTitle}>期間を選択</div>
            <div className={styles.modalBody}>
              <div className={styles.modalBodyContents}>
                <div className={styles.modalBodyContentsTitle}>開始月</div>
                <div className={styles.modalBodyContentsInput}>
                  <select
                    className={styles.selectBox}
                    value={tmpPeriod.start_month}
                    onChange={(e) => {
                      const newPeriod = {start_month: e.target.value, end_month: tmpPeriod.end_month}
                      setTmpPeriod(newPeriod);
                    }}
                  >
                    { getSelectMonthList(props.registeredMonth, props.beginningMonthOfTerm)
                      .map((month: string, index: number) => {
                        return (
                          <option value={month} key={index}>
                            {month}
                          </option>
                        )
                    })}
                  </select>

                </div>
              </div>
              <div className={styles.modalBodyContents}>
                <div className={styles.modalBodyContentsTitle}>終了月</div>
                <div className={styles.modalBodyContentsInput}>
                <select
                  className={styles.selectBox}
                  value={tmpPeriod.end_month}
                  onChange={(e) => {
                    const newPeriod = {start_month: tmpPeriod.start_month, end_month: e.target.value}
                    setTmpPeriod(newPeriod);
                  }}
                >¥
                    {
                      getSelectMonthList(props.registeredMonth, props.beginningMonthOfTerm)
                        .filter(month => compareYearMonths(month, tmpPeriod.start_month) >= 0)
                        .map((month: string, index: number) => {
                          return (
                            <option value={month} key={index}>
                              {month}
                            </option>
                          )
                        })
                      }
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <div
                className={styles.modalFooterButton}
                onClick={onSave}
              >
                決定
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default InputPeriod;