import Link from 'next/link';
import styles from './buttonDefault.module.css';

interface ButtonDefaultProps {
  text: string;
  onClick?: () => void;
  href?: string;
}

const ButtonDefault: React.FC<ButtonDefaultProps> = (props) => {
  return (
    (props.href) ?
      <Link href={props.href}>
        <div
          className={styles.button}
        >
          {props.text}
        </div>
      </Link>
      :
      <div
        className={styles.button}
        onClick={props.onClick}
      >
        {props.text}
      </div>
  )
}

export default ButtonDefault;