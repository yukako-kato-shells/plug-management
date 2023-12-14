import { IValue } from "./IValue";

export interface IReqDeleteValue {
  uid: string;
}
export interface IResDeleteValue {
  values: IValue[],
}