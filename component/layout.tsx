import Head from 'next/head';
import { useAuth } from "../util/authContext";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from './layout.module.css';
import { IReqGetMember, IResGetMember, defaultIResGetMember } from '../interfaces/IGetMember';
import { getMember } from '../api/getMember';
import { MdOutlineSpaceDashboard, MdPersonOutline, MdOutlineSettings } from "react-icons/md";
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

const Layout:React.FC<LayoutProps> = (props) => {
  const { currentUser, isUserReady } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(props.isLoading ? props.isLoading : false);
  const [selectedIconName, setSelectedIconName] = useState<string>("dashboard");
  const [member, setMember] = useState<IResGetMember>(defaultIResGetMember);

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
    if (isUserReady && currentUser) {
      // ログインしている場合のみ、ユーザー情報を取得する
      const paramGetUser: IReqGetMember = {
        firebase_uid: currentUser.uid, // firebaseUID
      }
      getMember(paramGetUser).then((res: IResGetMember) => {
        setMember(res);
        localStorage.setItem('currentUser', JSON.stringify(res));
      })
    }
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
          <MenuBar
            selectedIconName={selectedIconName}
            setSelectedIconName={setSelectedIconName}
          />
          <div className={styles.contentArea}>
            <HeaderBar member={member} />
            <div className={styles.content}>
              {isLoading ?
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

interface MenuBarProps {
  selectedIconName: string;
  setSelectedIconName: Dispatch<SetStateAction<string>>;
}

const MenuBar: React.FC<MenuBarProps> = (props) => {
  const router = useRouter();

  return (
    <div className={styles.menuBar}>
      <Link
        href="/dashboard"
        className={styles.menuButton + " " + (props.selectedIconName == "dashboard" ? styles.menuButtonSelected : "")}
        onClick={() => {
          localStorage.setItem('selectedMenu', "dashboard");
          props.setSelectedIconName("dashboard");
        }}
      >
        <MdOutlineSpaceDashboard
          size={30}
          color={props.selectedIconName == "dashboard" ? "#6FB9B4" : "white"}
        />
      </Link>
      <Link
        href="/members"
        className={styles.menuButton + " " + (props.selectedIconName == "member" ? styles.menuButtonSelected : "")}
        onClick={() => {
          localStorage.setItem('selectedMenu', "member");
          props.setSelectedIconName("member");
        }}
      >
        <MdPersonOutline
          size={30}
          color={props.selectedIconName == "member" ? "#6FB9B4" : "white"}
        />
      </Link>
      <Link
        href="/setting/mail"
        className={styles.menuButton + " " + (props.selectedIconName == "setting" ? styles.menuButtonSelected : "")}
        onClick={() => {
          localStorage.setItem('selectedMenu', "setting");
          props.setSelectedIconName("setting");
        }}
      >
        <MdOutlineSettings
          size={30}
          color={props.selectedIconName == "setting" ? "#6FB9B4" : "white"}
        />
      </Link>
    </div>
  )
}

interface HeaderBarProps {
  member: IResGetMember;
}

const HeaderBar: React.FC<HeaderBarProps> = (props) => {
  return (
    <div className={styles.headerBar}>
      <div className={styles.workspace}>
        <div><img src={props.member.workspace_icon_url ? props.member.workspace_icon_url : ""} /></div>
        <div>{props.member.workspace_name}</div>
      </div>
      <div className={styles.member}>
        <div><img src={props.member.icon_url} /></div>
        <div>{props.member.name}</div>
      </div>
    </div>
  )
}
export default Layout;