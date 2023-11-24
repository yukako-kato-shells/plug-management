export interface IReqConfirmEmail {
  confirmation_token: string,
}

export interface IResConfirmEmail {
  result: boolean;
  message: string;
}