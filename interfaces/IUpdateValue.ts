import { IValue } from "./IValue";

export interface IReqUpdateValue {
  title: string,
  detail: string,
}

export interface IResUpdateValue {
  values: IValue[],
}