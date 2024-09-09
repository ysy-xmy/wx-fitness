<template>
    <view class="contain">
        <view class="con">
            <view class="content rounded-lg">
                <view class="title text-3xl text-teal-500 my-4"> Sign In </view>

                <!-- <view class="ip-info">
                    <view class="inps">
                        <input v-model="form.name" placeholder="Username" />
                    </view>
                    <view class="inps">
                        <input v-model="form.passWord" placeholder="Password" />
                    </view>
                </view> -->

                <view class="btns">
                    <button class="bg-violet-300 w-auto rounded-lg text-zinc-50" @click="login">
                        微信登录
                    </button>
                </view>

                <view class="desc">
                    <text>
                        Don't have an account?
                        <text class="text-violet-500"> Sign Up </text>
                    </text>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup name="login">
import { reactive } from 'vue';
import { useAuthStore } from '@/state/modules/auth';
import { useRouter } from 'uni-mini-router';
const router = useRouter();
const authStore = useAuthStore();
const form = reactive({
    name: '小团体',
    passWord: '123456',
});

function login() {
    // authStore.token = '测试';
    // router.push({
    //     name: 'home',
    // });

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
