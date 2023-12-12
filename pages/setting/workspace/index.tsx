import { useEffect, useState } from "react";
import Layout from "../../../component/layout"
import LayoutSetting from "../../../component/layoutSetting"
import { getWorkspaceSetting } from "../../../api/getWorkspaceSetting";
import styles from "./index.module.css";
import { toast } from "react-toastify";
import { updateBeginningMonthOfTerm } from "../../../api/updateBeginningMonthOfTerm";
import { IReqUpdateBeginningMonthOfTerm } from "../../../interfaces/IUpdateBeginningMonthOfTerm";
import { RxCross1 } from "react-icons/rx";
import { BsFillPencilFill } from "react-icons/bs";

const SettingWorkspace: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [beginningMonthOfTerm, setBeginningMonthOfTerm] = useState<number>(1);
  const [isEditingBeginningMonth, setIsEditingBeginningMonth] = useState<boolean>(false);

  useEffect(() => {
    //if (!router.isReady || !router.query || !currentUser) return;
    getWorkspaceSetting().then((res) => {
      setBeginningMonthOfTerm(res.beginning_month_of_term);
    }).catch((err) => {
      toast.error("ワークスペース設定の取得に失敗しました");
    })
  }, [])

  const onUpdateBeginningMonthOfTerm = (month: number) => {
    const body: IReqUpdateBeginningMonthOfTerm = {
      beginning_month_of_term: month,
    }
    updateBeginningMonthOfTerm(body).then((res) => {
      if (res.result) {
        setBeginningMonthOfTerm(month);
        setIsEditingBeginningMonth(false);
        toast.error("期初月の変更が完了しました");
      }
    }).catch((err) => {
      toast.error("期初月の変更に失敗しました");
    })
  }

  return (
    <Layout>
      <LayoutSetting
        title="ワークスペース管理"
        isLoading={isLoading}
      >
        <div className={styles.main}>
          <div className={styles.content}>
            <div className={styles.contentTitle}>通知チャンネル設定</div>
            <div className={styles.contentDetail}>
              
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              <div>期初月設定</div>
              <div className={styles.memo}>
                期初月を設定するメリット ... デフォルトのデータ表示が期単位となり、集計や評価の際に活用しやすくなります
              </div>
            </div>
            <div className={styles.contentDetailBeginningMonth}>
              <div>現在の期初月：</div>
              { isEditingBeginningMonth ?
                <>
                  <select
                    className={styles.selectBeginingMonthOfTerm}
                    value={beginningMonthOfTerm}
                    onChange={(e) => onUpdateBeginningMonthOfTerm(Number(e.target.value))}
                  >
                    { Array
                        .from({ length: 12 }, (_, index) => index + 1)
                        .map((month: number, index: number) => {
                          return (
                            <option value={month} key={index}>
                              {month}月
                            </option>
                          )
                        })
                    }
                  </select>
                  <div onClick={() => setIsEditingBeginningMonth(false)}><RxCross1 /></div>
                </>
                :
                <>
                  <div style={{fontSize: '19px', fontWeight: 'bold', width: '100px'}}>{beginningMonthOfTerm}月</div>
                  <div
                    className={styles.editButtonBeginningMonth}
                    onClick={() => setIsEditingBeginningMonth(true)}
                  >
                    <BsFillPencilFill size={16} /><div>変更する</div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </LayoutSetting>
    </Layout>
  )
}

export default SettingWorkspace;