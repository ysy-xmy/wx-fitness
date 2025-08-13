<template>
  <div class="finished-task container pb-20 w-full h-full">
    <PlanCard title="私教课" startDate="2022.11.01" endDate="2022.11.30" :status=1 :actionGroups="actionGroupsdata" />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted, reactive } from "vue";
import PlanCard from "@/components/plan-card/index.vue";
const props = defineProps<{
  list: any;
}>();

const actionGroupsdata = ref([
  {
    ID: 1,
    Type: "肌肉训练",
    PlanTitle: "肌肉训练",
    PlanTime: "2022.11.01",
    CreatedAt: "2022.11.01",
    Complete: true,
  },
  {
    ID: 2,
    Type: "瘦身训练",
    PlanTitle: "瘦身训练",
    PlanTime: "2022.11.02",
    CreatedAt: "2022.11.02",
    Complete: false,
  },
  {
    ID: 3,
    Type: "塑形训练",
    PlanTitle: "塑形训练",
    PlanTime: "2022.11.03",
    CreatedAt: "2022.11.03",
    Complete: false,
  },
  {
    ID: 4,
    Type: "增肌训练",
    PlanTitle: "增肌训练",
    PlanTime: "2022.11.04",
    CreatedAt: "2022.11.04",
    Complete: true,
  },
  {
    ID: 5,
    Type: "减脂训练",
    PlanTitle: "减脂训练",
    PlanTime: "2022.11.05",
    CreatedAt: "2022.11.05",
    Complete: false,
  },
]);
</script>
<style scoped>
.content-item {
  margin-bottom: 12px;
}
</style>
