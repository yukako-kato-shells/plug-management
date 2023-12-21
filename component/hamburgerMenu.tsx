import { useContext } from 'react';
import styles from './hamburgerMenu.module.css';
import { MenuContext } from '../util/menuContext';


export const HamburgerMenu: React.FC = (props) => {
  const { isOpen, setIsOpen } = useContext(MenuContext);

  const toggleMenu = () => {
    return setIsOpen(!isOpen)
  }
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.inner}>
          <ul>
            <li><a href='#'>Text</a></li>
            <li><a href='#'>Text</a></li>
            <li><a href='#'>Text</a></li>
          </ul>
        </div>
      </nav>
      <div className={styles.container}>
        <div
          className={
            styles.hamburgerMenu
            + ' '
            + (isOpen ? styles.hamburgerMenuActive : '')
          }
          onClick={toggleMenu}>
          <div className={styles.hamburgerMenuLine + ' ' + styles.lineTop}></div>
          <div className={styles.hamburgerMenuLine + ' ' + styles.lineMiddle}></div>
          <div className={styles.hamburgerMenuLine + ' ' + styles.lineBottom}></div>
        </div>
      </div>
    </>
  )
};

export default HamburgerMenu;
