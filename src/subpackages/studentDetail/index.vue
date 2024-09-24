<template>
  <div class="main flex w-full justify-center flex-col items-center">
    <div class="info mt-5 flex flex-col items-center">
      <div class="avatar">
        <img
          class="w-28 h-28 rounded-full"
          src="https://tse2-mm.cn.bing.net/th/id/OIP-C.UjwT5Zhsxxr4S0wmFjSuMAAAAA?w=207&h=207&c=7&r=0&o=5&pid=1.7"
          alt=""
        />
      </div>
      <h1 class="my-3 text-2xl text-center font-bold">陈景盛</h1>
      <span class="text-gray-400 text-sm text-center">20岁</span>
    </div>

    <div class="info-card flex flex-row items-center mt-1 w-11/12">
      <div class="card p-5 w-1/3 flex justify-center flex-col items-center">
        <h2 class="text-xl font-bold">65kg</h2>
        <span class="text-gray-400 text-sm">Weight</span>
      </div>
      <div class="card p-5 w-1/3 flex justify-center flex-col items-center">
        <h2 class="text-xl font-bold">165cm</h2>
        <span class="text-gray-400 text-sm">Height</span>
      </div>
      <div class="card p-5 w-1/3 flex justify-center flex-col items-center">
        <h2 class="text-md font-bold underline text-[#F65625]">体检表</h2>
      </div>
    </div>

    <div class="tab-title mt-2 bg-[#f8fafc] w-11/12 rounded-lg p-2">
      <div class="tab flex justify-center items-center bg-white">
        <div class="tab-item w-1/3 text-center py-3 cursor-pointer">
          <span class="text-[#F65625] tracking-widest">训 练 计 划</span>
        </div>
      </div>
    </div>
    <div
      class="cardTitle w-11/12 flex bg-[rgba(248,250,255,1)] h-10 leading-10 justify-between px-3 rounded mt-4"
    >
      <div class="font-bold">
        运动基础课<span
          class="font-thin"
          style="color: #6d819cff; margin-left: 2px"
          >(共10节课 已上6节)</span
        >
      </div>
      <van-circle
        class="mr-4"
        stroke-width="4"
        size="40"
        layer-color="#ebedf0"
        color="#ec6853"
        value="70"
        text="70%"
        style="margin-top: 15px"
      />
    </div>
    <div
      class="w-11/12 flex h-16 bg-[rgba(248,250,255,1)] justify-between cardBody"
      v-for="item in dataList"
    >
      <div>
        <p class="title">{{ item.title }}</p>
        <p class="time"><span class="cuIcon-card"></span> {{ item.day }}</p>
      </div>
      <van-checkbox
        :value="item.finish"
        checked-color="#ec6853"
        @change="changeCheck(item)"
      ></van-checkbox>
    </div>
    <div class="showmore w-11/12 text-center bg-[rgba(248,250,255,1)]">
      展示更多 <van-icon name="arrow-down" />
    </div>
    <div class="addmore w-11/12">+ 添加课表</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
type data = {
  title: string;
  day: string;
  finish: boolean;
};
const changeCheck = (item: data) => {
  console.log(item.finish);
  item.finish = !item.finish;
};
let dataList = ref([
  {
    title: "杠铃十组",
    day: "6月1日",
    finish: true,
  },
  {
    title: "杠铃十组",
    day: "6月1日",
    finish: false,
  },
  {
    title: "杠铃十组",
    day: "6月1日",
    finish: false,
  },
  {
    title: "杠铃十组",
    day: "6月1日",
    finish: false,
  },
]);
</script>

<style scoped lang="scss">
.cardTitle {
  align-items: center;
  vertical-align: middle;
  border-radius: 5px;
  border-bottom: 1px solid gray;
}
.cardBody {
  padding-left: 0.75rem;
  padding-right: 1.5rem;
  align-items: center;
  vertical-align: middle;
  //
  .title {
    font-weight: 400;
    font-size: large;
    color: #282c37ff;
  }
  .time {
    margin-top: 7px;
    color: #6d819cff;
    font-size: 14px;
  }
  // &:last-child {
  //   // border-radius: 5px;
  // }
}
.showmore {
  height: 25px;
  line-height: 25px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom: 1px solid gray;
}
.addmore {
  text-align: right;
  padding-right: 15px;
  color: #ff5e3aff;
  height: 42px;
  line-height: 42px;
}
// .progress {
//   width: 35px;
//   height: 35px;
//   border-color: white;
//   border-radius: 75%;
//   position: relative;
//   &::after {
//     content: "75%";
//     position: absolute;
//     border-radius: 75%;
//     font-size: small;
//     line-height: 35px;
//     text-align: center;
//     width: 35px;
//     height: 35px;
//     background-color: orange;
//     top: 0;
//     left: 0;
//   }
// }
</style>
