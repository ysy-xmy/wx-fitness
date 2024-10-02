<!-- 下滑表单 -->
<template>
  <slot
    name="empty"
    v-if="state.total == 0 || props.datasources.length == 0"
  ></slot>
  <slot name="card" v-else></slot>
</template>
<script setup lang="ts">
import { defineProps, onMounted, reactive } from "vue";
interface dataType {
  Page: number;
  Size: number;
}
interface stateType extends dataType {
  total: number;
  init: () => void;
  changeData: () => void;
  list: any[];
}
onMounted(() => {
  state.init();
});
const props = defineProps<{
  fun: (Size: string, Page: string) => any; //请求方式
  dispose: (data: dataType) => object; //数据方式
  datasources: any[];
}>();
const state = reactive<stateType>({
  list: [],
  Page: 1,
  Size: 5,
  total: 1,
  init() {
    this.list = [];
    this.Page = 1;
    state.changeData();
  },
  changeData() {
    let size = String(this.Size);
    let page = String(this.Page);
    props.fun(size, page).then((res: any) => {
      res.data.list.forEach((item: any) => {
        this.list.push(props.dispose ? props.dispose(item) : item);
      });
      // console.log(this.list, "list");
      // console.log(props.datasources, "data");
      this.Page++;
    });
  },
});
const getData = () => {
  state.changeData();
};

const ifChange = () => {
  if (state.total == 0) return true;
  return (
    state.list.length == props.datasources.length && state.list.length != 0
  );
};
defineExpose({ getData, state, ifChange });
</script>
