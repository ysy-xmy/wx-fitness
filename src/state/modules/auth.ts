/*
 * @Author: zhouyankai
 * @Date: 2023-07-26
 * @LastEditTime: 2023-04-26
 * @LastEditors: zhouyankai
 * @Description:有关权限的pinia
 */
import { defineStore } from 'pinia';

interface AuthState {
    token?: string;

    user: Record<string, any>;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => ({
        token: undefined,
        user: {},
    }),
    getters: {
        isLogin(): boolean {
            return this.token !== undefined;
        },
        getUser(): any {
            return this.user;
        },
        getToken(): string | undefined {
            return this.token;
        }
    },
    actions: {
        setToken(token: string) {
            this.token = token;
        },
        setUser(user: any) {
            this.user = user;
        },
        clearToken() {
            this.token = undefined;
        },
        clearUser() {
            this.user = {};
        }
    },
});
