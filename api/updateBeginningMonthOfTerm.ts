
import { IReqUpdateBeginningMonthOfTerm, IResUpdateBeginningMonthOfTerm } from '../interfaces/IUpdateBeginningMonthOfTerm';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const updateBeginningMonthOfTerm = async (body: IReqUpdateBeginningMonthOfTerm): Promise<IResUpdateBeginningMonthOfTerm> => {
  const url = `/updateBeginningMonthOfTerm`;
  try {
    const { data } = await resolve.post<IResUpdateBeginningMonthOfTerm>(url, body);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
