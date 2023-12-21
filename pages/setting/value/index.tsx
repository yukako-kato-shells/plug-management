import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { BsFillPencilFill } from 'react-icons/bs';
import { HiOutlineTrash } from 'react-icons/hi';
import _ from 'lodash';

import styles from './index.module.css';
import { useAuth } from '../../../util/authContext';
import {
  MAX_LENGTH_VALUE_DETAIL,
  MAX_LENGTH_VALUE_TITLE,
 } from '../../../util/constant';
import { getValues } from '../../../api/values/getValues';
import { deleteValue } from '../../../api/values/deleteValue';
import { updateValue } from '../../../api/values/updateValue';
import { IResGetValues, defaultIResGetValues } from '../../../interfaces/IGetValues';
import { IValue, defaultIValue } from '../../../interfaces/IValue';
import Layout from '../../../component/layout'
import { CustomButton } from '../../../component/setting/customButton';
import ButtonDefault from '../../../component/buttonDefault';
import LayoutSetting from '../../../component/layoutSetting';

const Values: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IResGetValues>(defaultIResGetValues);
  const [editingValue, setEditingValue] = useState<IValue>(defaultIValue);

  useEffect(() => {
    setIsLoading(true);
    if (!router.isReady || !router.query || !currentUser) return;

    getValues().then((res) => {
      setData(res);
      setIsLoading(false);

    }).catch((err) => {
      toast.error('バリューの取得に失敗しました');
    })
  }, [currentUser, router.isReady, router.query])

  const onSave = () => {
    const body = {
      uid: editingValue.uid,
      title: editingValue.title,
      detail: editingValue.detail,
    }
    updateValue(body).then((res) => {
      let cloneData = _.cloneDeep(data);
      cloneData.values = res.values;
      setData(cloneData);

      setEditingValue(defaultIValue);
      toast.info('バリューの更新が完了しました');
    }).catch((err) => {
      toast.info('バリューの更新に失敗しました');
    })
  }

  const onDelete = () => {
    const result = window.confirm('このバリューを削除してもよろしいですか？この操作は取り消せません。');

    if (result) {
      const body = {
        uid: editingValue.uid,
      }
      deleteValue(body).then((res) => {
        let cloneData = _.cloneDeep(data);
        cloneData.values = res.values;
        setData(cloneData)
        toast.info('バリューの削除が完了しました');
      }).catch((err) => {
        toast.error('バリューの削除に失敗しました');
      })
    }
  }

  return (
    <Layout>
      <LayoutSetting
        title='バリュー管理'
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      >
        <div>
          <div className={styles.title}>
            <div>{data.workspace_name}の組織のバリュー</div>
          </div>
          <div className={styles.values}>
            {data.values.map((value, index) => {
              return (
                <div
                  key={index}
                  className={styles.value}
                >
                  { editingValue.uid == value.uid ?
                    <>
                      <input
                        value={editingValue.title}
                        className={styles.inputTitle}
                        onChange={(e) => {
                          let tmpValue = _.cloneDeep(editingValue);
                          tmpValue.title = e.target.value;
                          setEditingValue(tmpValue);
                        }}
                        maxLength={MAX_LENGTH_VALUE_TITLE}
                        placeholder='バリューを入力してください'
                      />
                      <textarea
                        value={editingValue.detail}
                        className={styles.inputDetail}
                        rows={5}
                        onChange={(e) => {
                          let tmpValue = _.cloneDeep(editingValue);
                          tmpValue.detail = e.target.value;
                          setEditingValue(tmpValue);
                        }}
                        maxLength={MAX_LENGTH_VALUE_DETAIL}
                        placeholder='バリューの説明を入力してください'
                      />
                      <div className={styles.editArea}>
                        { value.uid != '' ?
                          <CustomButton
                            iconType={HiOutlineTrash}
                            title={'削除する'}
                            onClick={() => onDelete}
                          />
                          :
                          <div></div>
                        }
                        <div className={styles.editAreaSave}>
                          <CustomButton
                            title={'閉じる'}
                            onClick={() => {
                              setEditingValue(defaultIValue);
                              let tmpData = _.cloneDeep(data);
                              tmpData.values = tmpData.values.filter(v => v.uid != '');
                              setData(tmpData);
                            }}
                          />
                          <div
                            className={styles.saveButton}
                            onClick={() => onSave()}
                          >
                            保存する
                          </div>
                        </div>
                      </div>
                    </>
                    :
                    <>
                      <div className={styles.valueTitle}>
                        <div>ー　{value.title}</div>
                        <CustomButton
                          iconType={BsFillPencilFill}
                          title={'編集する'}
                          onClick={() => setEditingValue(value)}
                        />
                      </div>
                      <div className={styles.valueDetail}>{value.detail}</div>
                    </>
                  }
                </div>
              )
            })}
          </div>
          <div className={styles.newButtonArea}>
            <ButtonDefault
              onClick={() => {
                let tmpData = _.cloneDeep(data);
                tmpData.values = tmpData.values.concat(defaultIValue);
                setData(tmpData);
                setEditingValue(defaultIValue);
              }}
              text='新規作成する'
            />
          </div>
        </div>
      </LayoutSetting>
    </Layout>
  )
}

export default Values;