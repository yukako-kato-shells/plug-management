import { IReqUpdateNoticeChannel, IResUpdateNoticeChannel } from '../interfaces/IUpdateNoticeChannel';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const updateNoticeChannel = async (body: IReqUpdateNoticeChannel): Promise<IResUpdateNoticeChannel> => {
  const url = `/changeChannel`;
  try {
    const { data } = await resolve.post<IResUpdateNoticeChannel>(url, body);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
