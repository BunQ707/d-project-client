import { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { useEffect } from 'react';
import * as api from 'services';
import { useAlert } from 'hooks';
import { LoginDto } from 'services/auth.dto';
import { checkIsInvalidToken } from 'utils/helper';

interface Props {
  children: ReactNode;
}

interface AuthState {
  isAuthenticated: boolean;
  isPending: boolean;
  uid: string;
  setAuthenticated: (newState: boolean) => void;
  handleLoginUid: (data: LoginDto) => Promise<boolean>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  isPending: false,
  uid: '',
  setAuthenticated: () => {},
  handleLoginUid: async () => false,
  handleLogout: () => {},
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [uid, setUID] = useState<string>('');

  const { alertError } = useAlert();

  const handleLoginUid = useCallback(
    async (dto: LoginDto) => {
      try {
        if (!localStorage) throw new Error('localStorage null/undefined');

        const res = await api.login(dto);

        if (res?.data?.accessToken) {
          localStorage.setItem('access-token', res?.data?.accessToken);
          setAuthenticated(true);
          return true;
        } else throw new Error('response invalid');
      } catch (error) {
        console.error(error);
        alertError('Somethings wrong, could not login!');
        setAuthenticated(false);
        return false;
      }
    },
    [localStorage],
  );

  const handleLogout = useCallback(async () => {
    if (!localStorage) return;
    localStorage.removeItem('access-token');
    setAuthenticated(false);
  }, [localStorage]);

  useEffect(() => {
    try {
      if (!localStorage) return;
      const accessToken = localStorage.getItem('access-token');
      if (accessToken && !checkIsInvalidToken(accessToken)) {
        setAuthenticated(true);
      } else {
        localStorage.removeItem('access-token');
        setAuthenticated(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [localStorage]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isPending,
        uid,
        setAuthenticated,
        handleLoginUid,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
