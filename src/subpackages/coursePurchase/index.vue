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
          <view v-if="!ifDiy">
            <span class="mx-2">按课时收费</span>

            <radio
              class="red"
              :class="packageNo == 'A' ? 'checked' : ''"
              :checked="packageNo == 'A' ? true : false"
              value="A"
            ></radio>
            <span class="mx-2">包月</span>

            <radio
              class="red"
              :class="packageNo == 'B' ? 'checked' : ''"
              :checked="packageNo == 'B' ? true : false"
              value="B"
            ></radio>
          </view>
          <view v-else><span class="mx-2">按课时收费</span> </view>
        </view>
      </radio-group>
      <view v-if="packageNo == 'A'" class="cu-form-group margin-top flex">
        <view class="title">节数</view>
        <radio-group class="block" @change="RadioChange" v-if="!ifDiy">
          <view @click="" class="cu-form-group margin-top">
            <!-- <view class="title">{{}}节</view> -->
            <view class="title">10节</view>
            <radio
              class="red margin-left-sm"
              :class="pitchNumber == '10' ? 'checked' : ''"
              :checked="pitchNumber == '10' ? true : false"
              value="10"
            >
            </radio>
          </view>
          <!-- #ifndef MP-ALIPAY -->
          <view class="cu-form-group">
            <view class="title">15节</view>
            <radio
              class="red margin-left-sm"
              :class="pitchNumber == '15' ? 'checked' : ''"
              :checked="pitchNumber == '15' ? true : false"
              value="15"
            ></radio>
          </view>
          <view class="cu-form-group">
            <view class="title">25节</view>
            <view>
              <!-- <radio class='blue radio' :class="radio == 'C' ? 'checked' : ''"
                                :checked="radio == 'C' ? true : false" value="C"></radio> -->
              <radio
                class="red margin-left-sm"
                :class="pitchNumber == '25' ? 'checked' : ''"
                :checked="pitchNumber == '25' ? true : false"
                value="25"
              ></radio>
            </view>
          </view>
          <!-- #endif -->
        </radio-group>
        <view class="title" v-else>{{ coachForm.mount }}节</view>
      </view>
    </div>

    <div class="bg-white mt-3">
      <div class="w-full text-black text-lg font-bold m-2 pt-4 pl-2">
        教练信息
      </div>

      <van-cell
        @click="choosecoach"
        title="选择教练"
        value="由系统指定"
        is-link
        to="home"
        v-if="!ifDiy"
      />

      <div
        class="lists-item flex flex-nowrap items-center content-center justify-between p-1 py-3"
      >
        <div class="w-1/6 mx-2">
          <img class="w-12 h-12 rounded-full" :src="coachForm.avatar" alt="" />
        </div>
        <div class="w-5/6 flex pl-2 flex-row items-center justify-between">
          <div class="text-box">
            <div class="title py-2">
              <h1 class="text-lg font-bold">
                {{ coachForm.name }}
                <!-- <text style="font-size: 25px; color:#a54aff ;"
                                    class="cuIcon-female w-10 h-10 text-2xl text-red  margin-right-xs"></text> -->

                <text
                  style="font-size: 20px; color: #16a9fa"
                  class="cuIcon-male w-10 h-10 text-2xl text-red margin-right-xs"
                ></text>
                <!-- <span class="text-xs text-[#6b7280]">（最近带课202次）</span> -->
              </h1>

              <p @click="copyPhone" class="text-[#6b7280] pt-2">
                联系：{{ coachForm.phone }}
                <span class="cuIcon-copy"></span>
              </p>
            </div>
          </div>
          <div class="btn justify-center pr-4 items-center h-full">
            <span
              style="font-size: 30px"
              class="cuIcon-roundcheckfill text-blue"
            ></span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white mt-3">
      <div class="w-full text-black text-lg font-bold m-2 pt-4 pl-2">
        个人信息
      </div>
      <view class="cu-form-group margin-top">
        <!-- <van-field v-model="inputName" required label="姓名" placeholder="请填写真实姓名" /> -->

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
        <!-- <van-field v-model="inputName" maxlength="11" type="digit" required label="电话" placeholder="请填写联系电话" /> -->
      </view>
    </div>

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

    <view class="cu-bar bg-white tabbar flex justify-between shop foot">
      <view class="text-[#e4595c] text-xl font-bold px-8"
        >￥{{ courseInfo.price }}</view
      >

      <view class="px-4 flex justify-end">
        <button @click="pay" class="cu-btn w-28 bg-[#ec6853] round text-white">
          立即支付
        </button>
      </view>
    </view>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "uni-mini-router";
const router = useRouter();
onMounted(() => {
  if (router.route.value.query) {
    const query = router.route.value.query;
    // =query.name
    courseInfo.title = decodeURIComponent(query.name) + "的私教课";
    courseInfo.price = decodeURIComponent(query.price);
    coachForm.mount = decodeURIComponent(query.count);
    ifDiy.value = query.ifDiy;
    coachForm.avatar = decodeURIComponent(query.img);
    coachForm.phone = decodeURIComponent(query.phone);
    coachForm.name = decodeURIComponent(query.name);
  }
  //   console.log(router.route.value.query);
});
const coachForm = reactive({ phone: "", avatar: "", name: "", mount: "" });
const ifDiy = ref(false);
const pitchNumber = ref("10");
const packageNo = ref("A"); //套餐类型，A是按课时收费，B是按包月
const inputName = ref<string>();
const inputPhone = ref<number>();
const courseInfo = reactive({
  title: "私教课",
  price: "1990.0",
  time: "2022-05-10 >10:00-12:00",
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
