import { IPostCard } from '../interfaces/IPostCard';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const postCard = async (body: IPostCard): Promise<IPostCard> => {
  const url = `/user/cards`;
  try {
    const { data } = await resolve.post<IPostCard>(url, body);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
