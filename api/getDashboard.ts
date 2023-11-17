import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const getDashboard = async (body: IReqGetDashboard): Promise<IResGetDashboard> => {
  const url = `/getDashboard`;
  try {
    const { data } = await resolve.post<IResGetDashboard>(url, body);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
