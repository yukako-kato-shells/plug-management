import { IReqUpdateValue, IResUpdateValue } from '../../interfaces/IUpdateValue';
import resolve, { ErrorResponse } from '../../util/axiosWithAuth';

export const updateValue = async (uid: string, body: IReqUpdateValue): Promise<IResUpdateValue> => {
  const url = `/values/${uid}`;
  try {
    const { data } = await resolve.put<IResUpdateValue>(url, body);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
