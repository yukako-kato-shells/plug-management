import { FC, useEffect, useState } from "react"
import LayoutRegistration from "../../component/layoutRegistration";
import styles from './index.module.css';
import { getValues } from "../../api/values/getValues";
import { IValue, defaultIValue } from "../../interfaces/IValue";
import { BsFillPencilFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import _ from 'lodash';
import FormValue from "../../component/formValue";
import ButtonDefault from "../../component/buttonDefault";
import DefaultInputArea from "../../component/value/defaultInputArea";

const InputValues: FC = () =>{
  const [values, setValues] = useState<IValue[]>([]);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<IValue>(defaultIValue);

  useEffect(() => {
    getValues().then((res) => {
      console.log(res.values)
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
              values.map((value, index) => {
                return (
                  <div key={index} className={styles.valueArea}>
                    <div className={styles.valueTitleArea}>
                      <div>{value.title}</div>
                      <div
                        onClick={() => {
                          setEditValue(value);
                          setIsOpenForm(true);
                        }}
                        className={styles.editIcon}
                      >
                        <BsFillPencilFill size={20} />
                      </div>
                    </div>
                    <div className={styles.valueDetailArea}>
                      {value.detail}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className={styles.inputArea}>
          { isOpenForm ?
            <div className={styles.inputForm}>
              <div className={styles.inputAreaTitle}>
                <div>{editValue.uid ? "バリューを更新する" : "新しいバリューを追加する"}</div>
                <div onClick={() => setIsOpenForm(false)}>
                  <IoCloseSharp size={32} />
                </div>
              </div>
              <FormValue
                value={editValue}
                setValue={setEditValue}
                setValues={setValues}
              />
            </div>
            :
            <DefaultInputArea
              setIsOpenForm={setIsOpenForm}
              setValue={setEditValue}
            />
          }
        </div>
      </div>
    </LayoutRegistration>
  )
}

export default InputValues;