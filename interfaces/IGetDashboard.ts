interface IReqGetDashboard {
  start_month: string;
  end_month: string;
}

interface IResGetDashboard {
  registered_month: string;
  recently_core_actions: IResGetDashboardRecentlyCoreAction[];
}

const defalutResGetDashboard: IResGetDashboard = {
  registered_month: "",
  recently_core_actions: [],
}

interface IResGetDashboardRecentlyCoreAction {
  user_from: IResGetDashboardUser;
  user_to: IResGetDashboardUser;
  value_title: string;
  detail: string;
  created_at: string;
  reaction_number: number;
}

interface IResGetDashboardUser {
  uid: string;
  name: string;
  icon_url: string;
}