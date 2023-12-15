import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { BsFillPencilFill } from "react-icons/bs";

import Layout from "../../../component/layout";
import LayoutSetting from "../../../component/layoutSetting";
import { getMembersForSetting } from "../../../api/getMembersForSetting";
import { useAuth } from "../../../util/authContext";
import CustomButton from "../../../component/setting/customButton";
import IconWrapper from "../../../component/iconWrapper";
import { IResGetMemberForSetting } from "../../../interfaces/IGetAdminMembers";
import styles from './index.module.css';
import { update } from "lodash";
import { updateMemberAdmin } from "../../../api/updateMemberAdmin";
import { IReqUpdateMemberAdmin } from "../../../interfaces/IUpdateMemberAdmin";

const AdminUser: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [members, setMembers] = useState<IResGetMemberForSetting[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    //if (!router.isReady || !router.query || !currentUser) return;
    getMembersForSetting().then((res) => {
      setMembers(res.members);
    }).catch(() => {
      toast.error("メンバー情報の取得に失敗しました");
    })
  }, [currentUser, router.isReady, router.query])

  const onChangeAdmin = (uid: string, admin: boolean) => {
    const body: IReqUpdateMemberAdmin = {
      member_uid: uid,
      is_admin: !admin,
    }
    updateMemberAdmin(body).then((res) => {
      setMembers(res.members);
      toast.info("管理者権限の更新が完了しました");
    }).catch(() => {
      toast.error("管理者権限の更新に失敗しました");
    })
  }

  return (
    <Layout>
      <LayoutSetting
        title="メンバー管理"
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      >
        <div className={styles.note}>
          <div>※ 管理者は、設定項目の閲覧・変更を行うことができます。必ず一人以上設定してください。</div>
          <div>※ 管理者追加操作で追加したい管理者が表示されない場合は、Plugに設定しているPublicチャンネルにユーザーが存在していることをご確認ください。</div>
        </div>
        <div className={styles.memberListArea}>
          <div className={styles.title}>
            <div>メンバー一覧</div>
          </div>
          <div className={styles.memberList}>
            {members.map((member, index) => {
              return (
                <>
                  { index != 0 && <div className={styles.border}></div>}
                  <div key={index} className={styles.adminMember}>
                    <div>
                      <IconWrapper icon_url={member.icon_url} size={40} />
                      <div className={styles.nameArea}>{member.name}</div>
                      <div className={styles.activeArea} style={{color: (member.is_active ? "inherit" : "var(--color-memo)")}}>
                        {member.is_active ? "アクティブ" : "非アクティブ"}
                      </div>
                      <div className={styles.admin}>
                        { member.is_me ?
                          "あなた"
                          :
                          <div className={member.is_admin ? styles.adminButtonON : styles.adminButtonOFF} onClick={() => onChangeAdmin(member.uid, member.is_admin)}>管理者</div>
                        }
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </LayoutSetting>
    </Layout>
  )
}

export default AdminUser;