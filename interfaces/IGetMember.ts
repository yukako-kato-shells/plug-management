export interface IReqGetMember {
  firebase_uid: string;
}

export interface IResGetMember {
  uid: string;
  name: string;
  icon_url: string;
  workspace_uid: string;
  workspace_name: string;
  workspace_icon_url: string;
}

export const defaultIResGetMember = {
  uid: "",
  name: "",
  icon_url: "",
  workspace_uid: "",
  workspace_name: "",
  workspace_icon_url: "",
}