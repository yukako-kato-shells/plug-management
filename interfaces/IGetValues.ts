import { IValue } from "./IValue";

export interface IResGetValues {
  values: IValue[];
  workspace_name: string;
}

export const defaultIResGetValues: IResGetValues = {
  values: [],
  workspace_name: "",
}