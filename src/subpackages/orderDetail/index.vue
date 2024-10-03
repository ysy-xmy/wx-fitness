<template>
  <div class="course-purchase bg-[#f6f6f6] min-h-screen pb-20">
    <!-- <view class="bg-white padding">
            <view class="cu-steps">
                <view class="cu-item" :class="index > stepnum ? '' : 'text-blue'" v-for="(item, index) in numList"
                    :key="index">
                    <text class="num" :class="index == 2 ? 'err' : ''" :data-index="index + 1"></text> {{ item.name }}
                </view>
            </view>
        </view> -->
    <div class="bg-white">
      <div
        class="title p-5 text-black flex justify-between text-xl font-bold tracking-wider"
      >
        <div>
          <span class="cuIcon-roundcheck pr-3"></span>
          <span> {{ courseInfo.title }} </span>
        </div>

        <view class="text-[#606369] text-xl font-bold"
          >￥{{ courseInfo.price }}</view
        >
      </div>
      <div @click="toLocation" class="px-5 pb-5 pt-0 flex justify-between">
        <span class="mr-2">
          店铺详细地址：<span class="cuIcon-locationfill text-blue"> </span>
          广东省湛江市霞山区海滨东二路九巷一号
        </span>
        <span
          class="cu-btn whitespace-nowrap rounded-md bg-green-500 text-white"
        >
          导航</span
        >
      </div>
    </div>
    <div class="bg-white mt-3">
      <div class="w-full text-black text-lg font-bold m-2 pt-4 pl-2">
        课程信息
      </div>

      <radio-group class="block" @change="handlePackageNo">
        <view class="cu-form-group">
          <view class="title">类型</view>
          <view>
            <span class="mx-2" v-if="packageNo == 'lesson'">按课时收费</span>
            <span class="mx-2" v-else-if="packageNo == 'month'">包月</span>
            <span class="mx-2" v-else-if="packageNo == 'quarter'">包季</span>
            <span class="mx-2" v-else-if="packageNo == 'year'">包年</span>
          </view>
        </view>
      </radio-group>
      <view v-if="packageNo == 'lesson'" class="cu-form-group margin-top flex">
        <view class="title">节数</view>
        <radio-group class="block" @change="RadioChange">
          <view @click="" class="cu-form-group margin-top">
            <view class="title">{{ pitchNumber }}节</view>
          </view>
          <!-- #ifndef MP-ALIPAY -->
          <!-- #endif -->
        </radio-group>
      </view>
    </div>

    <div class="bg-white mt-3">
      <div class="w-full text-black text-lg font-bold m-2 pt-4 pl-2">
        教练信息
      </div>
      <div
        class="lists-item flex flex-nowrap items-center content-center justify-between p-1 py-3"
      >
        <div class="w-1/6 mx-2">
          <img
            class="w-12 h-12 rounded-full"
            src="https://tse2-mm.cn.bing.net/th/id/OIP-C.UjwT5Zhsxxr4S0wmFjSuMAAAAA?w=207&h=207&c=7&r=0&o=5&pid=1.7"
            alt=""
          />
        </div>
        <div class="w-5/6 flex pl-2 flex-row items-center justify-between">
          <div class="text-box">
            <div class="title py-2">
              <h1 class="text-lg font-bold">
                {{ coach.name }}
                <!-- <text style="font-size: 25px; color:#a54aff ;"
                                    class="cuIcon-female w-10 h-10 text-2xl text-red  margin-right-xs"></text> -->

                <text
                  style="font-size: 20px; color: #16a9fa"
                  class="cuIcon-male w-10 h-10 text-2xl text-red margin-right-xs"
                ></text>
                <!-- <span class="text-xs text-[#6b7280]">（最近带课202次）</span> -->
              </h1>

              <p @click="copyPhone" class="text-[#6b7280] pt-2">
                联系：{{ coach.phone }}
                <span class="cuIcon-copy"></span>
              </p>
            </div>
          </div>
          <!-- <div class="btn justify-center pr-4 items-center h-full">
            <span
              style="font-size: 30px"
              class="cuIcon-roundcheckfill text-blue"
            ></span>
          </div> -->
        </div>
      </div>
    </div>

    <!-- <div class="bg-white mt-3">
      <div class="w-full text-black text-lg font-bold m-2 pt-4 pl-2">
        个人信息
      </div>
      <view class="cu-form-group margin-top">
        <van-field v-model="inputName" required label="姓名" placeholder="请填写真实姓名" />删掉

        <view class="title">姓名</view>
        <input v-model="inputName" placeholder="请填写真实姓名" name="input" />
      </view>
      <view class="cu-form-group">
        <view class="title">电话</view>
        <input v-model="inputPhone" placeholder="请填写联系电话" name="input" />
        <view class="cu-capsule radius">
          <view class="cu-tag bg-blue">+86</view>
          <view class="cu-tag line-blue">中国大陆</view>
        </view>
        <van-field v-model="inputName" maxlength="11" type="digit" required label="电话" placeholder="请填写联系电话" />删掉
      </view>
    </div> -->

    <div class="p-5 course-warning bg-white mt-3">
      <div class="warning-title font-extrabold tracking-widest text-lg">
        <van-icon name="warning" /> 注意事项
      </div>
      <div class="warning-content">
        <div class="warning-item">
          <van-icon name="checked" color="#666f7a" />
          <p class="item-text">请准时参加课程，迟到者请按时退费。</p>
        </div>
        <div class="warning-item">
          <van-icon name="checked" color="#666f7a" />
          <p class="item-text">请遵守教练指导，勿私自外出，保持身体健康。</p>
        </div>
        <div class="warning-item">
          <van-icon name="checked" color="#666f7a" />
          <p class="item-text">请注意休息，避免长时间坐姿不端。</p>
        </div>

        <div class="warning-item">
          <van-icon name="checked" color="#666f7a" />
          <p class="item-text">请配合教练进行锻炼，避免出现不适。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

import { getOrderDetail } from "@/api/order";
import { useRouter } from "uni-mini-router";
import dayjs from "dayjs";
const router: any = useRouter();
onMounted(async () => {
  const id = router.route.value.query.id;
  const title = router.route.value.query.title;
  const type = router.route.value.query.type;
  const count = router.route.value.query.count;
  const res = await getOrderDetail(id);
  packageNo.value = type;
  pitchNumber.value = count ? count : "0";
  coach.value = {
    name: res.data.data.CoachName,
    phone: res.data.data.phone,
  };
  courseInfo.value = {
    place: "北京市海淀区西二旗北路10号院",
    title: decodeURIComponent(title),
    price: res.data.data.Amount,
    time: dayjs(res.data.data.PaymentTime).format("YYYY-MM-DD"),
  };
  console.log(courseInfo.value, "course");
});

const pitchNumber = ref("0");
const packageNo = ref("A"); //套餐类型
const inputName = ref<string>();
const inputPhone = ref<number>();
const coach = ref({
  phone: "",
  name: "",
});
const courseInfo = ref({
  title: "",
  price: "",
  time: "",
  place: "北京市海淀区西二旗北路10号院",
});

const choosecoach = () => {
  router.push({
    name: "contact",
    params: {
      type: "coach",
    },
  });
};
const latitude = 21.2353;
const longitude = 110.4195;
const addr = "常态健身俱乐部";
const toLocation = () => {
  // 使用微信内置地图查看位置
  uni.openLocation({
    latitude: latitude, // 目的地的纬度
    longitude: longitude, // 目的地的经度
    name: addr, // 打开后显示的地址名称
    address: addr, // 地址的详细说明
    scale: 18, // 地图缩放级别，范围5-18
  });
};
const pay = () => {
  if (inputName.value && inputPhone.value) {
    uni.showToast({
      title: "支付成功",
      icon: "none",
    });
  } else {
    uni.showToast({
      title: "请填写真实姓名和联系电话",
      icon: "error",
    });
  }
};
const copyPhone = () => {
  uni.setClipboardData({
    data: "32456", // e是你要保存的内容
    success: function () {
      uni.showToast({
        title: "复制号码成功",
        icon: "none",
      });
    },
  });
};
const handlePackageNo = (e: any) => {
  console.log(packageNo.value);
  packageNo.value = e.detail.value;
};
const RadioChange = (e: any) => {
  console.log(e.detail);
};
</script>
<style>
.warning-item {
  display: flex;
  flex-wrap: nowrap;
  padding-top: 5px;

  padding-bottom: 5px;
}
</style>
