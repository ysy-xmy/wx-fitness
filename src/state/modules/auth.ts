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

  user: Record<string, any>;
}
export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => ({
    token: uni.getStorageSync("token"), //
    user: {} as Record<string, any>, // user 类型为对象而不是数组
  }),
  getters: {
    isLogin(): boolean {
      return this.token.length > 0; // 判断 token 是否存在
    },
    getUser(): Record<string, any> {
      return this.user;
    },
    getToken(): string {
      return this.token;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUser(user: Record<string, any>) {
      this.user = user;
    },
    clearToken() {
      this.token = ""; // 清空 token 设置为空字符串
    },
    clearUser() {
      this.user = {}; // 清空 user 设置为空对象
    },
  },
});
