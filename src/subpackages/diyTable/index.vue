<template>
  <div class="card" style="background-color: #8080801c">
    <div
      class="w-full exhibition-box my-5 relative flex justify-centers rounded-t-[20px] overflow-hidden"
    >
      <div class="w-full h-full bg-black absolute z-20 opacity-25"></div>
      <img
        class="w-full h-50"
        src="https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d"
      />
      <div
        class="absolute z-50 text-white bottom-0 w-full p-2 flex-wrap flex justify-center items-center"
      >
        <div class="text-left mb-5">
          “健身不只是身体上的锻炼，它还是心灵和情感的一种训练。”
        </div>
        <div class="text-signature mb-2 w-full flex justify-between flex-wrap">
          <div class="time-text">
            <span>7月8号 周一 2024</span>
          </div>
          <div class="writer-text">
            <span>亚里士多德</span>
          </div>
        </div>
      </div>
    </div>
    <view class="cu-form-group margin-top" style="width: 100%; background: 0">
      <view class="title">课程数</view>
      <input placeholder="请输入课程数" name="input" v-model="form.num" />
    </view>
    <view class="cu-form-group margin-top" style="width: 100%; background: 0">
      <view class="title">价&nbsp;格</view>
      <input placeholder="请输入价格" name="input" v-model="form.money" />
    </view>
    <button
      class="cu-btn bg-blue-200 round large margin-top"
      open-type="share"
      :disabled="form.money == '' || form.num == ''"
    >
      点击分享
    </button>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { onShareAppMessage } from "@dcloudio/uni-app";
import { useAuthStore } from "@/state/modules/auth";
const AuthStore = useAuthStore();
const user = AuthStore.getUser;

onShareAppMessage((res) => {
  return {
    title: `${user.name}的课程`,
    path: `/subpackages/coursePurchase/index?name=${user.nickName}&&phone=${user.phone}&&img=${user.img}&&count=${form.num}&&price=${form.money}&&ifDiy=true`,
  };
});

type form = {
  num: string;
  money: string;
};
const form = reactive<form>({
  num: "",
  money: "",
});
</script>
<style scoped>
.card {
  margin: 30vw auto;
  width: 95vw;
  height: 500px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
