<template>
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
            @click="
              toDetail(
                item.ID,
                item.CourseName,
                item.CourseType,
                item.LessonCount
              )
            "
          >
            <div class="w-full">
              <div class="text-[#333333] p-4 text-[14px]; font-medium">
                订单编号：{{ item.ID }}
              </div>
            </div>
            <div class="w-full flex">
              <div class="mt-[21px] ml-[9px]">
                <img class="w-20 h-20 rounded-xl" :src="item.Img" alt="" />
              </div>
              <div class="flex flex-col justify-center ml-[16px]">
                <div
                  class="w-full text-[16px] font-normal text-[#111827] flex-wrap whitespace-nowrap"
                >
                  {{ item.CourseName }}
                  <span v-if="item.CourseType == 'lesson'"
                    >{{ item.LessonCount }}节</span
                  >
                  <span v-else-if="item.CourseType == 'month'">包月</span>
                  <span v-else-if="item.CourseType == 'quarter'">包季</span
                  ><span v-else-if="item.CourseType == 'year'">包年</span>
                </div>
                <div class="time w-full text-[#8c8c8c] mt-[12px]">
                  <span
                    class="cuIcon-time text-[12px] font-normal lh-[14px] mt-[10px]"
                  ></span>
                  {{ item.PaymentTime }}
                </div>
              </div>
              <div class="body-right flex flex-col w-full h-full pr-[15px]">
                <div
                  class="price w-full flex justify-end items-center h-full pb-[20px]"
                >
                  ${{ item.Amount }}
                </div>
                <div class="flex items-end justify-end mb-14px mr-15px">
                  <button
                    class="cu-btn bg-[#5adade] text-white w-[72px] h-[32px] rounded-md"
                  >
                    详情
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div
          class="nodata-card flex flex-col justify-center items-center w-full"
        >
          <van-empty description="您还没有订单哦~，可以前往购买添加课程哦~" />
        </div>
      </template>
    </scrollFrom>
  </scroll-view>
</template>

<script setup lang="ts">
import scrollFrom from "@/components/scrollForm/index.vue";
import { ref, onMounted } from "vue";
import { getOrderlist } from "@/subpackages/apis/order";
import { useRouter } from "uni-mini-router";
import dayjs from "dayjs";
const router = useRouter();
const scorllFormRef = ref<any>(null);

const dispose = (item: any) => {
  // 返回一个新的对象，将 PaymentTime 格式化
  return {
    ...item, // 保留其他属性不变
    PaymentTime: dayjs(item.PaymentTime).format("YYYY-MM-DD"), // 格式化时间
  };
};

let list = ref<any[]>([]);
onMounted(() => {
  uni.showLoading({ title: "数据加载中" });
  getListData();
  setTimeout(() => {
    uni.hideLoading();
  }, 3000);
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
const toDetail = (id: string, title: string, type: string, count: string) => {
  router.push({
    path: `/subpackages/orderDetail/index?id=${id}&&title=${title}&&type=${type}&&count=${count}`, // 使用路径导航
  });
};
</script>
