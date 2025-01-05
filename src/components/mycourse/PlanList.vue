<template>
  <div class="finished-tast w-full flex justify-center mt-5">
    <div class="w-full lists-item mt-3 px-5">
      <div
        class="nodata-card flex flex-col justify-center items-center w-full"
        v-if="planList.length === 0"
      >
        <van-empty
          :description="`暂无${type === 'online' ? '线上任务' : '线下计划'}`"
        />
      </div>
      <div v-else>
        <div
          class="card rounded-lg bg-[#f9f9f9] flex flex-wrap justify-between items-center p-4 shadow mb-3"
          v-for="(plan, index) in planList"
          :key="index"
          @click="seePlan(plan)"
        >
          <div class="card-left w-full flex items-center mb-2">
            <div @click.stop="handlePunchIn(plan.ID, plan.Complete, index)">
              <van-checkbox
                class="round cyan"
                checked-color="#1cbbb4"
                icon-size="24px"
                :value="plan.Complete"
                :checked="plan.Complete"
              />
            </div>
            <h1 class="font-normal text-base text-gray-700">
              {{
                plan.PlanTitle === ""
                  ? `私教课第 ${index + 1} 节`
                  : plan.PlanTitle
              }}
            </h1>
            <span class="ml-auto text-sm text-gray-500">{{
              props.LessonCount && props.LessonCount !== "null"
                ? "共" + props.LessonCount + "节"
                : props.EndTime
            }}</span>
          </div>
          <div
            class="card-footer w-full flex justify-between items-center text-sm text-gray-500"
          >
            <div class="left-text">教练员：{{ CoachName }}</div>
            <div class="right-text flex items-center">
              <span>
                {{ plan.PlanTime.split(" ")[0] }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, PropType } from "vue";
import { actionClok } from "@/api/courses/courses";
import type { actionGroup } from "./course";
import { useActionsStore } from "@/state/modules/actions";
import { useRouter } from "uni-mini-router";
const router = useRouter();
const planList = ref<actionGroup[]>([]);

const props = defineProps({
  type: {
    type: String as PropType<"online" | "outline">,
    required: true,
  },
  list: {
    type: Array as PropType<actionGroup[]>,
    required: true,
    default: () => [],
  },
  CoachName: {
    type: String,
    required: true,
    default: "",
  },
  LessonCount: {
    type: String,
    required: true,
    default: "",
  },
  EndTime: {
    type: String,
    required: true,
    default: "",
  },
});

const initPlanList = (data: actionGroup[]) => {
  planList.value = data.filter((item) => item.Type === props.type);
};
const seePlan = (plan: actionGroup) => {
  console.log(plan, "plan");
  useActionsStore().setFindActionData({
    // ID: item["ID"],
    Type: plan["Type"].toUpperCase(),
  });
  let temp = {
    title: plan["PlanTitle"] || "私教课",
    day: plan["PlanTime"],
    status: plan["Complete"] ? 1 : 0,
    id: plan["ID"],
    actionGroups: plan["ActionGroups"].map((it: any, ind: number) => {
      return {
        title: it["ActionGroupTitle"] || `动作${ind + 1}`,
        date: "",
        status: it["Complete"] || 0,
        List: it["PlanActions"],
        type: it["ContentType"],
      };
    }),
  };

  console.log(temp, "temp");
  useActionsStore().setPlanList(temp);
  useActionsStore().setTime(plan.PlanTime);
  useActionsStore().setChooseActionId(plan.ID);
  router.push({
    path: "/subpackages/calender/index",
  });
};
const handlePunchIn = (id: any, status: boolean, index: number) => {
  if (status) {
    uni.showToast({
      title: "已完成打卡，如需取消请联系对应教练取消取消",
      icon: "none",
      duration: 2000,
      mask: false,
    });
    planList.value[index].Complete = true;
    planList.value = [...planList.value];
    return;
  }

  uni.showModal({
    title: "日常打卡",
    content: "是否进行打卡？",
    confirmText: "确定",
    cancelText: "取消",
    success: (res) => {
      if (res.confirm) {
        actionClok(id)
          .then(() => {
            planList.value[index].Complete = true;
            uni.showToast({
              title: "成功",
              icon: "success",
              duration: 2000,
              mask: false,
            });
            uni.$emit("refreshAction", true);
          })
          .catch((err) => {
            uni.showToast({
              title: "打卡失败",
              icon: "error",
              duration: 2000,
              mask: false,
            });
            console.error("打卡失败", err);
          });
      } else {
        uni.showToast({
          title: "已取消打卡",
          icon: "none",
          duration: 2000,
          mask: false,
        });
        planList.value[index].Complete = false;
        planList.value = [...planList.value];
      }
    },
  });
};

watch(
  () => props.list,
  (newVal) => {
    initPlanList(newVal);
  },
  {
    immediate: true,
    deep: true,
  }
);
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
