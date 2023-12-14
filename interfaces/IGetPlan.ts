export interface IResGetPlanNextCharge {
  number: number,
  price: number,
  start_date: string,
  end_date: string,
}

export interface IResGetPlanPayment {
  uid: string,
  payment_date: string,
  detail: string,
  start_date: string,
  end_date: string,
  number: number,
  payment_method: string,
  amount: number,
  tax_parcentage: number,
}

export interface IResGetPlanPlan {
  name: string,
  start_date: string,
  end_date: string,
  price: number,
  number: number,
}

export interface IResGetPlan {
  current_plan: IResGetPlanPlan,
  next_plan: IResGetPlanPlan,
  next_charge: IResGetPlanNextCharge,
}

export const defaultIResGetPlan: IResGetPlan = {
  current_plan: {
    name: "",
    start_date: "",
    end_date: "",
    price: 0,
    number: 0,
  },
  next_plan: {
    name: "",
    start_date: "",
    end_date: "",
    price: 0,
    number: 0,
  },
  next_charge: {
    number: 0,
    price: 0,
    start_date: "",
    end_date: "",
  },
}
