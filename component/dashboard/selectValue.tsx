import { Dispatch, SetStateAction } from "react";
import styles from './selectValue.module.css';
import { Value } from "../../pages/dashboard";
import { IResGetDashboardValueListDetail } from "../../interfaces/IGetDashboard";

interface SelectValueProps {
  values: IResGetDashboardValueListDetail[];
  valueUID: string;
  setValueUID: Dispatch<SetStateAction<string>>;
}

const SelectValue: React.FC<SelectValueProps> = (props) => {
  return (
    <select
      className={styles.selectBox}
      value={props.valueUID}
      onChange={(e) => {
        props.setValueUID(e.target.value);
      }}
    >
      { props.values.map((value: IResGetDashboardValueListDetail, index: number) => {
        return <option value={value.uid} key={index}>{value.title}</option>
      })}
    </select>
  )
}

export default SelectValue;