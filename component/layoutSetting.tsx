import { useEffect, useState } from 'react';
import styles from './layoutSetting.module.css';
import Link from 'next/link';

interface LayoutSettingProps {
  title: string;
  children: React.ReactNode;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
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
    setSelectedMenuName(labelName);
    localStorage.setItem('selectedSettingMenu', labelName);
    props.setIsLoading && props.setIsLoading(true);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>設定</div>
      <div className={styles.contentsArea}>
        <div className={styles.menu}>
          <Link
            href="/setting/workspace"
            className={styles.menuLabel + " " + (selectedMenuName == "workspace" ? styles.menuLabelSelected : "")}
            onClick={() => onClick("workspace")}
          >
            ワークスペース管理
          </Link>
          <Link
            href="/setting/mail"
            className={styles.menuLabel + " " + (selectedMenuName == "mail" ? styles.menuLabelSelected : "")}
            onClick={() => onClick("mail")}
          >
            メールアドレス管理
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
          { !props.isLoading &&
            <div className={styles.title}>{props.title}</div>
          }
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