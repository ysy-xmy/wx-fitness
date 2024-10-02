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
    user: {
      id: "1",
      nickName: "Ye",
      phone: "1333333333",
      img: "https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d",
    } as Record<string, any>, // user 类型为对象而不是数组
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
