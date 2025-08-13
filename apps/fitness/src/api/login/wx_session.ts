import request from "@/utils/request";

export type WxSession = {
  openid: string;
  session_key: string;
  unionid: string;
  errcode: number;
  errmsg: string;
};

export type UserInfo = {
  ID: number | undefined;
  OpenID: string | undefined;
  Username: string | undefined;
  Password: string | undefined;
  Phone: string | undefined;
  WeChatBusinessImg: string | undefined;
  Sex: number | undefined;
  Avatar: string | undefined;
  CoachCert: string | undefined;
  OrderNum: number | undefined;
  RoleId: number | undefined;
  Enable: boolean | undefined;
  LastLoginTime: string | undefined;
};

export const updateUserInfo = (userInfo: UserInfo): Promise<any> => {
  return request.post("/api/user/update", userInfo)
};