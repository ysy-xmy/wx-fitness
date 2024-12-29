<template>
  <div class="finished-tast w-full flex justify-center mt-5">
    <div class="w-full lists-item mt-3 px-5">
      <div
        class="nodata-card flex flex-col justify-center items-center w-full"
        v-if="Object.keys(outLineList).length === 0"
      >
        <van-empty description="暂无计划" />
      </div>
      <div v-else>
        <div
          class="card rounded-lg bg-[#f9f9f9] flex flex-wrap justify-between items-center p-4 shadow mb-3"
          v-for="(plan, index) in Object.values(outLineList).flat()"
          :key="index"
        >
          <div class="card-left w-full flex items-center mb-2">
            <div class="dot w-5 h-5 bg-gray-400 rounded-full mr-2">

            </div>
            <h1 class="font-normal text-base text-gray-700">
              {{ plan.PlanTitle===''? `私教课第 ${index + 1}节` : plan.PlanTitle}}
            </h1>
            <span class="ml-auto text-sm text-gray-500">{{ LessonCount!=='' ? '共' + LessonCount + '节' : EndTime }}</span>
          </div>
          <div class="card-footer w-full flex justify-between items-center text-sm text-gray-500">
            <div class="left-text">
              教练员：{{ CoachName }}
            </div>
            <div class="right-text flex items-center">
              <span>
                    {{ plan.PlanTime }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, PropType } from "vue";
import { actionClok } from "@/api/courses/courses";
import { useRouter } from "uni-mini-router";
import type { actionGroup } from "./course";

const router = useRouter();
const outLineList = ref<actionGroup[]>([]);
const props = defineProps({
  list: {
    type: Array as PropType<actionGroup[]>,
    required: true,
    default: () => []
  },
  CoachName: {
    type: String,
    required: true,
    default: ''
  },
  LessonCount: {
    type: String,
    required: true,
    default: ''
  },
  EndTime: {
    type: String,
    required: true,
    default: ''
  }
});
const initPlanList = (data: actionGroup[]) => {
  let temp: actionGroup[] = []
  data.forEach((item) => {
    if(item.Type === 'outline'){
      temp.push(item)
    }
  })
  outLineList.value = temp;
};

const seeDetail = (id: any) => {
  router.push({
    path: `/subpackages/actionDetail/index?itemid=${id}`,
  });
};
const handlefinish = (id: any) => {
  uni.showModal({
    title: "日常打卡",
    content: "是否进行打卡？", // 注意：在uni-app中，message属性应该改为content
    confirmText: "确定", // 注意：在uni-app中，confirmButtonText属性应该改为confirmText
    cancelText: "取消", // 注意：在uni-app中，cancelButtonText属性应该改为cancelText
    success: (res) => {
      if (res.confirm) {
        // 在这里执行用户点击确定的操作
        actionClok(id)
          .then((res) => {
            uni.showToast({
              title: "打卡成功", // 提示的内容
              icon: "success", // 图标类型，可选值有success、loading、none
              duration: 2000, // 提示框停留时间，单位毫秒
              mask: false, // 是否显示透明蒙层，防止触摸穿透，默认：false
            });
            uni.$emit("refreshAction", true);
          })
          .catch((err) => {
            uni.showToast({
              title: "打卡失败", // 提示的内容
              icon: "error", // 图标类型，可选值有success、loading、none
              duration: 2000, // 提示框停留时间，单位毫秒
              mask: false, // 是否显示透明蒙层，防止触摸穿透，默认：false
            });
          });
      } else if (res.cancel) {
        // 在这里执行用户点击取消的操作
        uni.showToast({
          title: "取消打卡", // 提示的内容
          icon: "none", // 图标类型，可选值有success、loading、none
          duration: 2000, // 提示框停留时间，单位毫秒
          mask: false, // 是否显示透明蒙层，防止触摸穿透，默认：false
        });
      }
    },
    fail: (err) => {
      console.error("showModal 调用失败", err);
    },
  });
};

watch(() => props.list, (newVal) => {
  initPlanList(newVal);
}, {
  immediate: true,
  deep: true
});

</script>
<style scoped>
.card {
  border: 1px solid #f0f0f0;
  margin-bottom: 30px;
}
.text-primary {
  color: #4080ff;
}
</style>
