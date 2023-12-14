import { useEffect, useState } from "react";
import Layout from "../../../component/layout";
import LayoutSetting from "../../../component/layoutSetting";
import { useAuth } from "../../../util/authContext";
import { getAccountSetting } from "../../../api/getAccountSetting";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { IResGetAccountSetting, defaultIResGetAccountSetting } from "../../../interfaces/IGetAccountSetting";
import { toast } from "react-toastify";
import ButtonDefault from "../../../component/buttonDefault";
import { validateEmail } from "../../../util/common";
import { updateEmailRequest } from "../../../api/updateEmailRequest";

const SettingMail: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [data, setData] = useState<IResGetAccountSetting>(defaultIResGetAccountSetting);

  useEffect(() => {
    //if (!router.isReady || !router.query || !currentUser) return;
    getAccountSetting().then((res) => {
      setData(res);
      setCurrentEmail(res.email);
      setNewEmail(res.email_waiting_change);
      setIsLoading(false);
    }).catch((err) => {
      toast.error("アカウント設定の取得に失敗しました");
    })
  }, [])

  // メールアドレスのバリデーション
  const validateInputEmail = () => {
    if (inputEmail == '') {
      return true;
    }
    return validateEmail(inputEmail);
  }

  const onSubmit = () => {
    setIsLoading(true);
    updateEmailRequest({ email: inputEmail })
      .then((res) => {
        if (res.result) {
          toast.info('確認メールを送信しました。メール内のリンクから認証をお願いいたします。');
          getAccountSetting().then((res) => {
            setData(res);
            setCurrentEmail(res.email);
            setNewEmail(res.email_waiting_change);
          })
        }
        setIsLoading(false);
      })
  }

  return (
    <Layout>
      <LayoutSetting
        title="メールアドレス管理"
        isLoading={isLoading}
      >
        <div>
          <div className={styles.formWrapper}>
            {data.email &&
              <>
                <div className={styles.formTitle}>
                  認証済みメールアドレス
                  <div className={styles.memo}>
                    ※こちらのメールアドレスに送信されます
                  </div>
                </div>
                <div className={styles.currentEmail}>
                  {data.email}
                </div>
              </>
            }
            {newEmail &&
              <>
                <div className={styles.formTitle}>
                  認証待ちメールアドレス
                </div>
                <div className={styles.currentEmail}>
                  {newEmail}
                </div>
              </>
            }
            <div className={styles.formTitle}>
              {currentEmail ? "変更したいメールアドレス" : "メールアドレス"}
            </div>
            <div className={styles.form}>
              <input
                value={inputEmail}
                onChange={(e) => {
                  setInputEmail(e.target.value);
                }}
                title="メールアドレス"
                name='email'
                placeholder='example@example.com'
              />
              {!validateInputEmail() &&
                <div className={styles.errMsg}>
                  メールアドレスを正しく入力してください。
                </div>
              }
              <div className={styles.memo}>
                {newEmail ?
                  "確認メール内のリンクをクリックし、認証を完了させてください。メールが届かない場合は、正しいメールアドレスを入力し、もう一度変更を実行してください。"
                  :
                  currentEmail ? "メールアドレスを変更すると確認メールが送信されます。メール内のURLをクリックすると変更完了です。" : "メールアドレスを登録すると確認メールが送信されます。メール内のURLをクリックすると変更完了です。"
                }
              </div>
            </div>
          </div>
          <ButtonDefault
            text={isLoading ? "送信中..." : "保存する"}
            disabled={inputEmail == "" || !validateInputEmail()}
            onClick={onSubmit}
          />
        </div>
      </LayoutSetting>
    </Layout>
  )
}

export default SettingMail;