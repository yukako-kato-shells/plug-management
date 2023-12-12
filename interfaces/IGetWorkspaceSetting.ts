export interface IResGetWorkspaceSetting {
  beginning_month_of_term: number;
  channels: IResGetWOrkspaceSettingChannel[];
}

export interface IResGetWOrkspaceSettingChannel {
  slack_uid: string;
  name: string;
  is_public: boolean;
  selected: boolean;
}

export const defaultIResGetWorkspaceSetting = {
  beginning_month_of_term: 0,
  channels: [],
}

export const defaultIResGetWorkspaceSettingChannel = {
  slack_uid: "",
  name: "",
  is_public: false,
  selected: false,
}
