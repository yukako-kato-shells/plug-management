import { useEffect, useState } from "react";
import Layout from "../../component/layout";
import styles from './index.module.css';
import { useAuth } from "../../util/authContext";
import { useRouter } from "next/router";
import { getWorkspaceMembers } from "../../api/getMembers";
import { IGetWorkspaceMembersMember } from "../../interfaces/IGetWorkspaceMembers";
import Link from "next/link";

const Members: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [members, setMembers] = useState<IGetWorkspaceMembersMember[]>([]);

  useEffect(() => {
    if (router.isReady && router.query) {
      //if (currentUser) {
        getWorkspaceMembers().then((res) => {
          setMembers(res.members);
        })
      //}
    }
  }, [])

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.title}>メンバー一覧</div>
        <div className={styles.list}>
          { members.map((member, index) => {
              return (
                <Link key={index} href={`/members/${member.uid}`}>
                  <div className={styles.card}>
                    <img src={member.icon_url} className={styles.icon} />
                    <div>{member.name}</div>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    </Layout>
  )
}

export default Members;