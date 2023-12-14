export interface IResGetMember {
  uid: string;
  name: string;
  icon_url: string;
  workspace_uid: string;
  workspace_name: string;
  workspace_icon_url: string;
  is_admin: boolean;
}

export const defaultIResGetMember = {
  uid: "",
  name: "",
  icon_url: "",
  workspace_uid: "",
  workspace_name: "",
  workspace_icon_url: "",
  is_admin: false,
}