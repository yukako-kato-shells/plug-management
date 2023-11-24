import Link from 'next/link';
import styles from './buttonDefault.module.css';

interface ButtonDefaultProps {
  text: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
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
      <button
        type='button'
        className={styles.button}
        onClick={props.onClick}
        disabled={props.disabled}
        style={{ opacity: props.disabled ? 0.5 : 1 }}
      >
        {props.text}
      </button>
  )
}

export default ButtonDefault;