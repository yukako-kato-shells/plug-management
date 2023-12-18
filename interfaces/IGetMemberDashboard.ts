export interface IReqGetMemberDashboard {
  start_month: string;
  end_month: string;
  value_uid: string;
}

export interface IResGetMemberDashboard {
  period: {
    start_month: string;
    end_month: string;
  };
  values: IResGetMemberDashboardValue[];
  registered_month: string;
  beginning_month_of_term: number;
  uid: string;
  name: string;
  icon_url: string;
  is_active: string;
  total_core_action_number: number;
  total_support_action_number: number;
  action_transition: IResGetMemberDashboardActionTransition[];
  core_actions: IResGetMemberDashboardAction[];
  support_actions: IResGetMemberDashboardAction[];
}

export interface IResGetMemberDashboardValueListDetail {
  uid: string;
  title: string;
}

export interface IResGetMemberDashboardValue {
  uid: string;
  title: string;
  color: string;
}

export interface IResGetMemberDashboardActionTransition {
  month: string;
  core_action_number: number;
  support_action_number: number;
}

interface IResGetMemberDashboardUser {
  uid: string;
  name: string;
  icon_url: string;
}

export interface IResGetMemberDashboardAction {
  member_from: IResGetMemberDashboardUser;
  member_to: IResGetMemberDashboardUser;
  value_title: string;
  detail: string;
  created_at: string;
  reactions: IResGetMemberDashboardReaction[];
}

export interface IResGetMemberDashboardReaction {
  name: string;
  is_custom: boolean;
  unicode: string;
  icon_url: string;
  count: number;
}

export const defaultIResGetMemberDashboard = {
  period: { start_month: "", end_month: "" },
  values: [],
  registered_month: "",
  beginning_month_of_term: 0,
  uid: "",
  name: "",
  icon_url: "",
  is_active: "",
  total_core_action_number: 0,
  total_support_action_number: 0,
  action_transition: [],
  core_actions: [],
  support_actions: [],
}