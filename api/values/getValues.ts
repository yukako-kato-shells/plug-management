import resolve, { ErrorResponse } from '../../util/axiosWithAuth';
import { IResGetValues } from '../../interfaces/IGetValues';

export const getValues = async (): Promise<IResGetValues> => {
  const url = `/values`;
  try {
    const { data } = await resolve.get<IResGetValues>(url);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
