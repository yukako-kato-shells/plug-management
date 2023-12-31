import { IResGetPlan } from '../interfaces/IGetPlan';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const getPlan = async (): Promise<IResGetPlan> => {
  const url = `/getPlanInfo`;
  try {
    const { data } = await resolve.post<IResGetPlan>(url);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
