export const FETCH_INTERVAL = 20 * 1000;
export const MAX_PROGRESS = 100;
export const MIN_PROGRESS_PASS_FULL = 99.98;

export const TOKEN_TO_DECIMALS = 9;
export const SOL_DECIMALS = 9;
export const MAX_REWARD_SELECT = 4;

export const API_CONFIGS = {
  END_POINT: process.env.NEXT_PUBLIC_API_URL_BACKEND,
  REQUEST_METHOD: {
    POST: 'post',
    GET: 'get',
    PATCH: 'patch',
    PUT: 'put',
    DELETE: 'delete',
  },
  RESPONSE_STATUS_CODE: {
    SUCCESS: 200,
    FORBIDDEN: 301,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
  },
};

export enum ErrorMessages {
  UserRejectRequest = 'User rejected the request.',
  TransactionTimeout = 'Transaction timeout.',
  UnKnow = 'Something went wrong. Please try again later.',
}

export const listIconFooters: { src: string; href: string }[] = [
  {
    src: '/icons/twitter.svg',
    href: 'https://twitter.com/Ancient8_gg',
  },
  {
    src: '/icons/discord.svg',
    href: 'https://discord.gg/ancient8',
  },
  {
    src: '/icons/telegram.svg',
    href: 'https://t.me/ancient8_gg',
  },
  {
    src: '/icons/youtube.svg',
    href: 'https://www.youtube.com/channel/UCv4p3wP6A6Li2UYhGsh3tDQ',
  },
  {
    src: '/icons/facebook.svg',
    href: 'https://www.facebook.com/Ancient8.gg',
  },
  {
    src: '/icons/mail.svg',
    href: 'https://ancient8.ggmailto:Contact@ancient8.gg/',
  },
  {
    src: '/icons/document.svg',
    href: 'https://blog.ancient8.gg/',
  },
  {
    src: '/icons/another.svg',
    href: 'https://whitepaper.ancient8.gg/ancient8/',
  },
];

export const LOGO_URL_DEFAULT = '/logo.svg';

export const PredictionResult = {
  T: 'You are likely to have diabetes',
  F: 'There is no basis to draw conclusions',
};
