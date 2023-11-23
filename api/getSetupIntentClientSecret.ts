import IResGetSetupIntentClientSecret from "../interfaces/IResSetupIntentClientSecret";
import resolve, { ErrorResponse } from "../util/axiosWithAuth";

export const getSetupIntentClientSecret = async (): Promise<IResGetSetupIntentClientSecret> => {
  const url = '/settlement/setup_secret';
  try {
    const { data } = await resolve.get<IResGetSetupIntentClientSecret>(url);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
