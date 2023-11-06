import { IResDeleteValue } from '../../interfaces/IDeleteValue';
import { IResUpdateValue } from '../../interfaces/IUpdateValue';
import resolve, { ErrorResponse } from '../../util/axiosWithAuth';

export const deleteValue = async (uid: string): Promise<IResDeleteValue> => {
  const url = `/values/${uid}`;
  try {
    const { data } = await resolve.delete<IResUpdateValue>(url);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
