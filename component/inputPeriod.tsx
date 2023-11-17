import { SetStateAction, useState } from 'react';
import styles from './inputPeriod.module.css';
import { BiCalendar } from "react-icons/bi";

interface InputPeriodProps {
  registeredMonth: string;
  period: Period;
  setPeriod: React.Dispatch<SetStateAction<Period>>;
}


// 登録月から現在までの年月リストを取得
function getSelectMonthList(registeredMonth: string): string[] {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [startYear, startMonth] = registeredMonth.split('-').map(Number);
  const yearMonthList: string[] = [];

  let year = startYear;
  let month = startMonth;

  while (year < currentYear || (year === currentYear && month <= currentMonth)) {
    const formattedMonth = ('0' + month).slice(-2);
    yearMonthList.push(`${year}-${formattedMonth}`);

    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }
  return yearMonthList;
}

function compareYearMonths(yearMonth1: string, yearMonth2: string): number {
  const [year1, month1] = yearMonth1.split('-').map(Number);
  const [year2, month2] = yearMonth2.split('-').map(Number);

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

const InputPeriod: React.FC<InputPeriodProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tmpPeriod, setTmpPeriod] = useState<Period>({start_month: props.period.start_month, end_month: props.period.end_month})
  
  const onSave = () => {
    props.setPeriod(tmpPeriod);
    setIsOpen(false);
  }

  return (
    <div className={styles.main}>
      <div className={styles.input} onClick={() => setIsOpen(!isOpen)}>
        <BiCalendar size={28} color={"gray"} />
        <div>{props.period.start_month} - {props.period.end_month}</div>
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
                    { getSelectMonthList(props.registeredMonth).map((month: string, index: number) => {
                      return <option value={month} key={index}>{month}</option>
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
                >
                    {
                      getSelectMonthList(props.registeredMonth)
                        .filter(month => compareYearMonths(month, tmpPeriod.start_month) >= 0)
                        .map((month: string, index: number) => {
                          return <option value={month} key={index}>{month}</option>
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