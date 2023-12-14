import IResGetCustomerPortalSession from '../interfaces/IResGetCustomerPortalSession';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const getCustomerPortalSession = async (): Promise<IResGetCustomerPortalSession> => {
  const url = `/getCustomPortalSession`;
  try {
    const { data } = await resolve.post<IResGetCustomerPortalSession>(url);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
