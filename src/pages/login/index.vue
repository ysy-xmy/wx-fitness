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
        <!-- open-type="getPhoneNumber" -->
        <view class="btns">
          <button
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
import { useRouter } from "uni-mini-router";
import { loginWithWeChat } from "@/api/login/index.ts";

const router = useRouter();

function login() {
  loginWithWeChat((token, userInfo) => {
    router.replace({ name: "home" });
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
