import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import styles from './index.module.css';
import { useAuth } from '../../../util/authContext';
import {
  IResGetWOrkspaceSettingChannel,
  IResGetWorkspaceSetting,
  defaultIResGetWorkspaceSetting,
  defaultIResGetWorkspaceSettingChannel,
 } from '../../../interfaces/IGetWorkspaceSetting';
import { getWorkspaceSetting } from '../../../api/getWorkspaceSetting';
import LayoutRegistration from '../../../component/layoutRegistration';
import { IReqUpdateNoticeChannel } from '../../../interfaces/IUpdateNoticeChannel';
import { updateNoticeChannel } from '../../../api/updateNoticeChannel';
import ButtonDefault from '../../../component/buttonDefault';
import CheckBox from '../../../component/checkbox';

const SelectChannel: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IResGetWorkspaceSetting>(defaultIResGetWorkspaceSetting);
  const [selectedChannelUID, setSelectedChannelUID] = useState<string>("");
  const [checkedShare, setCheckedShare] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    if (!router.isReady || !router.query || !currentUser) return;

    getWorkspaceSetting().then((res) => {
      setData(res);
      setIsLoading(false);
    }).catch((err) => {
      toast.error('ワークスペース設定の取得に失敗しました');
    })
  }, [currentUser, router.isReady, router.query])

  const onSubmit = () => {
    const body: IReqUpdateNoticeChannel = {
      channel_uid: selectedChannelUID,
    }
    updateNoticeChannel(body).then((res) => {
      if (res.result) {
        router.push('/dashboard');
        toast.info('通知チャンネルの設定が完了しました');
      }
    }).catch((err) => {
      toast.error('通知チャンネルの設定に失敗しました');
    })
  }

  return (
    <LayoutRegistration>
      <div className={styles.main}>
        <div className={styles.title}>
          Plugと連携するチャンネルを設定しましょう
        </div>

        <div>
          <div className={styles.notes}>
            <div>このチャンネルのメンバーが、plugの利用対象者になります</div>
            <div>plugを利用したいメンバーが全員入っているチャンネルを選択するか、<br />新しくチャンネルを作成してください</div>
          </div>

          <div className={styles.displayNoticeChannel}>
            { isLoading ?
              <img src='/assets/animation_spinner.gif' width={36} height={36} />
            :
              <select
                className={styles.selectNoticeChannel}
                value={selectedChannelUID}
                onChange={e => setSelectedChannelUID(e.target.value)}
              >
                <option value="">チャンネルを選択する</option>
                { data.channels
                  .filter(c => c.is_public)
                  .map((channel: IResGetWOrkspaceSettingChannel, index: number) => {
                    return (
                      <option
                        key={index}
                        value={channel.slack_uid}
                        disabled={!channel.is_public}
                      >
                        #{channel.name}
                      </option>
                    )
                  })
                }
              </select>
            }
          </div>
        </div>
        <div>
          <div className={styles.notes}>
            <div>連携したチャンネルに、メンバーからのValueを体現した行動の報告をシェアします</div>
            <div>シェアしたくない場合は、OFFに設定してください</div>
          </div>
          <CheckBox
            checked={checkedShare}
            label="連携したチャンネルにアクションをシェアする"
            handleChange={() => setCheckedShare(!checkedShare)}
          />
        </div>
        <ButtonDefault
          onClick={() => onSubmit()}
          text='設定を完了する'
          disabled={selectedChannelUID == ''}
        />
      </div>
    </LayoutRegistration>
  )
}

export default SelectChannel;
