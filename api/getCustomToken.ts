import { IReqGetCustomToken, IResGetCustomToken } from '../interfaces/IGetCustomToken';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const getCustomToken = async (body: IReqGetCustomToken): Promise<IResGetCustomToken> => {
  const url = `/auth/custom_token`;
  try {
    const { data } = await resolve.post<IResGetCustomToken>(url, body);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
