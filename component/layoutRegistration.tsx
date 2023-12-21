import { FC } from 'react';
import styles from './layoutRegistration.module.css';

interface LayoutRegistrationProps {
  children: React.ReactNode;
}

const LayoutRegistration: FC<LayoutRegistrationProps> = (props) => {
  return (
    <div className={styles.main}>
      <img
        src='/assets/img_background.svg'
        className={styles.imageBackground}
      />
      {props.children}
    </div>
  )
}

export default LayoutRegistration;