<!-- 下滑表单 -->
<template>
  <slot name="card"></slot>
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
  dataSources: any[];
}
onMounted(() => {
  state.init();
});
const props = defineProps<{
  fun: (Size: number, Page: number) => any; //请求方式
  dispose: (data: dataType) => object; //数据方式
}>();
const state = reactive<stateType>({
  list: [],
  Page: 1,
  Size: 5,
  total: 1,
  dataSources: [],
  init() {
    this.list = [];
    this.Page = 1;
    state.changeData();
  },
  changeData() {
    props.fun(this.Size, this.Page).then((res: any) => {
      res.data.list.forEach((item: any) => {
        this.list.push(props.dispose ? props.dispose(item) : item);
      });
      console.log(this.dataSources, "this.dataSources");
      this.Page++;
    });
  },
});
const getData = () => {
  state.changeData();
};
// const getIf
defineExpose({ getData, state });
</script>
