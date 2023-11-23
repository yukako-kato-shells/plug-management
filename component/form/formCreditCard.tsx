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
import ButtonDefault from '../buttonDefault';
import { toast } from "react-toastify";
import { useAuth } from '../../util/authContext';
import CustomModal from '../customModal';
import { postCard } from '../../api/postCard';
import { IPostCard } from '../../interfaces/IPostCard';
import { getSetupIntentClientSecret } from '../../api/getSetupIntentClientSecret';

interface FormCreditCardProps {
  isSuccess: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  buttonTitle: string;
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
        buttonTitle={props.buttonTitle}
      />
    </Elements>
  )
};

interface CardRegistrationFormProps {
  isSuccess: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  buttonTitle: string;
}

const CardRegistrationForm: React.FC<CardRegistrationFormProps> = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const { currentUser, isUserReady } = useAuth();
  const [secret, setSecret] = useState<string>('');
  const [isOpenAlertModal, setIsOpenAlertModal] = useState<boolean>(false);
  const [alertModalMessage, setAlertModalMessage] = useState<string>('');

  useEffect(() => {
    if (currentUser && isUserReady) {
      getSetupIntentClientSecret().then((res: { client_secret: React.SetStateAction<string>; }) => {
        setSecret(res.client_secret);
      });
      props.setIsSuccess(false);
    }
  }, [currentUser, isUserReady, props, props.isSuccess])


  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElm = elements.getElement(CardNumberElement);
    if (cardElm) {
      stripe.confirmCardSetup(secret, { payment_method: { card: cardElm } }).then(
        function (result) {
          if (result.error) {
            // Stripeエラー内容を表示
            setIsOpenAlertModal(true);
            setAlertModalMessage(String(result.error.message));
          } else {
            props.setIsLoading(true);
            const reqPostCard: IPostCard = {
              payment_method_id: String(result.setupIntent?.payment_method),
            }
            postCard(reqPostCard).then((res: IPostCard) => {
                // Success
                props.setIsLoading(false);
                toast.info("新しいカード情報を登録しました");
                props.setIsSuccess(true);

                // formの内容をクリアする
                elements.getElement(CardNumberElement)!.clear();
                elements.getElement(CardExpiryElement)!.clear();
                elements.getElement(CardCvcElement)!.clear();
              })
              .catch((err: Error) => {
                // Failure
                setIsOpenAlertModal(true);
                setAlertModalMessage(err.message);
              })
          }
        }
      );
    }
  }

  return (
    <div>
      <CustomModal
        title={"ご確認ください"}
        isOpen={isOpenAlertModal}
        setIsOpen={setIsOpenAlertModal}
        closeable={true}
      >
        {alertModalMessage}
      </CustomModal>
      <form
        id='payment-form'
        className={styles.cardForm}
        onSubmit={handleSubmit}
      >
        <label
          className={styles.label}
          htmlFor='card-number-element'
        >
          {/* カード番号 */}
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
              {/* 有効期限 */}
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
          text={props.isLoading ? "処理中..." : props.buttonTitle}
          onClick={handleSubmit}
        />
      </div>
    </div>
  )
}

export default FormCreditCard;
