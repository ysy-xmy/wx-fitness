<template>
    <view class="contain">
        <view class="con">
            <view class="content rounded-lg">
                <view class="title text-3xl text-teal-500 my-4"> 登录 </view>

                <!-- <view class="ip-info">
                    <view class="inps">
                        <input v-model="form.name" placeholder="Username" />
                    </view>
                    <view class="inps">
                        <input v-model="form.passWord" placeholder="Password" />
                    </view>
                </view> -->

                <view class="btns">
                    <button open-type="getPhoneNumber" class="bg-green-500 w-auto rounded-lg text-zinc-50"
                        @click="login">
                        手机号快捷登录
                    </button>

                </view>


            </view>
        </view>
    </view>
</template>

<script lang="ts" setup name="login">
import { reactive } from 'vue';
import { useAuthStore } from '@/state/modules/auth';
import { useRouter } from 'uni-mini-router';
import { updateUserInfo } from './wx_session';
const router = useRouter();
const authStore = useAuthStore();
const form = reactive({
    name: '小团体',
    passWord: '123456',
});

function login() {
  uni.login({
    provider: "weixin",
    onlyAuthorize: true, // 微信登录仅请求授权认证
    success: function (event) {
      const { code } = event;
      console.log("code", code);

      //客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
      uni.request({
        url: `http://43.139.169.144:8081/api/user/wx-login?code=${code}`, //仅为示例，并非真实接口地址。
        method: "POST",
        success: (res: any) => {
          let OpenID = res.data.data.OpenID;
          console.log("登录返回信息", res.data);
          if (res.data.code === 200) {
            const token = res.data.data.Token;
            uni.setStorageSync("token", token);
            authStore.token = token;
            router.push("/pages/home/index");
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
                  authStore.user = {
                    nickName,
                    avatarUrl,
                    gender,
                  };
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

const getLogincode = (code: string, nickName: string, avatarUrl: string) => {
    uni.request({
        url: 'http://localhost:5083/api/login', // 替换为你的后端接口URL
        method: 'POST',
        data: {
            code: code,
            nickName: nickName,
            avatarUrl: avatarUrl,
        },
        success: (res) => {
            console.log(res)
            if (res.statusCode === 200 && res.data.data.token) {
                // 登录成功，处理返回的数据
                console.log('登录成功：', res.data.data);
                // 保存token等信息
                uni.showToast({
                    title: '登录成功：',
                    icon: 'success'
                });
                uni.setStorageSync('token', res.data.data.token);
                let token = uni.getStorageSync('token')
                console.log(token)

                // // 跳转到主页或其他页面
                uni.reLaunch({
                    url: '../home/index'
                });
            } else {
                // 登录失败，处理错误
                console.log('登录失败：', res.data.message);
                uni.showToast({
                    title: '登录失败：' + res.data.message,
                    icon: 'none'
                });
            }
        },
        fail: (error) => {
            console.error('请求失败：', error);
            uni.showToast({
                title: '网络请求失败',
                icon: 'none'
            });
        }
    });
}

const wxlogin = async (e: any) => {


    var username = e.detail.value.nickname
    if (username === '') {
        username = '微信用户'
    }
    var avatarUrl = userInfo.value.avatarUrl

    console.log(e)


    uni.login({
        provider: 'weixin',
        success: (res) => {
            console.log(res)
            if (res.errMsg === 'login:ok') {
                getLogincode(res.code, username, avatarUrl); // 发送code到后端
            } else {
                uni.showToast({
                    title: '微信登录失败',
                    icon: 'none'
                });
            }

        }, fail: (error) => {
            console.error('登录失败：', error);
            uni.showToast({
                title: '微信登录失败',
                icon: 'none'
            });
        }



    })
}


</script>

<style lang="scss" scoped>
.contain {
    width: 100%;
    height: 100vh;
    background: url('@/static/back.jpg') no-repeat;
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
