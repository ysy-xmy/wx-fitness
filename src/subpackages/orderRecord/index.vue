<template>
    <div class="flex flex-col h-screen items-center">
        <div v-if="courseList.length > 0" v-for="(item, index) in orderList" :key="index"
            class="orderItem w-11/12 flex flex-wrap pb-[14px] bg-[#F9FAFB] border-[1px] border-[#F3F4F6] mt-[17px] rounded-xl">
            <div class="w-full">
                <div class="text-[#333333] p-4 text-[14px]; font-medium">订单编号：{{ item.OrderNum }}</div>
            </div>
            <div class="w-full flex">
                <div class="mt-[21px] ml-[9px]">
                    <img class="w-20 h-20 rounded-xl" src="https://img.yzcdn.cn/vant/apple-1.jpg" alt="" />
                </div>
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
                </div>
            </div>
        </div>
        <div v-else class="nodata-card flex flex-col justify-center items-center w-full h-64 p-20">
            <span class="p-5 text-lg text-center">暂无订单信息~</span>

        </div>
    </div>
</template>
<script setup lang="ts">


</script>

<script setup lang="ts">
import {getOrderlist} from "@/api/order"
import { ref } from "vue"
const orderList = ref([])

const getOrderList = async () => {
    const res = await getOrderlist()
    orderList.value = res.data.OrderInfos
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