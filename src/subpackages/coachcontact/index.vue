<template>
  <div
    :style="{ overflow: modalHidden ? 'auto' : 'hidden', height: '100vh' }"
    class="main-container bg-[#f9f9f9] min-h-screen w-screen px-5"
  >
    <div class="bg-white coachlist">
      <div
        v-for="item in coachlist"
        :key="item.ID"
        class="lists-item flex flex-nowrap items-center justify-between p-1"
      >
        <div class="mr-2">
          <img
            class="w-12 h-12 rounded-full"
            :src="
              item.Avatar
                ? item.Avatar
                : 'https://ss0.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2046741117,1411188274&fm=253&gp=0.jpg'
            "
            alt=""
          />
        </div>
        <div class="w-5/6 flex pl-3 flex-row items-center justify-between">
          <div class="text-box">
            <div class="title">
              <h1 class="text-lg font-bold py-2">
                {{ item.Username }}
                <span class="text-xs text-[#6b7280]"></span>
                <text
                  v-if="item.Sex === 1"
                  style="font-size: 25px; color: #a54aff"
                  class="cuIcon-female w-10 h-10 text-2xl text-red margin-right-xs"
                ></text>

                <text
                  v-else
                  style="font-size: 25px; color: #16a9fa"
                  class="cuIcon-male w-10 h-10 text-2xl text-red margin-right-xs"
                ></text>
              </h1>

              <p class="text-[#6b7280]">联系：{{ item.Phone }}</p>
            </div>
          </div>
          <div class="flex h-full">
            <div class="btn h-full mr-2" v-if="ifChoose=='true'">
              <van-button
                @click="choose(item)"
                size="small"
                color="#3bd5dd"
                round
                type="primary"
                ><span class="text-">选择</span></van-button
              >
            </div>
            <div class="btn h-full" v-else>
              <van-button
                @click="contact(item.WeChatBusinessImg)"
                size="small"
                round
                color="#3bd5dd"
                type="primary"
                ><span >联系</span>
                </van-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup
      lock-scroll="true"
      @click-overlay="closepopup"
      :show="modalHidden == false"
      round
      :style="{ padding: '64px' }"
    >
      <view>
        <image
          :show-menu-by-longpress="true"
          v-if="wxcodeImg"
          class="image"
          :src="wxcodeImg"
          mode="aspectFill"
        >
        </image>
        <div
          v-else
          class="nodata-card flex flex-col justify-center items-center w-full"
        >
          <van-empty
            class="whitespace-nowrap"
            description="很抱歉该教练还没上传"
          />
        </div>
      </view>
      <view v-if="wxcodeImg" class="w-full justify-center items-center">
        <view class="title text-center text-black text-lg font-bold py-2">
          添加教练微信
        </view>
      </view>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getCoachList } from "@/api/coach";
import router from "@/router";
import { getCoachClass } from "@/api/courses/courses";
const coachlist = ref([]);
const modalHidden = ref(true);
const wxcodeImg = ref("");
const choose = (item: any) => {
  uni.showLoading();
  getCoachClass(item.ID).then((res) => {
    if (res.data.code == 200) {
      uni.hideLoading();
      uni.$emit("chooseCoach", item);
      router.back();
    } else {
      uni.showToast({
        title: "该教练暂未发布课程",
		icon:'fail'
      });
    }
  });
};
const closepopup = () => {
  modalHidden.value = true;
};
const contact = (WeChatBusinessImg: string | null) => {
  modalHidden.value = false;

  if (WeChatBusinessImg === null) return;
  wxcodeImg.value = WeChatBusinessImg;
};
const getlist = async () => {
  const res = await getCoachList();
  coachlist.value = res.data.data;
};

const init = () => {
  uni.showLoading({ title: "加载中...", mask: true });
  getlist().finally(() => {
    uni.hideLoading();
  });
};
const ifChoose = ref(false);
onMounted(() => {
  if (router.route.value.query.ifChoose) ifChoose.value = router.route.value.query.ifChoose;
  init();
});
</script>
<style scoped>
.lists-item {
  padding-bottom: 10px;
}
</style>
