export interface IResGetWorkspaceMembers {
  members: IGetWorkspaceMembersMember[];
}

export interface IGetWorkspaceMembersMember {
  uid: string;
  name: string;
  icon_url: string;
  is_active: string;
}