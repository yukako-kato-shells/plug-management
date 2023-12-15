import resolve, { ErrorResponse } from '../../util/axiosWithAuth';
import { IReqCreateValue, IResCreateValue } from '../../interfaces/ICreateValue';

export const createValue = async (body: IReqCreateValue): Promise<IResCreateValue> => {
  const url = `/createValues`;
  try {
    const { data } = await resolve.post<IResCreateValue>(url, body);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
