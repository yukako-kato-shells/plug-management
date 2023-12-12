export interface IResGetWorkspaceSetting {
  beginning_month_of_term: number;
  channnels: {
    slack_uid: string;
    name: string;
    selected: boolean;
  }[];
}

export const defaultIResGetWorkspaceSetting = {
  beginning_month_of_term: 0,
  notice_channel: {
    slack_uid: "",
    name: "",
    selected: false,
  },
}