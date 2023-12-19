import { useRouter } from 'next/router';
import { IResGetMember } from '../interfaces/IGetMember';
import styles from './headerBar.module.css';
import { signOut } from 'firebase/auth';
import auth from "../util/firebase";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconWrapper from './iconWrapper';
import { useDisplaySize } from '../hooks/useDisplaySize';
import HamburgerMenu from './hamburgerMenu';

interface HeaderBarProps {
  member: IResGetMember;
}

const HeaderBar: React.FC<HeaderBarProps> = (props) => {
  const router = useRouter();
  const { isMobile } = useDisplaySize();
 
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
      { isMobile ?
        <img src={"/assets/logo-dummy.svg"} width={80} height={30} />
        :
        <div className={styles.workspace}>
          <IconWrapper icon_url={props.member.workspace_icon_url} size={40} />
          <div>{props.member.workspace_name}</div>
        </div>
      }
      { isMobile ?
        <div className={styles.menuArea}>
          <IconWrapper icon_url={props.member.icon_url} size={36} />
          <HamburgerMenu />
        </div>
        :
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
      }
    </div>
  )
}

export default HeaderBar;