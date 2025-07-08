<template>
  <view class="contain">
    <view class="con">
      <view class="content rounded-2xl shadow-lg">
        <view class="logo-area">
          <image
            src="https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20250111/1736527585770.jpg"
            mode="aspectFit"
            class="logo-image"
          />
          <text class="brand-name text-3xl font-bold">轻律健身</text>
        </view>

        <view class="subtitle text-gray-500 mb-8"> 请使用微信账号登录 </view>

        <view class="btns">
          <button class="login-btn" @click="login">
            <text class="iconfont icon-weixin mr-2"></text>
            微信一键登录
          </button>
        </view>

        <view class="agreement-container mt-6">
          <view class="checkbox-wrapper" @tap="toggleAgreement">
            <view 
              class="checkbox" 
              :class="{ 'checked': isAgreed }"
            >
              <text v-if="isAgreed" class="iconfont icon-check"></text>
            </view>
            <text class="agreement-text">
              我已阅读并同意
              <text class="text-teal-500 underline" >服务条款</text>
              和
              <text class="text-teal-500 underline">隐私政策</text>
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup name="login">
import { useRouter, useRoute } from "uni-mini-router";
import { loginWithWeChat } from "@/api/login/index";
import { onMounted, ref } from "vue";

let query: any = {};
const router = useRouter();
const route = useRoute();
const isAgreed = ref(false)

onMounted(() => {
  if (route.query) {
    query = {
      name: route.query.name ? decodeURIComponent(route.query.name) : "",
      phone: route.query.phone ? decodeURIComponent(route.query.phone) : "",
      img: route.query.img ? decodeURIComponent(route.query.img) : "",
      count: route.query.count ? decodeURIComponent(route.query.count) : "",
      price: route.query.price ? decodeURIComponent(route.query.price) : "",
      id: route.query.id ? decodeURIComponent(route.query.id) : "",
      sex: route.query.sex ? decodeURIComponent(route.query.sex) : "",
    };
    console.log("decoded query:", query);
  }
});

function toggleAgreement() {
  isAgreed.value = !isAgreed.value
}

function login() {
  if (!isAgreed.value) {
    uni.showToast({
      title: '请先勾选同意服务条款和隐私政策',
      icon: 'none',
      duration: 2000
    })
    return
  }

  loginWithWeChat((token, userInfo) => {
    // 使用 push 并确保目标页面配置正确
    router.replaceAll({ name: "home" });
  });
}
</script>

<style lang="scss" scoped>
.contain {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #5bd0e1 0%, #40b5c5 100%);

  .con {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30rpx;

    .content {
      width: 100%;
      padding: 50rpx 40rpx;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: slideUp 0.5s ease-out;

      .logo-area {
        margin-bottom: 20rpx;
        display: flex;
        flex-direction: column;
        align-items: center;

        .logo-image {
          width: 180rpx;
          height: 180rpx;
          border-radius: 24rpx;
        }

        .brand-name {
          margin-top: 16rpx;
          font-size: 36rpx;
          font-weight: bold;
          background: linear-gradient(to right, #5bd0e1, #40b5c5);
          -webkit-background-clip: text;
          color: transparent;
        }
      }

      .login-btn {
        background: linear-gradient(to right, #5bd0e1, #40b5c5);
        color: white;
        padding: 25rpx 60rpx;
        border-radius: 100rpx;
        font-size: 32rpx;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        box-shadow: 0 4px 15px rgba(91, 208, 225, 0.3);

        &:active {
          transform: scale(0.98);
          box-shadow: 0 2px 8px rgba(91, 208, 225, 0.2);
        }
      }

      .agreement-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .checkbox-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          
          .checkbox {
            width: 40rpx;
            height: 40rpx;
            border: 2rpx solid #999;
            border-radius: 8rpx;
            margin-right: 15rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;

            &.checked {
              background-color: #5bd0e1;
              border-color: #5bd0e1;
            }

            .icon-check {
              color: white;
              font-size: 24rpx;
            }
          }

          .agreement-text {
            font-size: 28rpx;
            color: #666;
          }
        }
      }
    }
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
