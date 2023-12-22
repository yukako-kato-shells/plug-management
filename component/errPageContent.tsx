import { Dispatch, SetStateAction } from 'react';
import ButtonDefault from './buttonDefault';
import styles from './errPageContent.module.css'
import LayoutRegistration from './layoutRegistration';
import { useRouter } from 'next/router';


export interface ErrPageContentProps {
  code: string;
  message: string;
  detail: React.ReactNode;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ErrPageContent: React.FC<ErrPageContentProps> = (props) => {
  const router = useRouter();

  const backToHome = () => {
    props.setIsLoading(true);
    router.push('/');
  }

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <LayoutRegistration
      monotone={true}
      isLoading={props.isLoading}
    >
      <div className={styles.wrapper}>
        <div className={styles.errCode}>{props.code}</div>
        <h1>{props.message}</h1>
        <img src={'/assets/logo-failed-dummy.png'} />
        <p>{props.detail}</p>
        <div className={styles.buttonArea}>
          <ButtonDefault
            text='トップページに戻る'
            onClick={backToHome}
            disabled={false}
          />
        </div>
      </div>
    </LayoutRegistration>
  )
}

export default ErrPageContent;