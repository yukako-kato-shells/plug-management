import { useEffect, useState } from 'react';
import Layout from '../../../component/layout'
import LayoutSetting from '../../../component/layoutSetting'
import { getWorkspaceSetting } from '../../../api/getWorkspaceSetting';
import styles from './index.module.css';
import { toast } from 'react-toastify';
import { updateBeginningMonthOfTerm } from '../../../api/updateBeginningMonthOfTerm';
import { IReqUpdateBeginningMonthOfTerm } from '../../../interfaces/IUpdateBeginningMonthOfTerm';
import { RxCross1 } from 'react-icons/rx';
import { BsFillPencilFill } from 'react-icons/bs';
import { IResGetWOrkspaceSettingChannel, defaultIResGetWorkspaceSetting, defaultIResGetWorkspaceSettingChannel } from '../../../interfaces/IGetWorkspaceSetting';
import { IResGetWorkspaceSetting } from '../../../interfaces/IGetWorkspaceSetting';
import { IReqUpdateNoticeChannel } from '../../../interfaces/IUpdateNoticeChannel';
import { updateNoticeChannel } from '../../../api/updateNoticeChannel';
import EditButton from '../../../component/setting/customButton';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useAuth } from '../../../util/authContext';

const SettingWorkspace: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] =useState<IResGetWorkspaceSetting>(defaultIResGetWorkspaceSetting);
  const [beginningMonthOfTerm, setBeginningMonthOfTerm] = useState<number>(1);
  const [isEditingBeginningMonth, setIsEditingBeginningMonth] = useState<boolean>(false);
  const [noticeChannel, setNoticeChannel] = useState<IResGetWOrkspaceSettingChannel>(defaultIResGetWorkspaceSettingChannel);
  const [isEditingNoticeChannel, setIsEditingNoticeChannel] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    if (!router.isReady || !router.query || !currentUser) return;

    getWorkspaceSetting().then((res) => {
      setData(res);
      setBeginningMonthOfTerm(res.beginning_month_of_term);
      setNoticeChannel(res.channels.filter(c => c.selected)[0]);
      setIsLoading(false);
    }).catch((err) => {
      toast.error('ワークスペース設定の取得に失敗しました');
    })
  }, [currentUser, router.isReady, router.query])

  const onUpdateNoticeChannel = (slackUID: string) => {
    const body: IReqUpdateNoticeChannel = {
      channel_uid: slackUID,
    }
    updateNoticeChannel(body).then((res) => {
      if (res.result) {
        toast.info('通知チャンネルの変更が完了しました');
        setIsEditingNoticeChannel(false);
        getWorkspaceSetting().then((r) => {
          setData(r);
          setBeginningMonthOfTerm(r.beginning_month_of_term);
          setNoticeChannel(r.channels.filter(c => c.selected)[0]);
        }).catch((err) => {
          toast.error('ワークスペース設定の取得に失敗しました');
        })
      }
    }).catch((err) => {
      toast.error('通知チャンネルの変更に失敗しました');
    })
  }

  const onUpdateBeginningMonthOfTerm = (month: number) => {
    const body: IReqUpdateBeginningMonthOfTerm = {
      beginning_month_of_term: month,
    }
    updateBeginningMonthOfTerm(body).then((res) => {
      if (res.result) {
        setBeginningMonthOfTerm(month);
        setIsEditingBeginningMonth(false);
        toast.error('期初月の変更が完了しました');
      }
    }).catch((err) => {
      toast.error('期初月の変更に失敗しました');
    })
  }

  return (
    <Layout>
      <LayoutSetting
        title='ワークスペース管理'
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      >
        <div className={styles.main}>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              <div>通知チャンネル設定</div>
              { !isEditingNoticeChannel &&
                <EditButton
                  iconType={BsFillPencilFill}
                  title={'編集する'}
                  onClick={() => {
                    setIsEditingNoticeChannel(true)
                    setIsEditingBeginningMonth(false)
                  }}
                />
              }
            </div>

            <div className={styles.contentDetailNoticeChannel}>
              <div>現在の通知チャンネル：</div>
              { isEditingNoticeChannel ?
                <div className={styles.displayNoticeChannel}>
                  <select
                    className={styles.selectNoticeChannel +  ' ' + styles.displayNoticeChannelName}
                    value={data.channels.filter(c => c.selected)[0].slack_uid}
                    onChange={(e) => onUpdateNoticeChannel(e.target.value)}
                  >
                    { data.channels.filter(c => c.is_public).map((channel: IResGetWOrkspaceSettingChannel, index: number) => {
                          return (
                            <option value={channel.slack_uid} key={index} disabled={!channel.is_public}>
                              {channel.name}
                            </option>
                          )
                        })
                    }
                  </select>
                  <div
                    className={styles.closeButton}
                    onClick={() => setIsEditingNoticeChannel(false)}
                  >
                    <RxCross1 />
                  </div>
                </div>
                :
                <div className={styles.displayNoticeChannel}>
                  <div className={styles.displayNoticeChannelName}>{noticeChannel.name}</div>
                </div>

              }
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              <div>期初月設定</div>
              { !isEditingBeginningMonth &&
                <EditButton
                  iconType={BsFillPencilFill}
                  title={'編集する'}
                  onClick={() => {
                    setIsEditingBeginningMonth(true)
                    setIsEditingNoticeChannel(false)
                  }}
                />
              }
            </div>
            <div className={styles.contentDetailBeginningMonth}>
              <div>現在の期初月：</div>
              { isEditingBeginningMonth ?
                <>
                  <select
                    className={styles.selectBeginingMonthOfTerm}
                    value={beginningMonthOfTerm}
                    onChange={(e) => onUpdateBeginningMonthOfTerm(Number(e.target.value))}
                  >
                    { Array
                        .from({ length: 12 }, (_, index) => index + 1)
                        .map((month: number, index: number) => {
                          return (
                            <option value={month} key={index}>
                              {month}月
                            </option>
                          )
                        })
                    }
                  </select>
                  <div
                    className={styles.closeButton}
                    onClick={() => setIsEditingBeginningMonth(false)}
                  >
                    <RxCross1 />
                  </div>
                </>
                :
                <div style={{fontSize: '19px', fontWeight: 'bold', width: '100px'}}>{beginningMonthOfTerm}月</div>
              }
            </div>
            <div className={styles.memo}>
                期初月を設定するメリット ... デフォルトのデータ表示が期単位となり、集計や評価の際に活用しやすくなります
              </div>
          </div>
        </div>
      </LayoutSetting>
    </Layout>
  )
}

export default SettingWorkspace;