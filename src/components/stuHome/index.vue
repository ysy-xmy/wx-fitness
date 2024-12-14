<template>
  <view class="content w-screen flex flex-wrap">
    <div class="w-full exhibition-box relative flex justify-centers">
      <div class="w-full h-full bg-black absolute opacity-25"></div>
      <img
        class="w-full h-64"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </div>
    <div class="tabs bg-white pt-4 rounded-t-2xl shadow-white absolute top-60 w-full">
      <CustomTabs :initialActive="active">
        <template #buy>
          <tabBuycourse />
        </template>
        <template #my>
          <tabMycourse :change="changeTab" />
        </template>
      </CustomTabs>
    </div>
  </view>
</template>

<script setup lang="ts" name="index">
import { ref } from "vue";
import CustomTabs from "./CustomTabs.vue";
import tabBuycourse from "@/components/index/tab-buycourse.vue";
import tabMycourse from "@/components/index/tab-mycourse.vue";

const active = ref<string>("buy");

function changeTab() {
  active.value = "buy";
}
</script>

<style>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logo {
  margin: 200rpx auto 50rpx;
  width: 200rpx;
  height: 200rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

:deep(.vin-image-preview-custom-pop) {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background: transparent !important;
}

.tabs {
  box-sizing: -20px -20px 60px #bebebe,
  20px 20px 60px #ffffff;
}
</style>
