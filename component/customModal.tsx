import React, { SetStateAction } from 'react';
import { ImCross } from 'react-icons/im';
import styles from './customModal.module.css';
import TransitionDiv from './animation/transitionDiv';

export interface CustomModalProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  closeable?: boolean;
  onClose?: () => void;
  maxWidth?: string;
}

const CustomModal = ({ children, isOpen, setIsOpen, title, closeable, onClose, maxWidth }: CustomModalProps): JSX.Element => {

  const closeModal = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {
        isOpen ? ( // isOpenがtrueだったらModalを表示する
          <div
            className={styles.overlay}
            onClick={closeable ? closeModal : () => { return }}
          >
            <TransitionDiv
              direction='bottom'
              delay={0.1}
            >
              <div
                className={styles.modalContent}
                onClick={e => e.stopPropagation()}
                style={{ maxWidth: maxWidth }}
              >
                {closeable &&
                  <ImCross
                    size={20}
                    color={'gray'}
                    onClick={closeModal}
                    className={styles.closeButton}
                  />
                }
                {title &&
                  <div
                    className={styles.title + ' ' + (closeable ? '' : styles.textCenter)}
                    style={{ width: closeable ? 'calc( 100% - 48px )' : "" }}
                  >
                    {title}
                  </div>
                }
                <div className={styles.content}>
                  {children}
                </div>
              </div>
            </TransitionDiv>
          </div>
        ) : (
          <></>// isOpenがfalseの場合はModalは表示しない
        )}
    </>
  )
}

export default CustomModal;
