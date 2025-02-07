import request from "@/utils/request";
import { useAuthStore } from "@/state/modules/auth";
import { updateUserInfo } from "./wx_session";

export function loginWithWeChat(
  callback: (token: string, userInfo: any) => void
) {
  const authStore = useAuthStore();
  console.log("authStore123", authStore);
  uni.login({
    provider: "weixin",
    success: function (event) {
      const { code } = event;
      console.log("code", code);

      uni.request({
        url: `${import.meta.env.VITE_BASE_URL}/api/user/wx-login?code=${code}`,
        method: "POST",
        success: (res: any) => {
          if (res.data.code === 200) {
            const token = res.data.data.Token;
            uni.setStorageSync("token", token);
            const userInfo = {
              OpenID: res.data.data.OpenID,
              name: res.data.data.Username,
              id: res.data.data.ID,
              phone: res.data.data.phone,
              Sex: res.data.data.Sex || 0,
              img: res.data.data.Avatar,
              RoleName: res.data.data.RoleName,
              Age: res.data.data.Age || "18",
            };
            authStore.setUser(userInfo);
            authStore.setToken(token);
            callback(token, userInfo);
            uni.getUserInfo({
              success: (res) => {
                const { nickName, avatarUrl, gender } = res.userInfo;
                const userInfo = {
                  OpenID: res.data.data.OpenID,
                  Username: nickName,
                  Avatar: avatarUrl,
                  Sex: gender,
                };
                updateUserInfo(userInfo)
                  .then(() => {
                    console.log("更新用户信息成功");
                    uni.showToast({
                      title: "登录成功",
                      icon: "success",
                      duration: 2000,
                    });
                    authStore.setUserInfo(userInfo);
                  })
                  .catch((error) => {
                    console.error("更新用户信息失败：", error);
                  });
              },
              fail: (error) => {
                console.error("获取用户信息失败：", error);
              },
            });
          }
          if (res.data.code === 500) {
            uni.showToast({
              title: "用户已经被禁用，请联系管理员",
              icon: "none",
            });
          }
        },
        fail: (error) => {
          console.error("登录失败：", error);
          uni.showToast({
            title: "登录失败",
            icon: "none",
          });
        },
      });
    },
    fail: function (error) {
      console.error("微信登录失败：", error);
    },
  });
}
