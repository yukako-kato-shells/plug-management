import { IReqGetMemberDashboard, IResGetMemberDashboard } from '../interfaces/IGetMemberDashboard';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const getMemberDashboard = async (body: IReqGetMemberDashboard): Promise<IResGetMemberDashboard> => {
  const url = `/getMemberDashobard`;
  try {
    const { data } = await resolve.post<IResGetMemberDashboard>(url, body);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
