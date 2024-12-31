<template>
  <div class="training-plan" v-if="!isHideHeader">
    <div class="plan-header">
      <div class="plan-title tracking-wider">
        {{ props.title }}
      </div>
    </div>
    <div class="plan-info">
      <div v-if="props.startDate" class="plan-dates">
        {{ formatDateRange(props.startDate, props.endDate) }}
      </div>
      <span>{{ props.status ? "已完成" : "进行中" }}</span>
    </div>
    <div class="plan-details">
      <ul class="plan-sessions">
        <li
          class="flex justify-between actionGroup-item"
          v-for="(plan, index) in planList"
          @click="getOrderDetail(plan)"
          :key="index">
          <span class="flex flex-nowrap">
            <div @click.stop="handlePunchIn(plan.ID, plan.Complete, index)">
              <van-checkbox
                class="round cyan"
                checked-color="#1cbbb4"
                icon-size="24px"
                :value="plan.Complete"
                :checked="plan.Complete" />
            </div>

            <view class="title ml-3">
              {{ plan.PlanTitle === '' ? `私教课第 ${index + 1} 节` : plan.PlanTitle }}</view
            >
          </span>
          <span>{{ plan.PlanTime.split(' ')[0] }}</span>
        </li>
      </ul>
    </div>
  </div>
  <ul class="plan-sessions" v-if="isHideHeader">
    <li
      class="flex justify-between actionGroup-item"
      v-for="(plan, index) in planList"
      :key="index"
      @click="getOrderDetail(plan)">
      <span class="flex flex-nowrap">
        <div @click.stop="handlePunchIn(plan.ID, plan.Complete, index)">
        <van-checkbox
          class="round cyan"
          checked-color="#1cbbb4"
          icon-size="24px"
          :value="plan.Complete"
          :checked="plan.Complete" />
        </div>
        <view class="title ml-3">  {{ plan.PlanTitle === '' ? `私教课第 ${index + 1}节` : plan.PlanTitle }}</view>
      </span>
      <span>{{ plan.PlanTime }}</span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, PropType, watch } from "vue";
import { useRouter } from "uni-mini-router";
import { useActionsStore } from "@/state/modules/actions";
import { actionClok } from "@/api/courses/courses";

type ActionGroupType = {
  ID: number;
  Type: string;
  PlanTitle: string;
  PlanTime: string;
  CreatedAt: string;
  Complete: boolean;
};

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  startDate: {
    type: String,
    required: false,
  },
  endDate: {
    type: String,
    required: false,
  },
  status: {
    type: Number,
    required: true,
  },
  actionGroups: {
    type: Array as PropType<ActionGroupType[]>,
    required: true,
  },
  isHideHeader: {
    type: Boolean,
    required: false,
  },
});
const planList = ref<ActionGroupType[]>(props.actionGroups);

const router = useRouter();

const formatDateRange = (startDate?: string, endDate?: string) => {
  if (!startDate) return '';
  
  const formatDate = (date: string) => date.split(' ')[0];
  const start = formatDate(startDate);
  
  if (!endDate) {
    return `创建于 ${start}`;
  }
  
  return `${start} - ${formatDate(endDate)}`;
};

const getOrderDetail = (item: any) => {
  console.log(item, "item");
  useActionsStore().setPlanList(item);
  useActionsStore().setTime(item.day);
  useActionsStore().setChooseActionId(item.id);
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
  () => props.actionGroups,
  (newVal: any) => {
    planList.value = newVal;
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>
<style scoped>
.training-plan {
  border-radius: 8px;
  margin: 10px 0;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.plan-header {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.plan-title {
  font-weight: bold;
  font-size: 20px;
  line-height: 1.5;
}

.plan-details {
  border-top: 1px solid #037fec;
  border-image: linear-gradient(
    to right,
    #92c2f3 0%,
    #1f90f3 50%,
    #92c2f3 100%
  );
  border-image-slice: 1;
  margin-top: 20px;
  padding-top: 20px;
}

.plan-info {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.plan-dates {
  color: #888;
  margin-bottom: 10px;
}

.plan-sessions {
  list-style: none;
  padding: 0;
}

.plan-sessions li {
  margin: 5px 0;
}

.actionGroup-item {
  margin-bottom: 20px;
  word-spacing: 1.5px;
  font-size: 16px;
}
</style>
