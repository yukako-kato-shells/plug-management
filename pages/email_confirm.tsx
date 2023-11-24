import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import { GiFallingStar } from 'react-icons/gi';
import { IReqConfirmEmail } from '../interfaces/IConfirmEmail';
import { confirmEmail } from '../api/confirmEmail';
import styles from './email_confirm.module.css';
import Layout from '../component/layout';
import { toast } from 'react-toastify';

const EmailConfirm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    const queryParams = new URLSearchParams(window.location.search);
    const body: IReqConfirmEmail = {
      confirmation_token: String(queryParams.get('confirmation_token'))
    }
    confirmEmail(body).then((res) => {
      setIsLoading(false);
      setIsConfirmed(res.result);
      setErrMessage(res.message);

      if (res.result) {
        toast.success('メールアドレスの変更が完了しました')
        setTimeout(() => { router.push('/dashboard') }, 5000);
      }
    })
  }, [])

  return (
    <Layout
      isLoading={isLoading}
    >
      <div className={styles.wrapper}>
        {isConfirmed &&
          <div className={styles.success}>
            <div>
              <div className={styles.en}>Success!</div>
              <div>認証に成功しました！</div>
              <div className={styles.note}>
                <GiFallingStar size={50} className={styles.icon} />
                <div>5秒後に自動的にトップページに遷移します...</div>
              </div>
            </div>
            <div className={styles.imgNavi}>
              <img src='/assets/navi/img_navi_normal_love_cheek_vivi_move.png' />
            </div>
          </div>
        }
        {!isConfirmed &&
          <div className={styles.failed}>
            <div>
              <div className={styles.en}>Failed...</div>
              <div>認証に失敗しました</div>
              <div className={styles.note}>
                <BsFillExclamationCircleFill size={40} className={styles.icon} />
                <div>{errMessage}</div>
              </div>
            </div>
            <div className={styles.imgNavi}>
              <img src='/assets/navi/img_navi_wonder_sweat.png' />
            </div>
          </div>
        }
      </div>
    </Layout >
  )
}

export default EmailConfirm;
