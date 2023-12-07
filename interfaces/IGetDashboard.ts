export interface IReqGetDashboard {
  start_month: string;
  end_month: string;
  value_uid: string;
}

export interface IResGetDashboard {
  period: {
    start_month: string;
    end_month: string;
  };
  registered_month: string;
  beginning_month_of_term: number;
  values: IResGetDashboardValue[];
  recently_core_actions: IResGetDashboardRecentlyCoreAction[];
  ranking: IResGetDashboardRanking;
  total: IResGetDashboardTotalDetail[];
  action_number_each_month: IResGetDashboardActionNumberEachMonth[];
  action_percentage_each_month: IResGetDashboardActionPercentageEachMonth[];
}

export interface IResGetDashboardRanking {
  core_action_rank: IResGetDashboardRankingDetail[];
  support_action_rank: IResGetDashboardRankingDetail[];
}

interface IResGetDashboardRankingDetail {
  name: string;
  icon_url: string;
}

export interface IResGetDashboardRecentlyCoreAction {
  user_from: IResGetDashboardUser;
  user_to: IResGetDashboardUser;
  value_title: string;
  detail: string;
  created_at: string;
  reaction_number: number;
}

export interface IResGetDashboardActionNumberEachMonth {
  month: string;
  data: IResGetDashboardTotalDetail[];
}

export interface IResGetDashboardActionPercentageEachMonth {
  month: string;
  total: number;
}

export interface IResGetDashboardValueListDetail {
  uid: string;
  title: string;
}

export interface IResGetDashboardValue {
  uid: string;
  title: string;
  color: string;
}

export interface IResGetDashboardTotalDetail {
  value_uid: string;
  number: number;
}

interface IResGetDashboardUser {
  uid: string;
  name: string;
  icon_url: string;
}

const defaultResGetDashboardRanking: IResGetDashboardRanking = {
  core_action_rank: [],
  support_action_rank: [],
}

export const defalutResGetDashboard: IResGetDashboard = {
  period: {
    start_month: "",
    end_month: "",
  },
  registered_month: "",
  beginning_month_of_term: 0,
  recently_core_actions: [],
  ranking: defaultResGetDashboardRanking,
  total: [],
  values: [],
  action_number_each_month: [],
  action_percentage_each_month: [],
}