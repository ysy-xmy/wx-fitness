<template>
  <view class="contain">
    <view class="con">
      <view class="content rounded-lg">
        <view class="title text-2xl text-teal-500 my-4"> 请先登录 </view>

        <!-- <view class="ip-info">
                    <view class="inps">
                        <input v-model="form.name" placeholder="Username" />
                    </view>
                    <view class="inps">
                        <input v-model="form.passWord" placeholder="Password" />
                    </view>
                </view> -->

        <view class="btns">
          <button
            open-type="getPhoneNumber"
            class="bg-green-500 w-auto rounded-lg text-zinc-50"
            @click="login"
          >
            微信登录
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup name="login">
import { onMounted, reactive } from "vue";
import { useAuthStore } from "@/state/modules/auth";
import { useRouter } from "uni-mini-router";
import { updateUserInfo } from "./wx_session";
const router = useRouter();
const authStore = useAuthStore();
function login() {
  uni.login({
    provider: "weixin",
    // onlyAuthorize: true, // 微信登录仅请求授权认证
    success: function (event) {
      console.log(event, "event");
      const { code } = event;
      console.log("code", code);

      //客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
      uni.request({
        url: `https://meet.ysyxmy.top/api/user/wx-login?code=${code}`, //仅为示例，并非真实接口地址。
        method: "POST",
        success: (res: any) => {
          let OpenID = res.data.data.OpenID;
          console.log("登录返回信息", res.data);
          if (res.data.code === 200) {
            const token = res.data.data.Token;
            uni.setStorageSync("token", token);
            authStore.setUser({
              name: res.data.data.Username || "微信用户",
              id: res.data.data.ID,
              phone: res.data.data.phone,
              Sex: res.data.data.Sex || 0,
              img: res.data.data.Avatar,
              RoleName: res.data.data.RoleName,
              Age: res.data.data.Age || "18",
            });
            authStore.setToken(token);
            router.replace({
              name: "home",
            });
          }
          new Promise((resolve, reject) => {
            uni.getUserInfo({
              success: (res) => {
                console.log("suceess", res);
                resolve(res);
              },
              fail: (error) => {
                console.error("获取用户信息失败：", error);
                reject(error);
              },
            });
          })
            .then((res: any) => {
              console.log(res);
              const { nickName, avatarUrl, gender } = res.userInfo;

              const userInfo = {
                OpenID: OpenID,
                Username: nickName,
                Avatar: avatarUrl,
                Sex: gender,
              } as UserInfo;

              updateUserInfo(userInfo)
                .then(() => {
                  console.log("更新用户信息成功");
                  authStore.setUserInfo(userInfo);
                })
                .catch((error) => {
                  console.error("更新用户信息失败：", error);
                });
            })
            .catch((error) => {
              console.error("获取用户信息失败：", error);
            });
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
  });
}
</script>

<style lang="scss" scoped>
.contain {
  width: 100%;
  height: 100vh;
  background-size: cover;

  .con {
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 40%);

    .content {
      position: absolute;
      top: 200px;
      right: 30rpx;
      left: 30rpx;
      padding: 30rpx;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      .ip-info {
        margin-bottom: 50rpx;

        .inps {
          padding: 20rpx;
          border-bottom: 2rpx solid rgb(204 204 204 / 100%);
        }
      }

      .btns {
        margin-bottom: 30rpx;
      }

      .desc {
        text-align: center;
      }
    }
  }
}
</style>
