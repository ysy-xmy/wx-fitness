<template>
  <div class="custom-tabs">
    <div class="tab-headers">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        :class="['tab-header', { active: tab.name === activeTab }]"
        @click="selectTab(tab.name)"
      >
        <van-icon class="tab-icon" size="35" v-if="tab.name === 'buy'" name="cart-o" color="#6eaaac" />
        <van-icon class="tab-icon" size="35" v-if="tab.name === 'my'"  name="records-o" color="#6eaaac" />
        <text class="tab-title">{{ tab.title }}</text>
      </div>
    </div>
    <div class="tab-content">
      <slot :name="activeTab"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps({
  initialActive: {
    type: String,
    default: ''
  }
});

const activeTab = ref(props.initialActive);
const tabs = ref([
  { title: '购买\nBUY', name: 'buy' },
  { title: '课程\nPLAN', name: 'my' }
]);

function selectTab(name: string) {
  activeTab.value = name;
}
</script>

<style>
.custom-tabs {
  width: 100%;
}

.tab-headers {
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
  padding: 10px 30px;
}

.tab-header {
  width: 45%;
  cursor: pointer;
  padding: 8px 20px;
  border-bottom: 2px solid transparent;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.tab-icon{
  margin-right: 10px;
}

.tab-title {
  font-size: 25rpx;
  color: #6eaaac;
  text-align: center;
}

.tab-header.active {
  border-color: #6eaaac;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
  transform: scale(1.05);
}

.tab-content {
  background-color: #fff;
}
</style>