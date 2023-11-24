import { IReqUpdateEmailRequest, IResUpdateEmailRequest } from '../interfaces/IUpdateEmailREquest';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const updateEmailRequest = async (body: IReqUpdateEmailRequest): Promise<IResUpdateEmailRequest> => {
  const url = `/updateEmailRequest`;
  try {
    const { data } = await resolve.post<IResUpdateEmailRequest>(url, body);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
