import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { BsFillPencilFill } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';
import _ from 'lodash';

import styles from './index.module.css';
import { MAX_COUNT_VALUES } from '../../util/constant';
import { useAuth } from '../../util/authContext';
import { getValues } from '../../api/values/getValues';
import { IValue, defaultIValue } from '../../interfaces/IValue';
import FormValue from '../../component/formValue';
import LayoutRegistration from '../../component/layoutRegistration';
import DefaultInputArea from '../../component/value/defaultInputArea';


const InputValues: FC = () =>{
  const router = useRouter();
  const { currentUser } = useAuth();
  const [values, setValues] = useState<IValue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<IValue>(defaultIValue);

  useEffect(() => {
    setIsLoading(true);
    if (!router.isReady || !router.query || !currentUser) return;

    getValues().then((res) => {
      setValues(res.values);
      setIsLoading(false);
      if (res.values.length == 0) {
        setIsOpenForm(true);
      }
    }).catch((err) => {
      toast.error('バリューの取得に失敗しました');
      setIsLoading(false);
    })
  }, [currentUser, router.isReady, router.query])

  return (
    <LayoutRegistration>
      <div className={styles.main}>
        <div className={styles.detailArea}>
          <div className={styles.detailTitle}>組織のバリュー</div>
          <div className={styles.detail}>
            { values.length == 0 ?
              <div className={styles.noValues}>
                <div className={styles.bold}>あなたの組織のバリューを登録しましょう</div>
                <div>{`最大${MAX_COUNT_VALUES}個まで登録できます`}</div>
              </div>
              :
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
                          <BsFillPencilFill size={18} />
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
          { isLoading ?
            <div className={styles.loadingWindow}>
              <div>
                <img src='/assets/animation_spinner.gif' />
              </div>
            </div>
            :
            isOpenForm ?
              <div className={styles.inputForm}>
                <div className={styles.inputAreaTitle}>
                  <div>{editValue.uid ? 'バリューを更新する' : '新しいバリューを追加する'}</div>
                  { values.length == 0 ?
                    ''
                    :
                    <div onClick={() => setIsOpenForm(false)}>
                      <IoCloseSharp size={32} />
                    </div>
                  }
                </div>
                <FormValue
                  value={editValue}
                  setValue={setEditValue}
                  setValues={setValues}
                  setIsOpenForm={setIsOpenForm}
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