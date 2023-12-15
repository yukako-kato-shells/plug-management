import { IResGetMembersForSetting } from '../interfaces/IGetAdminMembers';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const getMembersForSetting = async (): Promise<IResGetMembersForSetting> => {
  const url = `/getMembersForSetting`;
  try {
    const { data } = await resolve.post<IResGetMembersForSetting>(url);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
