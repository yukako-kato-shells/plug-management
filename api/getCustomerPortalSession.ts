import IResGetCustomerPortalSession from '../interfaces/IResGetCustomerPortalSession';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const getCustomerPortalSession = async (): Promise<IResGetCustomerPortalSession> => {
  const url = `/get_custom_portal_session`;
  try {
    const { data } = await resolve.get<IResGetCustomerPortalSession>(url);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
