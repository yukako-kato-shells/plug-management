import IconSlack from "./IconSlack";
import styles from './buttonWithSlack.module.css';

interface ButtonWithSlackProps {
  href: string;
  title: string;
  disabled?: boolean;
}

const ButtonWithSlack: React.FC<ButtonWithSlackProps> = (props) => {
  return (
    <a
      href={props.href}
      className={props.disabled ? styles.disable : styles.enable}
    >
        <IconSlack size={20} grayScale={props.disabled} />
        {props.title}
    </a>
  )
}

export default ButtonWithSlack;