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
  {title: '肌肉训练',date: '2022.11.01',status: 1},
  {title: '瘦身训练',date: '2022.11.02',status: 2},
  {title: '塑形训练',date: '2022.11.03',status: 0},
  {title: '增肌训练',date: '2022.11.04',status: 1},
  {title: '减脂训练',date: '2022.11.05',status: 2},
  {title: '塑胶训练',date: '2022.11.06',status: 0},
  {title: '燃脂训练',date: '2022.11.07',status: 2},
  {title: '减重训练',date: '2022.11.08',status: 0},

])
</script>
<style scoped>
.content-item {
  margin-bottom: 12px;
}
</style>
