import styles from './customButton.module.css';
import { IconType } from 'react-icons';

interface CustomButtonProps {
  onClick: () => void;
  title: string;
  iconType?: IconType;
}

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return (
    <div
      className={styles.customButton}
      onClick={props.onClick}
    >
      {props.iconType && <props.iconType size={16} /> }
      <div>{props.title}</div>
    </div>
  )
}

export default CustomButton;