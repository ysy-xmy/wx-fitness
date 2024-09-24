<template>
  <div class="main">
    <!-- <div class="tab-title bg-[#f8fafc] w-12/13 rounded-lg p-2">
      <div class="tab flex justify-center items-center bg-white">
        <div class="tab-item w-1/3 text-center py-3 cursor-pointer">
          <span class="text-[#F65625] tracking-widest">我 的 学 员</span>
        </div>
      </div>
    </div> -->
    <view class="felx flex-col w-12/13 p-2 h-48 bg-[#f9fafb] z-0 topBg">
      “健身不只是身体上的锻炼，它还是心灵和情感的一种训练。”
      <br /><span style="font-size: smaller; margin-top: 2px"> 7月8日 周一</span
      ><span
        style="
          font-size: smaller;
          margin-top: 2px;
          float: right;
          display: inline-block;
        "
        >帕拉梅拉</span
      >
    </view>
    <div class="font-bold text-10 mt-2 ml-2">我 的 学 员</div>
    <div class="bg-white coachlist p-2">
      <div class="lists-item flex flex-nowrap items-center justify-between p-1">
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
<script lang="ts" setup>
import { useRouter } from "uni-mini-router";
const router = useRouter();

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
.topBg {
  background: no-repeat center/150%
    url("https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d");
  font-size: 18px;
  padding-top: 30%;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 25px;
  color: #ffffffff;
}
</style>
