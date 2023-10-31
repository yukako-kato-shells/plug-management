export interface IResGetValues {
  values: IResGetValuesValue[];
}

export interface IResGetValuesValue {
  uid: string;
  title: string;
  detail: string;
}

export const defaultIResGetValues = {
  values: [],
}