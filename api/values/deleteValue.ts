import { IReqDeleteValue, IResDeleteValue } from '../../interfaces/IDeleteValue';
import resolve, { ErrorResponse } from '../../util/axiosWithAuth';

export const deleteValue = async (body: IReqDeleteValue): Promise<IResDeleteValue> => {
  const url = `/deleteValue`;
  try {
    const { data } = await resolve.post<IResDeleteValue>(url, body);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
