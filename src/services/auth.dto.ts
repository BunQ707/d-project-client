export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = LoginDto & {
  // name: string;
};
