import { FC, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { HiOutlineTrash } from 'react-icons/hi';
import _ from 'lodash';

import styles from './formValue.module.css';
import { TextLength } from './textLength';
import { MAX_LENGTH_VALUE_DETAIL, MAX_LENGTH_VALUE_TITLE } from '../util/constant';
import { IValue, defaultIValue } from '../interfaces/IValue';
import { createValue } from '../api/values/createValue';
import { updateValue } from '../api/values/updateValue';
import { deleteValue } from '../api/values/deleteValue';
import { IReqDeleteValue } from '../interfaces/IDeleteValue';
import { IReqUpdateValue } from '../interfaces/IUpdateValue';
import { IReqCreateValue } from '../interfaces/ICreateValue';
import CustomModal from './customModal';
import ButtonDefault from './buttonDefault';

interface FormValueProps {
  value: IValue;
  setValue: React.Dispatch<SetStateAction<IValue>>;
  setValues: React.Dispatch<SetStateAction<IValue[]>>;
  setIsOpenForm: React.Dispatch<SetStateAction<boolean>>;
}

const FormValue: FC<FormValueProps> = (props) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const onSave = () => {
    if (props.value.title == '' || props.value.detail == '') {
      toast.error('タイトルと概要を入力してください');
      return;
    }

    if (props.value.uid == '') { // 新規作成の場合
      const body: IReqCreateValue = {
        title: props.value.title,
        detail: props.value.detail,
      }
      createValue(body).then((res) => {
        props.setValues(res.values);
        props.setValue(defaultIValue);
        props.setIsOpenForm(false);

      }).then((err) => {
        // エラーハンドリング
      })
    } else { // 更新の場合
      const body: IReqUpdateValue = {
        title: props.value.title,
        detail: props.value.detail,
      }
      updateValue(body).then((res) => {
        props.setValues(res.values);
        props.setValue(defaultIValue);
        props.setIsOpenForm(false);
      }).then((err) => {
        // エラーハンドリング
      })
    }
  }

  const onDelete = () => {
    const body: IReqDeleteValue = {
      uid: props.value.uid,
    }
    deleteValue(body).then((res) => {
      props.setValues(res.values);
      setIsOpenDeleteModal(false);
    }).then((err) => {
      // エラーハンドリング
    })
  }

  return (
    <div className={styles.form}>
      <div>
        <div className={styles.label}>
          <div>タイトル</div>
          <TextLength
            maxLength={MAX_LENGTH_VALUE_TITLE}
            text={props.value.title}
          />
        </div>
        <input
          placeholder='例）Be your self, Create new things'
          className={styles.titleInput}
          onChange={(e) => {
            const tmpEditValue = _.cloneDeep(props.value);
            tmpEditValue.title = e.target.value;
            props.setValue(tmpEditValue);
          }}
          value={props.value.title}
          maxLength={MAX_LENGTH_VALUE_TITLE}
        />
      </div>
      <div>
        <div className={styles.label}>
          <div>概要</div>
          <TextLength maxLength={MAX_LENGTH_VALUE_DETAIL} text={props.value.detail} />
        </div>
        <textarea
          placeholder='例）立場や役職関係なく、お互いを尊重しつつも、自分らしく、好きなことを言い合える場所を作ろう。'
          className={styles.detailInput}
          onChange={(e) => {
            const tmpEditValue = _.cloneDeep(props.value);
            tmpEditValue.detail = e.target.value;
            props.setValue(tmpEditValue);
          }}
          value={props.value.detail}
          maxLength={MAX_LENGTH_VALUE_DETAIL}
          rows={10}
        />
      </div>
      <div className={styles.submitButtonArea}>
        <ButtonDefault onClick={onSave} text='保存する' />
      </div>
      { props.value.uid != '' &&
        <div className={styles.deleteButtonArea}>
          <div className={styles.deleteButton} onClick={() => setIsOpenDeleteModal(true)}>
            <HiOutlineTrash />
            <div>削除する</div>
          </div>
          <DeleteModal
            isOpen={isOpenDeleteModal}
            setIsOpen={setIsOpenDeleteModal}
            onDelete={onDelete}
          />
        </div>
      }
    </div>
  )
}

interface DeleteModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  onDelete: () => void;
}

export const DeleteModal: FC<DeleteModalProps> = (props) => {
  return (
    <CustomModal
      isOpen={props.isOpen}
      setIsOpen={props.setIsOpen}
      title='削除してよろしいですか？'
      closeable={true}
    >
      <div className={styles.deleteModalContent}>
        <div>
          新しく作成すると、アンケートの蓄積履歴が初期状態になります。
          <br />
          ※すでに回答いただいたアンケート結果は引き続き閲覧することができます
        </div>
        <ButtonDefault onClick={props.onDelete} text='削除する' />
      </div>
    </CustomModal>
  )
}
export default FormValue;