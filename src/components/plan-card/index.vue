<template>
  <div class="training-plan">
    <div class="plan-header">
      <div class="plan-title tracking-wider">
        {{ title }}
      </div>
    </div>
    <div class="plan-info">
      <div class="plan-dates">{{ startDate }} - {{ endDate }}</div>
      <span>{{ status ? '已完成' : '进行中' }}</span>
    </div>
    <div class="plan-details">
      <ul class="plan-sessions">
        <li class="flex justify-between actionGroup-item" v-for="(actionGroup, index) in actionGroups" :key="index">
          <span class="flex flex-nowrap">
            <checkbox v-if="actionGroup.status!=2" class='round cyan' :class="actionGroup.status==1?'checked':''" :checked="actionGroup.status==1?true:false"></checkbox>
            <checkbox v-else class='round checked grey' checked></checkbox>
            <view class="title ml-3">   {{ index + 1 }}. {{ actionGroup.title }}</view>
          </span>
          <span>{{actionGroup.date}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';

type ActionGroupType = {
  title: string;
  date: string;
  status: number;
};

export default defineComponent({
  name: 'TrainingPlan',
  props: {
    title: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    actionGroups: {
      type: Array as PropType<ActionGroupType[]>,
      required: true,
    },
  },
  setup(props) {
    const isOpen = ref(false);
    return {
      isOpen,
    };
  },
});
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
  border-image: linear-gradient(to right, #92c2f3 0%, #1f90f3 50%, #92c2f3 100%);
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
