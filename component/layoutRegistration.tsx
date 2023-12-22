import { FC } from 'react';
import styles from './layoutRegistration.module.css';

interface LayoutRegistrationProps {
  children: React.ReactNode;
  monotone?: boolean;
  isLoading?: boolean;
}

const LayoutRegistration: FC<LayoutRegistrationProps> = (props) => {
  return (
    <div className={styles.main}>
      <img
        src='/assets/img_background.svg'
        className={styles.imageBackground + (props.monotone ? " " + styles.monotone : "")}
      />
      { props.isLoading ?
        <img src='/assets/animation_spinner.gif' />
        :
        props.children
      }
    </div>
  )
}

export default LayoutRegistration;