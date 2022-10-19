import { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { useEffect } from 'react';
import { loginA8 } from 'services';
import { useAlert } from 'hooks';
import { envConfig } from '../config/env.config';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';

interface Props {
  children: ReactNode;
}

interface AuthState {
  isAuthenticated: boolean;
  isPending: boolean;
  uid: string;
  setAuthenticated: (newState: boolean) => void;
  handleLoginUid: () => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  isPending: false,
  uid: '',
  setAuthenticated: () => {},
  handleLoginUid: () => {},
  handleLogout: () => {},
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoginWithA8, setIsLoginWithA8] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isSessionPending, setIsSessionPending] = useState(false);

  const [walletAddress, setWalletAddress] = useState<string>('');
  const [uid, setUID] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [connected, setConnected] = useState<boolean>(false);

  const [session, setSession] = useState<any | null>(null);
  const [sdk, setSdk] = useState<any>(null);

  const { query } = useRouter();
  const { alertError } = useAlert();

  // const addNewWallet = !!query.add_wallet;

  // if (!supportedChainTypes.includes(chainType)) {
  //   return <h1>Un-supported chain type</h1>;
  // }

  // const loginBE = useCallback(
  //   async (newWalletAddress?: string) => {
  //     const tokenA8 = localStorage.getItem(A8_JWT_NAME);
  //     if (tokenA8) {
  //       try {
  //         setIsPending(true);
  //         // if (newWalletAddress) setIsLoginWithA8(false);
  //         const res = await loginA8(tokenA8, newWalletAddress);
  //         Cookies.set('accessToken', res.data.accessToken);
  //         setIsLoginWithA8(true);
  //       } catch (error) {
  //         alertError('Some thing went wrong, please try again.');
  //         setIsLoginWithA8(false);
  //       } finally {
  //         setIsPending(false);
  //       }
  //     } else {
  //       setIsLoginWithA8(false);
  //       setIsPending(false);
  //     }
  //   },
  //   [localStorage, Cookies],
  // );

  // const handleUIDInit = useCallback(async () => {
  //   if (!sdk) return;

  //   const RPCWalletAdapter = (await import('@ancient8/connect/adapter')).default;

  //   const updateSession = async () => {
  //     const a8Connect = sdk.getA8ConnectInstance();
  //     setSession(a8Connect.currentSession);
  //   };

  //   await sdk.init({
  //     chainType: chainType,
  //     cleanWalletCache: false,
  //     networkType: sdk.Types.Providers.NetworkType.testnet,
  //     forceConnectWallet: true,
  //     onAuth: updateSession,
  //     onLoggedOut: updateSession,
  //     onDisconnected: updateSession,
  //     onConnected: async (payload: any) => {
  //       const a8Connect = sdk.getA8ConnectInstance();
  //       setSession(a8Connect.currentSession);

  //       const accessToken = Cookies.get('accessToken');

  //       if (accessToken) {
  //         try {
  //           const tokenDecoded: { walletAddress: string } = jwt_decode(accessToken);
  //           jwt_decode(accessToken, { header: true });

  //           if (
  //             tokenDecoded?.walletAddress &&
  //             a8Connect.currentSession.connectedWallet?.walletAddress &&
  //             tokenDecoded.walletAddress !== a8Connect.currentSession.connectedWallet.walletAddress
  //           ) {
  //             await loginBE(a8Connect.currentSession.connectedWallet.walletAddress);
  //           }
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       }

  //       try {
  //         if (payload?.chainType === sdk.Types.Adapters.ChainType.SOL) {
  //           window.rpcProvider = await RPCWalletAdapter.getSolanaWalletAdapter(payload?.walletName);
  //         } else if (payload?.chainType === sdk.Types.Adapters.ChainType.EVM) {
  //           window.rpcProvider = await RPCWalletAdapter.getEVMWalletAdapter(
  //             payload?.walletName,
  //             payload?.provider?.injectedProvider,
  //           );
  //         } else {
  //           window.rpcProvider = null;
  //           throw new Error('Could not find a matching chain type');
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     },
  //   });

  //   const a8Connect = sdk.getA8ConnectInstance();
  //   await a8Connect.fetchSession(true);
  //   setSession(a8Connect.currentSession);
  // }, [sdk, loginBE]);

  const handleLoginUid = useCallback(async () => {
    // if (!sdk) return;
    // handleUIDInit().then(() => {
    //   sdk.openModal();
    // });
  }, []);

  const handleLogout = useCallback(async () => {
    //   if (!session?.Auth || !session?.Wallet) return;
    //   setIsPending(true);
    //   await session.Auth.logout();
    //   await session.Wallet.disconnectWallet();
    //   await handleUIDInit();
    //   Cookies.remove('accessToken');
    //   setIsPending(false);
  }, []);

  // const handleConnect = handleLoginUid;

  // const handleDisconnect = useCallback(async () => {
  //   if (!session?.Wallet || !sdk || !handleUIDInit) return;

  //   setIsPending(true);

  //   await session.Wallet.disconnectWallet();
  //   await handleUIDInit();

  //   setIsPending(false);
  // }, [handleUIDInit, session?.Wallet]);

  // // get latest session, i.e, latest uid profile
  // const syncSession = useCallback(
  //   async (isAuthStillPending?: boolean) => {
  //     if (!sdk) return;
  //     try {
  //       !isAuthStillPending && setIsPending(true);
  //       setIsSessionPending(true);

  //       const a8Connect = sdk.getA8ConnectInstance();
  //       await a8Connect.fetchSession(true);
  //       setSession(a8Connect.currentSession);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       !isAuthStillPending && setIsPending(false);
  //       setIsSessionPending(false);
  //     }
  //   },
  //   [sdk],
  // );

  // // to check if connected wallet is match with the current wallet on browser's extension
  // const checkWalletConsistency = useCallback(
  //   async (onPending?: (a: boolean) => void): Promise<boolean> => {
  //     try {
  //       if (!window?.rpcProvider) {
  //         return false;
  //       }
  //       if (!walletAddress) {
  //         return false;
  //       }

  //       onPending && onPending(true);

  //       await window.rpcProvider.disconnect();
  //       await window.rpcProvider.connect();

  //       return window.rpcProvider.publicKey?.toBase58() === walletAddress;
  //     } catch (err) {
  //       console.error(err);
  //       return false;
  //     } finally {
  //       onPending && onPending(false);
  //     }
  //   },
  //   [window?.rpcProvider, walletAddress],
  // );

  // // to import sdk, this lib cannot be import in build time
  // useEffect(() => {
  //   if (!setSdk) return;
  //   (async () => {
  //     const _sdk = await import('@ancient8/connect');
  //     setSdk(_sdk);
  //   })();
  // }, [setSdk]);

  // // to delay sdk 1 second
  // useEffect(() => {
  //   if (handleUIDInit) setTimeout(handleUIDInit, 1000);
  // }, [handleUIDInit]);

  // // to set IsPending to False, note that IsPending's initial state is True
  // useEffect(() => {
  //   const authTimeOut = setTimeout(() => {
  //     if (!!localStorage.getItem(A8_JWT_NAME) && !uid) {
  //       setIsPending(false);
  //     }
  //   }, 10000);
  //   return () => clearTimeout(authTimeOut);
  // }, []);

  // useEffect(() => {
  //   // Ignore if fetchSession() is running
  //   if (isSessionPending) return;

  //   setAvatar(session?.sessionUser?.avatar || '');
  //   setUID(session?.sessionUser?._id || '');
  //   if (!session?.sessionUser && !localStorage.getItem(A8_JWT_NAME)) {
  //     setIsLoginWithA8(false);
  //   }
  // }, [session?.sessionUser, isSessionPending]);

  // useEffect(() => {
  //   // Ignore if fetchSession() is running
  //   if (isSessionPending) return;

  //   setWalletAddress(session?.connectedWallet?.walletAddress || '');
  //   setPublicKey(session?.connectedWallet?.walletAddress ? new PublicKey(session.connectedWallet.walletAddress) : null);
  //   setConnected(!!session?.connectedWallet?.walletAddress);
  // }, [session?.connectedWallet?.walletAddress, isSessionPending]);

  // // to determine if user has fully authenticated
  // useEffect(() => {
  //   // Ignore if fetchSession() is running
  //   if (isSessionPending) return;

  //   setAuthenticated(!!walletAddress && isLoginWithA8);
  // }, [walletAddress, isLoginWithA8, isSessionPending]);

  // // to get BE access token
  // useEffect(() => {
  //   if (uid && !isLoginWithA8) {
  //     loginBE(session?.connectedWallet?.walletAddress);
  //   }
  // }, [uid]);

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
