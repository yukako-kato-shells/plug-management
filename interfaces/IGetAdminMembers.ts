export interface IResGetMembersForSetting {
  members: IResGetMemberForSetting[];
}

export interface IResGetMemberForSetting {
  uid: string;
  name: string;
  icon_url: string;
  is_active: boolean;
  is_admin: boolean;
  is_me: boolean;
}

export const defaultIResGetAdminMembers: IResGetMembersForSetting = {
  members: [],
}
