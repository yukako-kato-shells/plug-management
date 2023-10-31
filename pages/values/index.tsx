import { FC, useEffect, useState } from "react"
import LayoutRegistration from "../../component/layoutRegistration";
import styles from './index.module.css';
import { getValues } from "../api/getValues";
import { IResGetValuesValue } from "../../interfaces/IResGetValues";

const InputValues: FC = () =>{
  const [values, setValues] = useState<IResGetValuesValue[]>([]);

  useEffect(() => {
    getValues().then((res) => {
      setValues(res.values);
    })
  }, [])

  return (
    <LayoutRegistration>
      <div className={styles.main}>
        <div className={styles.detailArea}>
          <div className={styles.detailTitle}>組織のバリュー</div>
          <div className={styles.detail}>
            {

            }
          </div>
        </div>
        <div className={styles.inputArea}>

        </div>
      </div>
    </LayoutRegistration>
  )
}

export default InputValues;