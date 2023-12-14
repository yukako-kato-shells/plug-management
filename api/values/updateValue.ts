import { IReqUpdateValue, IResUpdateValue } from '../../interfaces/IUpdateValue';
import resolve, { ErrorResponse } from '../../util/axiosWithAuth';

export const updateValue = async (body: IReqUpdateValue): Promise<IResUpdateValue> => {
  const url = `/updateValue`;
  try {
    const { data } = await resolve.post<IResUpdateValue>(url, body);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
