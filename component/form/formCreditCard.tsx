import React, { useEffect, useState } from 'react';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styles from './formCreditCard.module.css';
import { saveCardAndUpgrade } from '../../api/saveCardAndUpgrade';
import { IReqSaveCardAndUpgrade, IResSaveCardAndUpgrade } from '../../interfaces/ISaveCardAndUpgrade';
import { getSetupIntentClientSecret } from '../../api/getSetupIntentClientSecret';
import { useAuth } from '../../util/authContext';
import { toast } from 'react-toastify';
import ButtonDefault from '../buttonDefault';

interface FormCreditCardProps {
  isSuccess: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertModalMessage: React.Dispatch<React.SetStateAction<string>>;
}

const stripePromise = loadStripe(String(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY));

const FormCreditCard: React.FC<FormCreditCardProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CardRegistrationForm
        isSuccess={props.isSuccess}
        setIsSuccess={props.setIsSuccess}
        isLoading={props.isLoading}
        setIsLoading={props.setIsLoading}
        setIsOpenAlertModal={props.setIsOpenAlertModal}
        setAlertModalMessage={props.setAlertModalMessage}
      />
    </Elements>
  )
};

interface CardRegistrationFormProps {
  isSuccess: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertModalMessage: React.Dispatch<React.SetStateAction<string>>;
}

const CardRegistrationForm: React.FC<CardRegistrationFormProps> = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentUser, isUserReady } = useAuth();
  const [secret, setSecret] = useState<string>('');

  useEffect(() => {
    // TODO:戻す
    //if (currentUser && isUserReady) {
      getSetupIntentClientSecret().then((res) => {
        setSecret(res.client_secret);
      });
      props.setIsSuccess(false);
    //}
  }, [])

  const handleSubmit = async () => {
    if (!stripe || !elements) { return };
    const cardElm = elements.getElement(CardNumberElement);

    if (cardElm) {
      stripe.confirmCardSetup(secret, { payment_method: { card: cardElm } }).then(
        function (res) {
          if (res.error) {
            // Stripeエラー内容を表示
            props.setIsOpenAlertModal(true);
            props.setAlertModalMessage(String(res.error.message));
          } else {
            props.setIsLoading(true);
            const reqPostCard: IReqSaveCardAndUpgrade = {
              payment_method_id: String(res.setupIntent?.payment_method),
            }
            saveCardAndUpgrade(reqPostCard)
              .then((res: IResSaveCardAndUpgrade) => {
                // Success
                props.setIsLoading(false);
                toast.info('サブスクリプションを開始しました！');
                props.setIsSuccess(true);
              })
              .catch((err: Error) => {
                // Failure
                props.setIsOpenAlertModal(true);
                props.setAlertModalMessage(err.message);
              })
          }
        }
      );
    }
  }

  return (
    <div>
      <form
        id='payment-form'
        className={styles.cardForm}
        onSubmit={() => handleSubmit}
      >
        <label
          className={styles.label}
          htmlFor='card-number-element'
        >
          カード番号
        </label>
        <div className={styles.form}>
          <CardNumberElement
            id='card-number-element'
            options={{
              iconStyle: 'solid',
              style: {
                base: {
                  '::placeholder': {
                    fontSize: '17px',
                  },
                  'lineHeight': '30px',
                }
              }
            }}
          />
        </div>
        <div className={styles.lower}>
          <div>
            <label
              className={styles.label}
              htmlFor='card-expiry-element'
            >
              有効期限
            </label>
            <div className={styles.form}>
              <CardExpiryElement
                id='card-expiry-element'
                options={{
                  style: {
                    base: {
                      '::placeholder': {
                        fontSize: '17px',
                      },
                      'lineHeight': '30px',
                    }
                  }
                }}
              />
            </div>
          </div>
          <div>
            <label
              className={styles.label}
              htmlFor='card-expiry-element'
            >
              CVC
            </label>
            <div className={styles.form}>
              <CardCvcElement
                id='card-cvc-element'
                options={{
                  style: {
                    base: {
                      '::placeholder': {
                        fontSize: '17px',
                      },
                      'lineHeight': '30px',
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </form>
      <div className={styles.submitArea}>
        <ButtonDefault
          text={props.isLoading ? '処理中...' : 'アップグレードを確定する'}
          onClick={handleSubmit}
        />
      </div>
    </div>
  )
}

export default FormCreditCard;
