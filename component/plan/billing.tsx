import { Dispatch, SetStateAction, useState } from 'react';
import styles from './billing.module.css';
import FormCreditCard from '../form/formCreditCard';

interface UpgradePlanBillingProps {
  setIsProcessing: Dispatch<SetStateAction<boolean>>;
}

const UpgradePlanBilling: React.FC<UpgradePlanBillingProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  return (
    <div className={styles.main}>
      <div className={styles.title}>カード情報登録</div>
      {/* 請求予定 */}
      <FormCreditCard
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        buttonTitle="アップグレードを確定する"
      />
    </div>
  )
}

export default UpgradePlanBilling;