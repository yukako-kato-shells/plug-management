import { IValue } from "./IValue";

export interface IReqCreateValue {
  title: string,
  detail: string,
}

export interface IResCreateValue {
  values: IValue[],
}