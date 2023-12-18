import Head from 'next/head';
import { useAuth } from "../util/authContext";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from './layout.module.css';
import { IResGetMember, defaultIResGetMember } from '../interfaces/IGetMember';
import { getMember } from '../api/getMember';
import { MdOutlineSpaceDashboard, MdPersonOutline, MdOutlineSettings } from "react-icons/md";
import Link from 'next/link';
import IconWrapper from './iconWrapper';
import { signOut } from "firebase/auth";
import auth from "../util/firebase";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

const Layout:React.FC<LayoutProps> = (props) => {
  const { currentUser, isUserReady } = useAuth();
  const router = useRouter();
  const [selectedIconName, setSelectedIconName] = useState<string>("dashboard");
  const [member, setMember] = useState<IResGetMember>(defaultIResGetMember);
  const [finishedGetMember, setFinishedGetMember] = useState<boolean>(false);

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
    //if (isUserReady && currentUser) return;

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
          <MenuBar
            selectedIconName={selectedIconName}
            setSelectedIconName={setSelectedIconName}
            isAdmin={member.is_admin}
            memberUid={member.uid}
          />
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

interface MenuBarProps {
  selectedIconName: string;
  setSelectedIconName: Dispatch<SetStateAction<string>>;
  isAdmin: boolean;
  memberUid: string;
}

const MenuBar: React.FC<MenuBarProps> = (props) => {
  const router = useRouter();

  return (
    <div className={styles.menuBar}>
      { props.isAdmin &&
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
      }
      <Link
        href={props.isAdmin ? "/members" : `/members/${props.memberUid}`}
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
      { props.isAdmin &&
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
      }
    </div>
  )
}

interface HeaderBarProps {
  member: IResGetMember;
}

const HeaderBar: React.FC<HeaderBarProps> = (props) => {
  const router = useRouter();

  const logout = () => {
    const result = window.confirm("ログアウトします。よろしいですか？")
    if (result) {
      signOut(auth)
        .then(() => {
          // ログアウト成功
          router.replace('/');
          toast.info("ログアウトしました");
        })
        .catch((error) => {
          // ログアウト失敗
          toast.error("ログアウトに失敗しました");
        })
    }
  }

  return (
    <div className={styles.headerBar}>
      <div className={styles.workspace}>
        <IconWrapper icon_url={props.member.workspace_icon_url} size={40} />
        <div>{props.member.workspace_name}</div>
      </div>
      <div className={styles.member}>
        <div
          className={styles.logoutButton}
          onClick={() => logout()}
        >
          ログアウト
        </div>
        <IconWrapper icon_url={props.member.icon_url} size={40} />
        <div>{props.member.name}</div>
      </div>
    </div>
  )
}
export default Layout;