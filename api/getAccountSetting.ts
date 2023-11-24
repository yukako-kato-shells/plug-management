import { IResGetAccountSetting } from '../interfaces/IGetAccountSetting';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const getAccountSetting = async (): Promise<IResGetAccountSetting> => {
  const url = `/getAccountSetting`;
  try {
    const { data } = await resolve.get<IResGetAccountSetting>(url);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
