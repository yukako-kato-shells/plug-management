import { useEffect, useState } from 'react';
import styles from './layoutSetting.module.css';
import Link from 'next/link';

interface LayoutSettingProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

const LayoutSetting: React.FC<LayoutSettingProps> = (props) => {
  const [selectedMenuName, setSelectedMenuName] = useState<string>("value");

  useEffect(() => {
    // メニューの現在位置をLocalStorageから取得
    const selectedMenu = localStorage.getItem('selectedSettingMenu');
    if (selectedMenu != null) {
      setSelectedMenuName(selectedMenu);
    }
  }, [])

  const onClick = (labelName: string) => {
    setSelectedMenuName(labelName)
    localStorage.setItem('selectedSettingMenu', labelName)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>設定</div>
      <div className={styles.contentsArea}>
        <div className={styles.menu}>
          <Link
            href="/setting/account"
            className={styles.menuLabel + " " + (selectedMenuName == "account" ? styles.menuLabelSelected : "")}
            onClick={() => onClick("account")}
          >
            アカウント管理
          </Link>
          <Link
            href="/setting/value"
            className={styles.menuLabel + " " + (selectedMenuName == "value" ? styles.menuLabelSelected : "")}
            onClick={() => onClick("value")}
          >
            バリュー管理
          </Link>
          <Link
            href="/setting/plan"
            className={styles.menuLabel + " " + (selectedMenuName == "plan" ? styles.menuLabelSelected : "")}
            onClick={() => onClick("plan")}
          >
            契約内容・プラン変更
          </Link>
        </div>
        <div className={styles.children}>
          <div className={styles.title}>{props.title}</div>
          <div className={styles.contents}>
            { props.isLoading ?
              <div className={styles.loading}><img src="/assets/animation_spinner.gif" width={100} height={100} /></div>
              :
              props.children
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutSetting;