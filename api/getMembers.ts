import { IResGetWorkspaceMembers } from '../interfaces/IGetWorkspaceMembers';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const getWorkspaceMembers = async (): Promise<IResGetWorkspaceMembers> => {
  const url = `/getWorkspaceMembers`;
  try {
    const { data } = await resolve.post<IResGetWorkspaceMembers>(url, null);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
