export interface IResGetPlanUpgrade {
  member_count: number,
  channel_name: string,
  unit_price: number,
  trial_days: number,
  first_billing_start_date: string,
  first_billing_end_date: string,
}

export const defaultIResGetPlanUpgrade: IResGetPlanUpgrade = {
  member_count: 0,
  channel_name: "",
  unit_price: 0,
  trial_days: 0,
  first_billing_start_date: "",
  first_billing_end_date: "",
}