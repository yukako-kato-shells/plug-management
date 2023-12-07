import { IReqSaveCardAndUpgrade, IResSaveCardAndUpgrade } from '../interfaces/ISaveCardAndUpgrade';
import resolve, { ErrorResponse } from '../util/axiosWithAuth';

export const saveCardAndUpgrade = async (body: IReqSaveCardAndUpgrade): Promise<IResSaveCardAndUpgrade> => {
  const url = `/upgradeWithNewCard`;
  try {
    const { data } = await resolve.post<IResSaveCardAndUpgrade>(url, body);
    return data;
  } catch (error: unknown) {
    throw error as ErrorResponse;
  }
};
