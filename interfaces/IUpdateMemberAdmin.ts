import { IResGetMemberForSetting } from "./IGetAdminMembers";

export interface IReqUpdateMemberAdmin {
  member_uid: string,
  is_admin: boolean,
}

export interface IResUpdateMemberAdmin {
  members: IResGetMemberForSetting[],
}