import { IReqConfirmEmail, IResConfirmEmail } from '../interfaces/IConfirmEmail';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const confirmEmail = async (body: IReqConfirmEmail): Promise<IResConfirmEmail> => {
  const url = `/updateEmail`;
  try {
    const { data } = await resolve.post<IResConfirmEmail>(url, body);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
