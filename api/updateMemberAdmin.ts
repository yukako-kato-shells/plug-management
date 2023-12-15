import { IReqUpdateMemberAdmin, IResUpdateMemberAdmin } from '../interfaces/IUpdateMemberAdmin';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const updateMemberAdmin = async (body: IReqUpdateMemberAdmin): Promise<IResUpdateMemberAdmin> => {
  const url = `/updateMemberAdmin`;
  try {
    const { data } = await resolve.post<IResUpdateMemberAdmin>(url, body);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
