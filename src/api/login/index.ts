import request from "@/utils/request";
import { useAuthStore } from "@/state/modules/auth";
import { updateUserInfo } from "./wx_session";

export function loginWithWeChat(
  callback: (token: string, userInfo: any) => void
) {
  const authStore = useAuthStore();
  uni.login({
    provider: "weixin",
    success: function (event) {
      const { code } = event;
      console.log("code", code);

      // 获取启动参数（参考：https://developers.weixin.qq.com/miniprogram/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html）
      const launchOptions = uni.getLaunchOptionsSync();
      const accountInfo = uni.getAccountInfoSync();
      const systemInfo = uni.getSystemInfoSync();

      // 获取 referrerInfo - 来源信息（仅在特定场景下有效）
      // 有效场景：1020(公众号profile页), 1035(公众号菜单), 1036(App分享), 1037(小程序打开小程序), 1038(从另一个小程序返回), 1043(公众号模板消息), 1069(移动应用)
      const referrerInfo = launchOptions?.referrerInfo;
      const referrerAppId = referrerInfo?.appId || "";
      
      // 获取 SourceAppID - 优先使用来源 appId，否则使用当前小程序 appId
      const sourceAppID = referrerAppId || accountInfo?.miniProgram?.appId || "";

      // 获取 SourceQuery - 将 query 对象（Record<string, string>）转换为查询字符串
      // 例如：{foo: "1", bar: "2"} => "foo=1&bar=2"
      let sourceQuery = "";
      if (launchOptions?.query && Object.keys(launchOptions.query).length > 0) {
        sourceQuery = Object.keys(launchOptions.query)
          .map((key) => `${key}=${encodeURIComponent(launchOptions.query[key])}`)
          .join("&");
      }

      // 获取 SourceScene - 启动小程序的场景值（number 类型，转换为字符串）
      // 常见场景值：
      // 1001: 发现栏小程序主入口
      // 1037: 小程序打开小程序（会返回 referrerInfo）
      // 1038: 从另一个小程序返回（会返回 referrerInfo）
      const sourceScene = launchOptions?.scene != null ? String(launchOptions.scene) : "";
      
      console.log("sourceScene", sourceScene);
      console.log("sourceQuery", sourceQuery);
      console.log("sourceAppID", sourceAppID);
      // 获取或生成 DeviceID
      let deviceID = uni.getStorageSync("deviceID");
      if (!deviceID) {
        // 生成设备ID：使用系统信息组合生成唯一标识
        deviceID = `device-${systemInfo.deviceId}`;
        uni.setStorageSync("deviceID", deviceID);
      }

      // 构建请求参数（包含 Code）
      const requestData = {
        Code: code,
        SourceAppID: sourceAppID,
        SourceQuery: sourceQuery,
        SourceScene: sourceScene,
        DeviceID: deviceID,
      };

      uni.request({
        url: `${import.meta.env.VITE_BASE_URL}/api/user/wx-login`,
        method: "POST",
        data: requestData,
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
