import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { MdOutlineSettings, MdOutlineSpaceDashboard, MdPersonOutline } from 'react-icons/md';
import styles from './menuBar.module.css';

interface MenuBarProps {
  selectedIconName: string;
  setSelectedIconName: Dispatch<SetStateAction<string>>;
  isAdmin: boolean;
  memberUid: string;
}

const MenuBar: React.FC<MenuBarProps> = (props) => {
  const router = useRouter();

  return (
    <div className={styles.main}>
      { props.isAdmin &&
        <Link
          href='/dashboard'
          className={styles.menuButton + ' ' + (props.selectedIconName == 'dashboard' ? styles.menuButtonSelected : '')}
          onClick={() => {
            localStorage.setItem('selectedMenu', 'dashboard');
            props.setSelectedIconName('dashboard');
          }}
        >
          <MdOutlineSpaceDashboard
            size={30}
            color={props.selectedIconName == 'dashboard' ? '#6FB9B4' : 'white'}
          />
        </Link>
      }
      <Link
        href={props.isAdmin ? '/members' : `/members/${props.memberUid}`}
        className={styles.menuButton + ' ' + (props.selectedIconName == 'member' ? styles.menuButtonSelected : '')}
        onClick={() => {
          localStorage.setItem('selectedMenu', 'member');
          props.setSelectedIconName('member');
        }}
      >
        <MdPersonOutline
          size={30}
          color={props.selectedIconName == 'member' ? '#6FB9B4' : 'white'}
        />
      </Link>
      { props.isAdmin &&
        <Link
          href='/setting/workspace'
          className={styles.menuButton + ' ' + (props.selectedIconName == 'setting' ? styles.menuButtonSelected : '')}
          onClick={() => {
            localStorage.setItem('selectedMenu', 'setting');
            props.setSelectedIconName('setting');
          }}
        >
          <MdOutlineSettings
            size={30}
            color={props.selectedIconName == 'setting' ? '#6FB9B4' : 'white'}
          />
        </Link>
      }
    </div>
  )
}

export default MenuBar;