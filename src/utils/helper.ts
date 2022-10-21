import jwt_decode from 'jwt-decode';

export const decodeJwtWithoutLib = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded: any = decodeJwtWithoutLib(token);
  if (!decoded || !decoded.exp) return true;
  return Date.now() / 1000 > decoded.exp;
};

export const isExpired = (exp: number | string): boolean => {
  return Date.now() / 1000 > Number(exp);
};

export const checkIsInvalidToken = (token: string) => {
  try {
    const decodeResult: any = jwt_decode(token);
    if (isExpired(decodeResult.exp)) return true;
    return false;
  } catch (error) {
    return true;
  }
};
