import { IResGetPlanUpgrade } from '../interfaces/IGetPlanUpgrade';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const getPlanUpgrade = async (): Promise<IResGetPlanUpgrade> => {
  const url = `/plan/upgrade`;
  try {
    const { data } = await resolve.get<IResGetPlanUpgrade>(url);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
