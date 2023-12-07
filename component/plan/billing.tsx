import { Dispatch, SetStateAction, useState } from 'react';
import styles from './billing.module.css';
import FormCreditCard from '../form/formCreditCard';
import CustomModal from '../customModal';

interface UpgradePlanBillingProps {
  setIsProcessing: Dispatch<SetStateAction<boolean>>;
}

const UpgradePlanBilling: React.FC<UpgradePlanBillingProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState<boolean>(false);
  const [alertModalMessage, setAlertModalMessage] = useState<string>('');

  return (
    <div className={styles.main}>
      <div className={styles.title}>カード情報登録</div>
      <CustomModal
        title={"ご確認ください"}
        isOpen={isOpenAlertModal}
        setIsOpen={setIsOpenAlertModal}
        closeable={true}
      >
        {alertModalMessage}
      </CustomModal>

      {/* 請求予定 */}
      <FormCreditCard
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setIsOpenAlertModal={setIsOpenAlertModal}
        setAlertModalMessage={setAlertModalMessage}
      />
    </div>
  )
}

export default UpgradePlanBilling;