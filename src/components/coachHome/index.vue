<template>
  <view class="h-full flex flex-col px-2">
    <view @click="enterSearch()" class="w-full flex justify-start">
      <van-search
        class="flex-1"
        placeholder="请输入搜索关键词" />
    </view>

    <div class="w-full relative flex justify-centers rounded-sm overflow-hidden">
      <!-- <div class="w-full h-full bg-black absolute z-20 opacity-25 rounded-sm"></div> -->
      <img
        class="w-full h-50 "
        src="https://lms.dgut.edu.cn/uobs/view/resources/12997893/202511230204563517.jpg" />
      <!-- <div
        class="absolute z-50 text-white bottom-0 w-full p-2 flex-wrap flex justify-center items-center">
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
      </div> -->
    </div>

    <div class="tabs w-full h-0" style="flex: 1;">
      <div class="font-bold text-10 mt-2 ml-2">进 行 的 课 程</div>
      <myStudent class="h-full"/>
    </div>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "uni-mini-router";
import { getlist } from "@/api/common/user/user";
import myStudent from "@/components/myStudent/myStudent.vue";
const router = useRouter();

const enterSearch = () => {
  router.push({
    name: "searchStu",
  });
};
// 请求api
</script>

<style>

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
</style>
