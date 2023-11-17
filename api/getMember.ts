import { IReqGetMember, IResGetMember } from '../interfaces/IGetMember';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const getMember = async (body: IReqGetMember): Promise<IResGetMember> => {
  const url = `/getMember`;
  try {
    const { data } = await resolve.post<IResGetMember>(url, body);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
