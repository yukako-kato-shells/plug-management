export interface IResGetPlanMember {
  number: number,
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

export interface IResGetPlanPlanPLan {
  name: string,
  start_date: string,
  end_date: string,
}

export interface IResGetPlanPlan {
  current_plan: IResGetPlanPlanPLan,
  next_plan: IResGetPlanPlanPLan,
}

export interface IResGetPlan {
  plan: IResGetPlanPlan,
  member: IResGetPlanMember,
}

export const defaultIResGetPlan: IResGetPlan = {
  plan: {
    current_plan: {
      name: "",
      start_date: "",
      end_date: "",
    },
    next_plan: {
      name: "",
      start_date: "",
      end_date: "",
    },
  },
  member: {
    number: 0,
    start_date: "",
    end_date: "",
  },
}
