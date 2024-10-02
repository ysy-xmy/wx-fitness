<template>
  <scrollFrom
    :fun="getCoachStudentinfo"
    :dispose="dispose"
    ref="scorllFormRef"
    :datasources="list"
  >
    <template #card>
      <div class="main">
        <div class="font-bold text-10 mt-2 ml-2">我 的 学 员</div>
        <div class="bg-white coachlist p-2">
          <div
            class="lists-item flex flex-nowrap items-center justify-between p-1"
          >
            <div class="w-14 h-14 mr-2">
              <img
                class="w-14 h-14 rounded-full"
                src="https://tse2-mm.cn.bing.net/th/id/OIP-C.UjwT5Zhsxxr4S0wmFjSuMAAAAA?w=207&h=207&c=7&r=0&o=5&pid=1.7"
                alt=""
              />
            </div>
            <div class="w-5/6 flex pl-2 flex-row items-center justify-between">
              <div class="text-box">
                <div class="title">
                  <h1 class="text-lg font-bold py-2">
                    陈教练
                    <text
                      style="font-size: 25px; color: #a54aff"
                      class="cuIcon-female w-10 h-10 text-2xl text-red margin-right-xs"
                    ></text>

                    <text
                      style="font-size: 25px; color: #16a9fa"
                      class="cuIcon-male w-10 h-10 text-2xl text-red margin-right-xs"
                    ></text>
                  </h1>

                  <p class="text-[#6b7280] text-[12px]">运动基本课 10节</p>
                </div>
              </div>

              <div class="btn h-full flex flex-row items-center">
                <van-circle
                  class="mr-4"
                  stroke-width="4"
                  size="45"
                  layer-color="#ebedf0"
                  color="#ec6853"
                  value="20"
                  text="20%"
                />
                <van-button
                  @click="todetail"
                  color="#fd7d46"
                  size="small"
                  round
                  type="primary"
                  class="tracking-wide"
                  ><span>查看</span></van-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #empty>
      <div class="nodata-card flex flex-col justify-center items-center w-full">
        <van-empty description="暂无学员" />
      </div>
    </template>
  </scrollFrom>
</template>
<script lang="ts" setup>
import { useRouter } from "uni-mini-router";
import scrollFrom from "@/components/scrollForm/index.vue";
import { ref, onMounted } from "vue";
import { getCoachStudentinfo } from "@/api/coach";
const router = useRouter();
const scorllFormRef = ref<any>(null);
let list = ref<any[]>([]);
onMounted(() => {
  uni.showLoading({ title: "数据加载中" });
  uni.$on("nextData", (val) => {
    if (val == "buy") {
      uni.showLoading();
      scorllFormRef.value.getData();
      getListData();
    }
  });
  getListData();
});
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
const dispose = (item: any) => {
  return item;
};
const todetail = () => {
  console.log("查看");
  router.push({
    name: "studentDetail",
  });
};
</script>
<style scoped>
.lists-item {
  margin-bottom: 10px;
}
</style>
