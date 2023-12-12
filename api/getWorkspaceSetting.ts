import { IResGetWorkspaceSetting } from '../interfaces/IGetWorkspaceSetting';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const getWorkspaceSetting = async (): Promise<IResGetWorkspaceSetting> => {
  const url = `/getWorkspaceSetting`;
  try {
    const { data } = await resolve.post<IResGetWorkspaceSetting>(url);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
