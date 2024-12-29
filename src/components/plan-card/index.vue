<template>
  <div class="training-plan" v-if="!isHideHeader">
    <div class="plan-header">
      <div class="plan-title tracking-wider">
        {{ props.title }}
      </div>
    </div>
    <div class="plan-info">
      <div class="plan-dates">{{ props.startDate }} - {{ props.endDate }}</div>
      <span>{{ props.status ? "已完成" : "进行中" }}</span>
    </div>
    <div class="plan-details">
      <ul class="plan-sessions">
        <li
          class="flex justify-between actionGroup-item"
          v-for="(actionGroup, index) in props.actionGroups"
          @click="getOrderDetail(actionGroup)"
          :key="index"
        >
          <span class="flex flex-nowrap">
            <checkbox
              v-if="actionGroup.status != 2"
              class="round cyan"
              disabled
              :class="actionGroup.status == 1 ? 'checked' : ''"
              :checked="actionGroup.status == 1 ? true : false"
            ></checkbox>
            <checkbox
              v-else
              class="round checked grey"
              disabled
              checked
            ></checkbox>
            <view class="title ml-3">
              {{ index + 1 }}. {{ actionGroup.title }}</view
            >
          </span>
          <span>{{ actionGroup.date }}</span>
        </li>
      </ul>
    </div>
  </div>
  <ul class="plan-sessions" v-if="isHideHeader">
    <li
      class="flex justify-between actionGroup-item"
      v-for="(actionGroup, index) in props.actionGroups"
      :key="index"
      @click="getOrderDetail(actionGroup)"
    >
      <span class="flex flex-nowrap">
        <checkbox
          v-if="actionGroup.status != 2"
          class="round cyan"
          disabled
          :class="actionGroup.status == 1 ? 'checked' : ''"
          :checked="actionGroup.status == 1 ? true : false"
        ></checkbox>
        <checkbox v-else class="round checked grey" disabled checked></checkbox>
        <view class="title ml-3">
          {{ index + 1 }}. {{ actionGroup.title }}</view
        >
      </span>
      <span>{{ actionGroup.date }}</span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, PropType } from "vue";
import { useRouter } from "uni-mini-router";
import { useActionsStore } from "@/state/modules/actions";

type ActionGroupType = {
  title: string;
  date: string;
  status: number;
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

const isOpen = ref(false);
const router = useRouter();

const getOrderDetail = (item: any) => {
  console.log(item, "item");
  useActionsStore().setPlanList(item);
  useActionsStore().setTime(item.day);
  router.push({
    path: "/subpackages/calender/index",
  });
};
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
