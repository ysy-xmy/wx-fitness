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

        <view class="text-[#606369] text-xl font-bold">{{
          coachForm.ifFind ? "￥" + courseInfo.price : ""
        }}</view>
      </div>
      <div @click="toLocation" class="px-5 pb-5 pt-0 flex justify-between">
        <span class="mr-2">
          店铺详细地址：<span class="cuIcon-locationfill text-blue"> </span>
          广东省湛江市霞山区海滨东二路常态健身俱乐部
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

      <radio-group
        class="block"
        @change="handlePackageNo"
        style="font-size: smaller"
      >
        <div class="cu-form-group">
          <div class="title">类型</div>
          <div v-if="!ifDiy" class="flex flex-wrap w-3/5">
            <div class="flex items-center justify-end w-full">
              <span class="mx-2">按课时收费</span>
              <radio
                class="cyan"
                :class="packageNo == 'LESSON' ? 'checked' : ''"
                :checked="packageNo == 'LESSON' ? true : false"
                value="LESSON"
              ></radio>
            </div>
            <div class="flex flex-row w-full justify-end mt-2">
              <div class="flex items-center">
                <span class="mx-2">包月</span>
                <radio
                  class="cyan"
                  :class="packageNo == 'MONTH' ? 'checked' : ''"
                  :checked="packageNo == 'MONTH' ? true : false"
                  value="MONTH"
                ></radio>
              </div>
              <div class="flex items-center">
                <span class="mx-2">包季</span>
                <radio
                  class="cyan"
                  :class="packageNo == 'QUARTER' ? 'checked' : ''"
                  :checked="packageNo == 'QUARTER' ? true : false"
                  value="QUARTER"
                ></radio>
              </div>
              <div class="flex items-center">
                <span class="mx-2">包年</span>
                <radio
                  class="cyan"
                  :class="packageNo == 'YEAR' ? 'checked' : ''"
                  :checked="packageNo == 'YEAR' ? true : false"
                  value="YEAR"
                ></radio>
              </div>
            </div>
          </div>
          <div v-else>
            <span class="mx-2">按课时收费</span>
          </div>
        </div>
      </radio-group>
      <view v-if="packageNo == 'LESSON'" class="cu-form-group margin-top flex">
        <view class="title">节数</view>
        <radio-group class="block" @change="RadioChange" v-if="!ifDiy">
          <view class="cu-form-group margin-top">
            <!-- <view class="title">{{}}节</view> -->
            <view class="title">10节</view>
            <radio
              class="cyan margin-left-sm"
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
              class="cyan margin-left-sm"
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
                class="cyan margin-left-sm"
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
        :value="coachForm.ifFind ? coachForm.name : '请选择教练'"
        is-link
        to="home"
        v-if="!ifDiy"
      />

      <div
        class="lists-item flex flex-nowrap items-center content-center justify-between p-1 py-3"
        v-if="coachForm.ifFind || ifDiy"
      >
        <div class="w-1/6 mx-2">
          <img class="w-12 h-12 rounded-full" :src="coachForm.avatar" alt="" />
        </div>
        <div class="w-5/6 flex pl-2 flex-row items-center justify-between">
          <div class="text-box">
            <div class="title py-2">
              <h1 class="text-lg font-bold">
                {{ coachForm.name }}
                <text
                  style="font-size: 25px; color: #a54aff"
                  class="cuIcon-female w-10 h-10 text-2xl text-red margin-right-xs"
                  v-if="coachForm.sex == 1"
                ></text>

                <text
                  style="font-size: 20px; color: #16a9fa"
                  v-else
                  class="cuIcon-male w-10 h-10 text-2xl text-red margin-right-xs"
                ></text>
                <!-- <span class="text-xs text-[#6b7280]">（最近带课202次）</span> -->
              </h1>

              <p @click="copyPhone" class="text-[#6b7280] pt-2">
                联系：{{ coachForm.phone }}
                <span
                  class="cuIcon-copy"
                  v-if="coachForm.phone != '暂无联系方式'"
                ></span>
              </p>
            </div>
          </div>
          <div class="btn justify-center pr-4 items-center h-full">
            <span
              style="font-size: 30px"
              class="cuIcon-roundcheckfill text-cyan"
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
      <view class="text-[#e4595c] text-xl font-bold px-8">{{
        coachForm.ifFind || ifDiy ? "￥" + courseInfo.price : ""
      }}</view>

      <view class="px-4 flex justify-end">
        <button @click="pay" class="cu-btn w-28 bg-cyan round text-white">
          立即支付
        </button>
      </view>
    </view>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch, computed } from "vue";
import { getPrice } from "../apis/api";
import { useRouter } from "uni-mini-router";
import dayjs from "dayjs";
import { useAuthStore } from "@/state/modules/auth";
import { buyCourse, getPaySignature, ifCanBuy } from "../apis/pay/index";
const router = useRouter();
const AuthStore = useAuthStore();
type Data = {
  CoachID: string;
  CourseType: string;
  PaymentType: string;
  PaymentFor: string;
  PaymentTo: string;
  Remark: string;
  UserPhone: string;
  UserRealName: number;
  Amount: number;
  LessonCount?: number;
  UserID: number;
};
const computedPrice = () => {
  console.log(pitchNumber.value, "num");
  //计算价格在这
  if (!ifDiy.value) {
    if (coachForm.id != "") {
      uni.showLoading({
        title: "计算价格中~",
      });
      let data: Data = {
        CoachID: coachForm.id,
        CourseType: packageNo.value,
        PaymentType: "WECHAT",
        PaymentFor: "OTHER",
        PaymentTo: "OTHER",
        Remark: "",
        UserPhone: inputName.value || "",
        UserRealName: inputPhone.value || 0,
        Amount: Number(courseInfo.price) || 0,
      };
      if (packageNo.value == "LESSON" && pitchNumber.value)
        data.LessonCount = Number(pitchNumber.value);
      if (packageNo.value == "LESSON" && !pitchNumber.value) {
        uni.hideLoading();
        return;
      }
      getPrice(data).then((res) => {
        courseInfo.price = res.data.data.Amount;
        uni.hideLoading();
      });
    }
  }
};
onMounted(() => {
  uni.$on("chooseCoach", (val) => {
    coachForm.id = val.ID;
    coachForm.avatar = val.Avatar;
    coachForm.name = val.Username;
    coachForm.phone = val.Phome || "暂无联系方式";
    coachForm.sex = val.Sex;
    coachForm.ifFind = true;
    computedPrice();
  });
  if (router.route.value.query) {
    if (router.route.value.query.ifDiy == "true") {
      const query = router.route.value.query;
      // =query.name
      courseInfo.price = decodeURIComponent(query.price);
      coachForm.mount = decodeURIComponent(query.count);
      ifDiy.value = true;
      coachForm.avatar = decodeURIComponent(query.img);
      coachForm.phone = decodeURIComponent(query.phone);
      coachForm.name = decodeURIComponent(query.name);
      coachForm.id = decodeURIComponent(query.id);
      coachForm.sex = Number(decodeURIComponent(query.sex));
    } else {
      ifDiy.value = false;
    }
  }
  //   console.log(router.route.value.query);
});
const coachForm = reactive({
  id: "",
  phone: "",
  avatar: "",
  name: "",
  mount: "",
  sex: 0,
  ifFind: false,
});
const ifDiy = ref(false);
const pitchNumber = ref("10");
const packageNo = ref("LESSON"); //套餐类型，
const inputName = ref<string>();
const inputPhone = ref<number>();
const courseInfo = reactive({
  title: "私教课",
  price: "0",
  time: dayjs().format("YYYY-MM-DD"),
  place: "北京市海淀区西二旗北路10号院",
});

const choosecoach = () => {
  router.push({
    path: "/subpackages/coachcontact/index?ifChoose=true",
  });
};

const latitude = 21.2353;
const longitude = 110.4195;
const addr = "常态健身俱乐部";
const toLocation = () => {
  // 使用微信置地图查看位置
  uni.openLocation({
    latitude: latitude, // 目的地的纬度
    longitude: longitude, // 目的地的经度
    name: addr, // 打开后显示的地址名称
    address: addr, // 地址的详细说明
    scale: 18, // 地图缩放级别，范围5-18
  });
};
const pay = async () => {
  try {
    // 验证教练是否已选择
    if (!coachForm.ifFind) {
      uni.showToast({
        title: "请先选择教练",
        icon: "error",
      });
      return;
    }

    // 验证个人信息
    if (!inputName.value || !inputPhone.value) {
      uni.showToast({
        title: "请填写真实姓名和联系电话",
        icon: "error",
      });
      return;
    }

    // 准备请求数据
    const data: Data = {
      CoachID: coachForm.id,
      CourseType: packageNo.value,
      PaymentType: "WECHAT",
      PaymentFor: "OTHER",
      PaymentTo: "OTHER",
      Remark: "",
      UserPhone: inputName.value,
      UserRealName: inputPhone.value,
      Amount: Number(courseInfo.price),
      UserID: AuthStore.user.id,
    };
    console.log(data, "123", AuthStore.user);
    if (packageNo.value === "LESSON") {
      data.LessonCount = Number(pitchNumber.value);
    }

    // 获取支付签名
    const signatureRes = await getPaySignature(data);
    const paymentData = signatureRes.data.data;

    // 发起支付
    uni.requestPayment({
      provider: "wxpay",
      timeStamp: paymentData.TimeStamp,
      nonceStr: paymentData.NonceStr,
      package: paymentData.Package,
      signType: paymentData.SignType,
      paySign: paymentData.Sign,
      success: async () => {
        try {
          const buyResponse = await buyCourse(data);
          if (buyResponse.data.code === 200) {
            uni.$emit("alreadyBuy");
            uni.showToast({
              title: "购买成功",
              icon: "success",
            });
            setTimeout(() => {
              router.push({ name: "home" });
            }, 2000);
          } else {
            uni.showToast({
              title: buyResponse.data.msg,
              icon: "error",
            });
          }
        } catch (err) {
          uni.showToast({
            title: "购买失败!请联系工作人员",
            icon: "error",
          });
        }
      },
      fail: (err) => {
        console.log("支付失败:", err);
        uni.showToast({
          title: "支付已取消",
          icon: "none",
        });
      },
    });
  } catch (error) {
    console.error("支付过程出错:", error);
    uni.showToast({
      title: "支付异常，请稍后重试",
      icon: "error",
    });
  }
};

const copyPhone = () => {
  uni.setClipboardData({
    data: "32456", // e是你保存的内容
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
  computedPrice();
};
const RadioChange = (e: any) => {
  pitchNumber.value = e.detail.value;
  computedPrice();
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
