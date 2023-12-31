import IResGetSetupIntentClientSecret from '../interfaces/IResSetupIntentClientSecret';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const getSetupIntentClientSecret = async (): Promise<IResGetSetupIntentClientSecret> => {
  const url = '/createSetupSecret';
  try {
    const { data } = await resolve.post<IResGetSetupIntentClientSecret>(url);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
