import { IResGetPlanUpgrade } from '../interfaces/IGetPlanUpgrade';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const getPlanUpgrade = async (): Promise<IResGetPlanUpgrade> => {
  const url = `/getUpgradePlanInfo`;
  try {
    const { data } = await resolve.post<IResGetPlanUpgrade>(url);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
