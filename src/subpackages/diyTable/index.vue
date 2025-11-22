<template>
  <div class="w-screen h-screen card-wrap" style="background-image: url('https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20250224/1740412443021.png');background-position: center;background-size: cover;">
    <div class="card" style="background-color: #fff">
      <div
        class="w-full exhibition-box relative flex justify-centers rounded-t-[20px] overflow-hidden">
        <img
          class="w-full h-50"
          src="https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20250305/1741105971033.png" />
      </div>
      <view class="cu-form-group margin-top" style="width: 100%; background: 0">
        <view class="label-title">类型</view>

        <radio-group class="block" @change="handleType">
          <view class="cu-form-group margin-top">
            <!-- <view class="title">{{}}节</view> -->
            <view class="title">实体私教课</view>
            <radio
              class="cyan margin-left-sm"
              :class="form.type == 'offline' ? 'checked' : ''"
              :checked="form.type == 'offline' ? true : false"
              value="offline"
            >
            </radio>
          </view>
          <!-- #ifndef MP-ALIPAY -->
          <view class="cu-form-group">
            <view class="title">自主式私教课</view>
            <radio
              class="cyan margin-left-sm"
              :class="form.type == 'remote' ? 'checked' : ''"
              :checked="form.type == 'remote' ? true : false"
              value="remote"
            ></radio>
          </view>
          <!-- #endif -->
        </radio-group>
      </view>
      <view class="cu-form-group margin-top" style="width: 100%; background: 0">
        <view class="label-title">课程数</view>
        <input 
          type="digit" 
          placeholder="请输入课程数" 
          name="input" 
          v-model="form.num" 
          @input="handleNumInput"
          @blur="validateNum" />
      </view>
      <view class="cu-form-group margin-top" style="width: 100%; background: 0">
        <view class="label-title">价&nbsp;格</view>
        <input placeholder="请输入价格" name="input" v-model="form.money" />
      </view>
      <button
        class="cu-btn round large margin-top mb-5"
        open-type="share"
        style="background-color:#94d0f2 ;color: #fff;"
        :disabled="form.money == '' || form.num == '' || form.type == ''">
        点击分享
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { onShareAppMessage } from "@dcloudio/uni-app";
import { useAuthStore } from "@/state/modules/auth";
const AuthStore = useAuthStore();
const user = AuthStore.getUser;
console.log(user, "user");
onShareAppMessage((res) => {
  console.log(res, user, form.num, form.money, "res");
  return {
    title: `${user.name}分享的课程`,
    path: `/subpackages/coursePurchase/index?name=${user.name}&&phone=${user.phone ? user.phone : "暂无联系方式"}&&img=${user.img}&&count=${form.num}&&price=${form.money}&&ifDiy=true&&id=${user.id}&&sex=${user.sex}&&type=${form.type}`,
  };
});

type form = {
  num: string;
  money: string;
  type: string;
};
const form = reactive<form>({
  num: "",
  money: "",
  type: "",
});
const handleType = (e: any) => {
  console.log(e, "handleType");
  form.type = e.detail.value;
};

const handleNumInput = (e: any) => {
  const value = e.detail.value;
  // 只保留数字
  const numValue = value.replace(/[^\d]/g, '');
  if (value !== numValue) {
    form.num = numValue;
    uni.showToast({
      title: '只能输入数字',
      icon: 'none',
      duration: 2000
    });
  }
};

const validateNum = () => {
  if (form.num && !/^\d+$/.test(form.num)) {
    uni.showToast({
      title: '课程数只能输入数字',
      icon: 'none',
      duration: 2000
    });
    form.num = form.num.replace(/[^\d]/g, '');
  }
};
</script>
<style scoped>
.card-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card {
  width: 80vw;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.label-title {
  width: 60px;
}
</style>
