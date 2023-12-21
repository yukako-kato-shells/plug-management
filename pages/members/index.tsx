import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';

import styles from './index.module.css';
import Layout from '../../component/layout';
import IconWrapper from '../../component/iconWrapper';
import { useAuth } from '../../util/authContext';
import { getWorkspaceMembers } from '../../api/getMembers';
import { IGetWorkspaceMembersMember } from '../../interfaces/IGetWorkspaceMembers';

const Members: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [members, setMembers] = useState<IGetWorkspaceMembersMember[]>([]);

  useEffect(() => {
    if (!router.isReady || !router.query || !currentUser) return;

    getWorkspaceMembers().then((res) => {
      setMembers(res.members);
    }).catch((err) => {
      toast.error('メンバーの取得に失敗しました');
    })
  }, [currentUser, router.isReady, router.query])

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.title}>メンバー一覧</div>
        <div className={styles.list}>
          { members.map((member, index) => {
              return (
                <Link key={index} href={`/members/${member.uid}`}>
                  <div className={styles.card}>
                    <IconWrapper icon_url={member.icon_url} size={55} />
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