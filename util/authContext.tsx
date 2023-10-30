import { getRedirectResult, onAuthStateChanged, signInWithCustomToken, signOut, User } from 'firebase/auth';
import router, { useRouter } from 'next/router';
import { createContext, useEffect, useState, useContext } from 'react';
import auth from './firebase';
import { ErrorResponse } from './axiosWithAuth';

type FirebaseUserType = User | null;

type AuthContextType = {
  currentUser: FirebaseUserType;
  isUserReady: boolean;
};

type AuthProps = {
  children?: JSX.Element
}

const AuthContext = createContext<Partial<AuthContextType>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: AuthProps) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUserType>(null);
  const [isUserReady, setIsUserReady] = useState<boolean>(false);
  const { locale } = useRouter();
  const router = useRouter();

  const value: AuthContextType = {
    currentUser,
    isUserReady,
  };

  useEffect(() => {
    if (isUserReady && router.query) {
      if (!currentUser) {
        signInWithCustomToken(auth, String(router.query.t)).then((result) => {
        }).catch((error) => {
          console.log("エラーが発生しました");
          console.log(error)
          // NotificationManager.error("エラーが発生しました");
        })
      }
    }

    // Firebase認証状態ををsubscribe(SignIn, SignOutで認証状態が変更されると呼び出される)
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsUserReady(true);
    });
  }, [currentUser, router.isReady, router.query]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;