
import { useRouter } from 'next/router';
import styles from './textLength.module.css';
import { useEffect } from 'react';

interface TextLengthProps {
  maxLength: number;
  text: string;
}

export const TextLength: React.FC<TextLengthProps> = (props) => {
  const { locale } = useRouter();

  return (
    <div className={styles.textLength + ' ' + (props.text.length == props.maxLength && styles.maxTextLength)}>
      {props.text.length}/{props.maxLength}文字
    </div>
  )
}
