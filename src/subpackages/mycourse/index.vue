<template>
  <div class="main-container relative">
    <div class="top">
      <div class="bg-img">
        <img
          class="w-full h-52"
          src="https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20241027/1730030052587.png"
          alt=""
        />
      </div>
    </div>
    <div class="info-card rounded-t-xl bg-white absolute top-40 w-full flex flex-col justify-center p-4">
      <div class="card w-full bg-[#f7f9fb] p-3">
        <div class="card-top">
          <div class="title w-full flex justify-between items-center px-1">
            <h2 class="text-xl text-black font-bold">{{ state.name }}</h2>
            <van-circle
              stroke-width="6"
              size="60"
              layer-color="#ebedf0"
              :color="gradientColor"
              :value="state.Percentage"
              :text="state.Percentage + '%'"
              style="font-size: 13px!important"
            />
          </div>
        </div>
        <div class="card-body mt-2 flex w-full justify-between flex-nowrap">
          <div class="body-content w-2/3 text-[#666] text-ellipsis h-20 overflow-y-auto text-lg flex items-center">
            <h1>{{ state.desc ? state.desc : "暂无描述" }}</h1>
          </div>
          <div
            class="body-btn w-1/3 flex-1 flex flex-col items-center justify-end"
          >
            <span class="text-[#359be5]  text-xs w-full text-center pb-2">
                授权教练打卡
            </span>
            <div class="btn">
              <van-switch :checked="checked" @change="handleswitch" />
            </div>
          </div>
        </div>
      </div>
      <!-- <Finishtabs/> -->

      <div class="mycourse-tabs">
      <van-tabs swipeable animated color="#46c5e5">
        <van-tab title="已完成">
          <finishedtask :list="list"></finishedtask>
        </van-tab>
        <van-tab title="线下计划">
          <outLinePlan :list="list" :LessonCount="state.LessonCount" :EndTime="state.EndTime" :CoachName="state.CoachName"></outLinePlan>
        </van-tab>
        <van-tab title="线上任务">
          <!-- <onlinetask :list="list"></onlinetask> -->
        </van-tab>
      </van-tabs>
    </div>
    </div>

  </div>
</template>
<script lang="ts" setup name="mycourse">
import { onMounted, ref } from "vue";
import { useRouter } from "uni-mini-router";
import {
  cancelCoachClok,
  allowCoachClock,
  selectCoachClok,
} from "@/api/courses/courses";
import { getplanlist } from "@/api/course";
import dayjs from "dayjs";
import type { actionGroup } from "@/components/mycourse/course";
//@ts-ignore
import finishedtask from "@/components/mycourse/finishedtask.vue";
//@ts-ignore
import outLinePlan from "@/components/mycourse/outLineplan.vue";
//@ts-ignore
import onlinetask from "@/components/mycourse/onlinetask.vue";
// import Finishtabs from './finishtabs.vue'
const checked = ref(false);
let list = ref<actionGroup[]>([]); // 确保 list 被初始化为一个空数组
const iddd = ref();
const courseId = ref("");
const router = useRouter();
const state = ref({
  id: "",
  name: "",
  desc: "",
  Percentage: "",
  CoachName: "",
  LessonCount: "",
  EndTime: ''
});
const gradientColor = {
  '0%': '#3ed2de',
  '100%': '#5aa6f4',
};

const getPlanlist = () => {
  uni.showLoading({
    title: "加载中",
    mask: false
  });
  getplanlist(iddd.value).then((res) => {
    let temp = res.data.data || [];
    uni.hideLoading();
    list.value = temp
  }).finally(() => {
    uni.hideLoading();
  });
};
const handleswitch = () => {
  uni.showModal({
    title: !checked.value ? "授权教练打卡" : "取消授权",
    content: !checked.value ? "是否授权教练打卡？" : "是否取消授权", // 注意：在uni-app中，message属性应该改为content
    confirmText: "确定", // 注意：在uni-app中，confirmButtonText属性应该改为confirmText
    cancelText: "取消", // 注意：在uni-app中，cancelButtonText属性应该改为cancelText
    success: (res) => {
      if (res.confirm) {
        if (!checked.value) {
          allowCoachClock(courseId.value).then((res) => {
            uni.showToast({
              title: "授权成功",
              icon: "success", //如果要纯文本，不要icon，将值设为'none'
              duration: 2000, //持续时间为 2秒
            });
            checked.value = !checked.value;
          });
        } else {
          cancelCoachClok(courseId.value).then((res) => {
            uni.showToast({
              title: "取消授权成功",
              icon: "success", //如果要纯文本，不要icon，将值设为'none'
              duration: 2000, //持续时间为 2秒
            });
            checked.value = !checked.value;
          });
        }
      }
    },
    fail: (err) => {
      console.error("showModal 调用失败", err);
    },
  });
};
const initList = () => {
  list.value = []
}

onMounted(() => {
  // 获取路由参数
  const id = router.route.value.params?.id;
  iddd.value = router.route.value.params?.id;
  courseId.value = router.route.value.params?.id;
  const name = router.route.value.params?.name;
  const desc = router.route.value.params?.desc;
  const CoachName = decodeURIComponent(router.route.value.params?.CoachName || "");
  const LessonCount = router.route.value.params?.LessonCount;
  const EndTime = router.route.value.params?.EndTime;
  const Percentage = router.route.value.params?.Percentage;

  state.value = {
    id,
    name: decodeURIComponent(name || ""),
    desc: decodeURIComponent(desc || ""),
    CoachName: decodeURIComponent(CoachName || ""),
    Percentage,
    LessonCount,
    EndTime
  };
  getPlanlist();
});

defineExpose({
  initList,
  getPlanlist
})
</script>
<style scoped></style>

