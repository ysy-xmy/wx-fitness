/*
 * @Author: zhouyankai
 * @Date: 2023-07-26
 * @LastEditTime: 2023-04-26
 * @LastEditors: zhouyankai
 * @Description:有关权限的pinia
 */
import { defineStore } from "pinia";

interface AuthState {
  token?: string;
  user: userinfoType | object;
  RoleName: string;
  classID?: string | number;
}

interface userinfoType {
  Age: number | null;
  Avatar: string | null;
  CreateTime: string | null;
  Enable: boolean;
  ID: number;
  LastLoginTime: string | null;
  OpenID: string;
  Phone: string | null | number;
  RoleName?: string | null;
  Sex: number | null;
  UserName: string;
}
export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => ({
    token: uni.getStorageSync("token"), //
    user: Object, // user 类型为对象而不是数组
    RoleName: "", // 角色名称
    classID: "", //教练端才有的课程ID
  }),
  getters: {
    getClass(): string | undefined | number {
      return this.classID;
    },
    isLogin(): boolean {
      return this.token.length > 0; // 判断 token 是否存在
    },
    getUser(): object {
      return this.user;
    },
    getToken(): string {
      return this.token;
    },
    getRoleName(): string {
      return this.RoleName;
    },
  },
  actions: {
    setClassId(id: string | undefined | number) {
      this.classID = id;
    },
    setToken(token: string) {
      this.token = token;
    },
    setUser(user: object) {
      this.user = user;
    },
    clearToken() {
      this.token = ""; // 清空 token 设置为空字符串
    },
    clearUser() {
      this.user = {}; // 清空 user 设置为空对象
    },
    setRoleName(RoleName: string) {
      this.RoleName = RoleName;
    },
    clearStore() {
      this.$state = {
        token: "", //
        user: {}, // user 类型为对象而不是数组
        RoleName: "", // 角色名称
        classID: "", //教练端才有的课程ID
      };
    },
  },
});
