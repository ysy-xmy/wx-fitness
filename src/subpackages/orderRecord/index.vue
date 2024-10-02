<template>
<<<<<<< HEAD
  <scroll-view
    style="height: 100vh"
    @scrolltolower="lowerBottom"
    scroll-y="true"
  >
    <scrollFrom
      :fun="getOrderlist"
      :dispose="dispose"
      ref="scorllFormRef"
      :datasources="list"
    >
      <template #card>
        <div class="flex flex-col h-screen items-center">
          <div
            class="orderItem w-11/12 flex flex-wrap pb-[14px] bg-[#F9FAFB] border-[1px] border-[#F3F4F6] mt-[17px] rounded-xl"
            v-for="item in list"
          >
            <div class="w-full">
              <div class="text-[#333333] p-4 text-[14px]; font-medium">
                订单编号：{{ item.id }}
              </div>
=======
    <div class="flex flex-col h-screen items-center">
        <div v-for="(item, index) in orderList" :key="index"
            class="orderItem w-11/12 flex flex-wrap pb-[14px] bg-[#F9FAFB] border-[1px] border-[#F3F4F6] mt-[17px] rounded-xl">
            <div class="w-full">
                <div class="text-[#333333] p-4 text-[14px]; font-medium">订单编号：{{ item.OrderNum }}</div>
>>>>>>> a344d14fe5d454a789bd64746f741de59c015eb0
            </div>
            <div class="w-full flex">
              <div class="mt-[21px] ml-[9px]">
                <img class="w-20 h-20 rounded-xl" :src="item.img" alt="" />
              </div>
              <div class="flex flex-col justify-center ml-[16px]">
                <div
                  class="w-full text-[16px] font-normal text-[#111827] flex-wrap whitespace-nowrap"
                >
                  {{ item.className }} {{ item.number }}节
                </div>
<<<<<<< HEAD
                <div class="time w-full text-[#8c8c8c] mt-[12px]">
                  <span
                    class="cuIcon-time text-[12px] font-normal lh-[14px] mt-[10px]"
                  ></span>
                  {{ item.time }}
                </div>
              </div>
              <div class="body-right flex flex-col w-full h-full pr-[15px]">
                <div
                  class="price w-full flex justify-end items-center h-full pb-[20px]"
                >
                  ${{ item.money }}
=======
                <div class="flex flex-col justify-center ml-[16px]">
                    <div class="w-full text-[16px] font-normal text-[#111827] flex-wrap whitespace-nowrap">
                        {{ item.CourseName }}</div>
                    <div class="time w-full text-[#8c8c8c] mt-[12px]">
                        <span class="cuIcon-time text-[12px] font-normal lh-[14px] mt-[10px] whitespace-nowrap"> {{
            item.PaymentTime }}
                        </span>
                    </div>
                </div>
                <div class="body-right flex flex-col w-full h-full pr-[15px]">
                    <div class="price w-full flex justify-end items-center h-full pb-[20px]">￥{{ item.Amount }}</div>
                    <div class="flex items-end justify-end mb-14px mr-15px">
                        <button class="cu-btn bg-[#F22F5C] text-white  w-[72px] h-[32px] rounded-md">详情</button>
                    </div>
>>>>>>> a344d14fe5d454a789bd64746f741de59c015eb0
                </div>
                <div class="flex items-end justify-end mb-14px mr-15px">
                  <button
                    class="cu-btn bg-[#F22F5C] text-white w-[72px] h-[32px] rounded-md"
                  >
                    详情
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
      </template>
      <template #empty>
        <div
          class="nodata-card flex flex-col justify-center items-center w-full"
        >
          <van-empty description="您还没有订单哦~，可以前往购买添加课程哦~" />
=======
        <div v-if="orderList.length === 0"
            class="nodata-card flex flex-col justify-center items-center w-full h-64 p-20">
            <span class="p-5 text-lg text-center">暂无订单信息~</span>

>>>>>>> a344d14fe5d454a789bd64746f741de59c015eb0
        </div>
      </template>
    </scrollFrom>
  </scroll-view>
</template>
<script setup lang="ts">

<<<<<<< HEAD
<script setup lang="ts">
import scrollFrom from "@/components/scrollForm/index.vue";
import { ref, onMounted } from "vue";
import { getOrderlist } from "@/api/order";
const scorllFormRef = ref<any>(null);
const dispose = (item: any) => {
  return item;
};
let list = ref<any[]>([]);
onMounted(() => {
  uni.showLoading({ title: "数据加载中" });

  getListData();
});
const lowerBottom = () => {
  uni.showLoading();
  scorllFormRef.value.getData();
  getListData();
};
const getListData = () => {
  list.value = scorllFormRef.value?.state.list;
  if (scorllFormRef.value?.ifChange()) {
    uni.hideLoading();
    return;
  } else {
    setTimeout(() => {
      getListData();
    }, 500);
  }
};
</script>
=======

</script>

<script setup lang="ts">
import {getOrderlist} from "@/api/order"
import { ref } from "vue"
const orderList = ref([])

const getOrderList = async () => {
    let params = {
        Page: "1",
        Size: "10",
    }
    const res = await getOrderlist(params)
    orderList.value = res.data.OrderInfos
    console.log(orderList.value)    

    orderList.value=orderList.value?.map(item=>({...item,PaymentTime:convertISO8601toDate(item.PaymentTime)}))
}

function convertISO8601toDate(isoString) {
  // 解析ISO 8601格式的时间字符串
    const date = new Date(isoString);

    // 获取年、月、日、小时、分钟、秒和毫秒
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // 构建易读的日期时间字符串
    const readableDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return readableDate;
}
getOrderList()
</script>
>>>>>>> a344d14fe5d454a789bd64746f741de59c015eb0
