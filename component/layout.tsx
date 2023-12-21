import Head from 'next/head';
import { useAuth } from '../util/authContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './layout.module.css';
import { IResGetMember, defaultIResGetMember } from '../interfaces/IGetMember';
import { getMember } from '../api/getMember';
import 'react-toastify/dist/ReactToastify.css';
import { useDisplaySize } from '../hooks/useDisplaySize';
import HeaderBar from './headerBar';
import MenuBar from './menuBar';

interface LayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

const Layout:React.FC<LayoutProps> = (props) => {
  const { currentUser, isUserReady } = useAuth();
  const router = useRouter();
  const [selectedIconName, setSelectedIconName] = useState<string>('dashboard');
  const [member, setMember] = useState<IResGetMember>(defaultIResGetMember);
  const [finishedGetMember, setFinishedGetMember] = useState<boolean>(false);
  const { isMobile } = useDisplaySize();

  useEffect(() => {
    // メニューの現在位置をLocalStorageから取得
    const selectedMenu = localStorage.getItem('selectedMenu');
    if (selectedMenu != null) {
      setSelectedIconName(selectedMenu);
    }

    // ユーザー情報をLocalStorageから取得
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser != null) {
      const obj: IResGetMember = JSON.parse(currentUser)
      setMember(obj);
    }
  }, [])

  useEffect(() => {
    if (!isUserReady || !currentUser) return;

    // ログインしている場合のみ、ユーザー情報を取得する
    getMember().then((res: IResGetMember) => {
      setMember(res);
      localStorage.setItem('currentUser', JSON.stringify(res));

      // 管理者でなければ、自身のダッシュボードしか見れない
      if (!res.is_admin && !(router.pathname == `/members/[uid]` && router.query.uid == res.uid)) {
        router.push(`/members/${res.uid}`);
      } else {
        setFinishedGetMember(true);
      }
    })
  }, [isUserReady, currentUser])

  return (
    <div>
      <Head>
        <title>Plug</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width, maximum-scale=1.0'
        />
        <meta
          name='description'
          content='' // TODO: Description追加
          />
      </Head>
      <main>
        <div className={styles.main}>
          { !isMobile &&
            <MenuBar
              selectedIconName={selectedIconName}
              setSelectedIconName={setSelectedIconName}
              isAdmin={member.is_admin}
              memberUid={member.uid}
            />
          }
          <div className={styles.contentArea}>
            <HeaderBar member={member} />
            <div className={styles.content}>
              {(props.isLoading || !finishedGetMember) ?
                <div className={styles.loadingWindow}>
                  <div>
                    <img src='/assets/animation_spinner.gif' />
                  </div>
                </div>
                :
                props.children
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Layout;