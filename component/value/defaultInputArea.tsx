import { Dispatch, SetStateAction } from "react";
import ButtonDefault from "../buttonDefault"
import styles from './defaultInputArea.module.css';
import { IValue, defaultIValue } from "../../interfaces/IValue";

interface DefaultInputAreaProps {
  setIsOpenForm: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<IValue>>;
}

const DefaultInputArea: React.FC<DefaultInputAreaProps> = (props) => {
  return (
    <div className={styles.main}>
      <div className={styles.title}>入力ありがとうございます！</div>
      <div className={styles.content}>
        <div>まだ入力していないバリューがある場合は</div>
        <ButtonDefault
          text="バリューを追加する"
          onClick={() => {
            props.setIsOpenForm(true);
            props.setValue(defaultIValue);
          }} />
      </div>
      <div className={styles.content}>
        <div>バリューの入力が完了した/後で入力する場合は</div>
        <ButtonDefault text="最後のステップへ進む" href="/channel" />
      </div>
    </div>
  )
}

export default DefaultInputArea;