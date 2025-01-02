<template>
  <div class="main-container relative h-screen">
    <scroll-view scroll-x class="bg-white nav">
      <view class="flex text-center">
        <view
          class="cu-item flex-sub"
          :class="index == TabCur ? 'text-[#FF5E3A] cur' : ''"
          v-for="(item, index) in TabList"
          :key="index"
          @tap="tabSelect"
          :data-id="index"
        >
          {{ item.title }}
        </view>
      </view>
    </scroll-view>
    <div
      style="
        display: flex;
        width: 100vw;
        justify-content: space-evenly;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 20px;
      "
    >
      <picker
        mode="date"
        :value="beginTime"
        @change="DateBeginChange"
        :end="today"
        style="
          background: #f2f6ff;
          border-radius: 10px 10px 10px 10px;
          font-size: 15px;
          color: #8190a7;
          line-height: 17px;
          width: 115px;
          height: 17px;
          text-align: center;
          font-style: normal;
          text-transform: none;
        "
      >
        <view class="picker">
          {{ beginTime }}
        </view>
      </picker>
      <div style="width: 71px; height: 6px; background-color: #8190a7"></div>
      <picker
        mode="date"
        :value="endTime"
        @change="DateEndChange"
        :end="today"
        style="
          background: #f2f6ff;
          width: 115px;
          height: 17px;
          border-radius: 10px 10px 10px 10px;
          font-size: 15px;
          color: #8190a7;
          line-height: 17px;
          text-align: center;
          font-style: normal;
          text-transform: none;
        "
      >
        <view class="picker">
          {{ endTime }}
        </view>
      </picker>
    </div>
    <!-- 其他普通数据 -->
    <div
      class="flex flex-col gap-[5px] absolute w-screen z-10 bottom-[50px] mt-[5px]"
      v-if="typeVal != 1"
    >
      <!-- 上面卡片 -->
      <div class="w-[90%] h-[100px] bg-[#f2f6ff] mx-auto rounded-[20px] p-4">
        <div class="flex card-top mb-2">
          <span class="text-[#6D819C] text-[17px] font-bold"
            >更新于: {{ dataList.timeMonth }} 月 {{ dataList.timeDay }} 日,
            {{ dataList.beginYear }}</span
          >
        </div>

        <div class="flex items-center">
          <span class="text-[#6D819C] text-[17px] font-bold mr-5">{{
            dataList.type
          }}</span>
          <span class="text-black text-[20px]">{{ dataList.data }}</span>
        </div>
      </div>

      <!-- 下面卡片 -->
      <div class="w-[90%] h-[100px] bg-[#f2f6ff] mx-auto rounded-[20px] p-4">
        <div class="flex justify-between">
          <div class="flex-2">
            <span class="text-[#6D819C] text-[17px] font-bold block mb-2"
              >{{ dataList.sententce }}{{ dataList.beginMonth }} 月
              {{ dataList.beginDay }} 日，{{ dataList.beginYear }}</span
            >
            <span class="text-black text-[20px]">{{ dataList.beginData }}</span>
          </div>
          <div class="flex-1 text-right">
            <span class="text-[#6D819C] text-[17px] font-bold block mb-2"
              >变化</span
            >
            <span class="text-[#FF8D1A] text-[20px]">{{
              dataList.change
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <van-button
      v-if="typeVal != 1"
      @click="showModal"
      size="large"
      type="primary"
      round
      class="btn-gradient w-[100px] h-[40px]"
      color="linear-gradient(90deg, #FF6243 0%, #FF0072 100%)"
    >
      <span>添 加</span>
    </van-button> -->
    <!-- 三维的数据 -->
    <div class="add-card absolute pt-8 z-10 bottom-[50px] w-screen" v-else>
      <!-- 上卡片 -->
      <div
        class="bg-[#f2f6ff] rounded-lg shadow-sm mb-[5px] p-4 h-[100px] w-[90%] mx-auto"
      >
        <div class="flex card-top mb-1">
          <span class="text-[#6D819C] text-[14px]"
            >更新于: {{ dimensionalData.timeMonth }} 月
            {{ dimensionalData.timeDay }} 日,
            {{ dimensionalData.beginYear }}</span
          >
        </div>

        <div class="card-content py-[8px] flex items-center">
          <div class="mr-5">
            <p class="text-[#6D819C] text-[15px] mr-5 mb-1">
              <span class="text-[#44DB5E] text-[15px] mr-2 font-bold">·</span
              >胸围
            </p>
            <p class="text-[#282C37] text-[20px] tracking-wide">
              {{ dimensionalData.timeBust }}
            </p>
          </div>
          <div class="mr-5">
            <p class="text-[#6D819C] text-[15px] mr-5 mb-1">
              <span class="text-[#FF5E3A] text-[15px] mr-2 font-bold">·</span
              >腰围
            </p>
            <p class="text-[#282C37] text-[20px] tracking-wide">
              {{ dimensionalData.timeWaistline }}
            </p>
          </div>
          <div class="mr-5">
            <p class="text-[#6D819C] text-[15px] mr-5 mb-1">
              <span class="text-[#5856D6] text-[15px] mr-2 font-bold">·</span
              >臀围
            </p>
            <p class="text-[#282C37] text-[20px] tracking-wide">
              {{ dimensionalData.timeHips }}
            </p>
          </div>
        </div>
      </div>

      <!-- 下卡片 -->
      <div
        class="bg-[#f2f6ff] rounded-lg shadow-sm p-4 h-[100px] w-[90%] mx-auto"
      >
        <div class="left-box flex-col flex mb-1">
          <span class="text-[#6D819C] text-[14px]"
            >初始数据{{ dimensionalData.beginMonth }} 月
            {{ dimensionalData.beginDay }} 日，{{
              dimensionalData.beginYear
            }}</span
          >
        </div>
        <div class="card-content py-[8px] flex items-center">
          <div class="mr-5">
            <p class="text-[#6D819C] text-[15px] mr-5 mb-1">
              <span class="text-[#44DB5E] text-[15px] mr-2 font-bold">·</span
              >胸围
            </p>
            <p class="text-[#282C37] text-[20px] tracking-wide">
              {{ dimensionalData.beginBust }}
            </p>
          </div>
          <div class="mr-5">
            <p class="text-[#6D819C] text-[15px] mr-5 mb-1">
              <span class="text-[#FF5E3A] text-[15px] mr-2 font-bold">·</span
              >腰围
            </p>
            <p class="text-[#282C37] text-[20px] tracking-wide">
              {{ dimensionalData.beginWaistline }}
            </p>
          </div>
          <div class="mr-5">
            <p class="text-[#6D819C] text-[15px] mr-5 mb-1">
              <span class="text-[#5856D6] text-[15px] mr-2 font-bold">·</span
              >臀围
            </p>
            <p class="text-[#282C37] text-[20px] tracking-wide">
              {{ dimensionalData.beginHips }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <echart :endTime="endTime" :beginTime="beginTime" />
    <button
      @click="showModal"
      style="
        width: 105px;
        height: 36px;
        line-height: 36px;
        font-size: 20px;
        position: absolute;
        bottom: 10px;
        right: 50px;
        background-color: #5adade;
        color: white;
        float: right;
        border-radius: 20px;
      "
    >
      <span>添 加</span>
    </button>
  </div>

  <view class="cu-modal bottom-modal" :class="show ? 'show' : ''">
    <view class="cu-dialog">
      <view class="cu-bar px-4 bg-white flex justify-between">
        <div class="text-[14px] text-[#282C37]">添加记录</div>
        <view
          style="font-size: 25px"
          class="action cuIcon-close text-[#ff5e3a] text-[20px]"
          @tap="hideModal"
        >
        </view>
      </view>

      <view class="pb-8">
        <van-cell-group class="w-screen" inset>
          <!-- 添加体重记录 -->
          <div v-if="typeVal == 0">
            <view class="cu-form-group margin-top">
              <view class="title">体重</view>
              <input
                class="text-right"
                v-model="addData.WEIGHT"
                placeholder="请输入体重(kg)"
                name="input"
              />
              <span>kg</span>
            </view>
            <div class="mt-4"></div>
            <!-- <view class="cu-form-group">
              <view class="title">日期选择</view>
              <picker
                mode="date"
                :value="date"
                :end="today"
                @change="DateChange"
              >
                <view class="picker">
                  {{ date }}
                </view>
              </picker>
            </view> -->
          </div>
          <!-- 添加三维 -->
          <div v-if="typeVal == 1">
            <view class="cu-form-group margin-top">
              <view class="title">胸围</view>
              <input
                class="text-right"
                v-model="addData.BUST"
                placeholder="请输入胸围(cm)"
                name="input"
              />
              <span>cm</span>
            </view>
            <view class="cu-form-group margin-top">
              <view class="title">腰围</view>
              <input
                class="text-right"
                v-model="addData.WAIST"
                placeholder="请输入腰围(cm)"
                name="input"
              />
              <span>cm</span>
            </view>
            <view class="cu-form-group margin-top">
              <view class="title">臀围</view>
              <input
                class="text-right"
                v-model="addData.HIP"
                placeholder="请输入臀围(cm)"
                name="input"
              />
              <span>cm</span>
            </view>
            <div class="mt-4"></div>
            <!-- <view class="cu-form-group">
              <view class="title">日期</view>
              <picker
                mode="date"
                :value="date"
                @change="DateChange"
                :end="today"
              >
                <view class="picker">
                  {{ date }}
                </view>
              </picker>
            </view> -->
          </div>
          <!-- 添加体脂率 -->
          <div v-if="typeVal == 2">
            <view class="cu-form-group margin-top">
              <view class="title">体脂率</view>
              <input
                class="text-right"
                v-model="addData.BODY_FAT"
                placeholder="请添加体脂率(%)"
                name="input"
              />
              <span>%</span>
            </view>
            <div class="mt-4"></div>
            <!-- <view class="cu-form-group">
              <view class="title">日期</view>
              <picker
                mode="date"
                :value="date"
                @change="DateChange"
                :end="today"
              >
                <view class="picker">
                  {{ date }}
                </view>
              </picker>
            </view> -->
          </div>
          <!-- 添加BMI -->
          <div v-if="typeVal == 3">
            <view class="cu-form-group margin-top">
              <view class="title">BMI</view>
              <input
                class="text-right"
                v-model="addData.BMI"
                placeholder="请添加BMI(kg/m²)"
                name="input"
              />
              <span>kg/m²</span>
            </view>
            <div class="mt-4"></div>
            <!-- <view class="cu-form-group">
              <view class="title">日期</view>
              <picker mode="date" :value="date" @change="DateChange">
                <view class="picker">
                  {{ date }}
                </view>
              </picker>
            </view> -->
          </div>
          <div class="mt-4"></div>
          <van-button
            @click="addNewData"
            size="large"
            type="primary"
            round
            class="btn-gradient mt-5"
            color="linear-gradient(90deg, #3ed2de 0%, #5aa6f4 100%)"
          >
            <span>添 加</span>
          </van-button>
        </van-cell-group>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import echart from "@/components/lime-echart/lime-echart.vue";
// 引入echarts
import { onMounted, reactive, ref } from "vue";
import { useAppStore } from "../../state/app";
import { addBodydata } from "@/api/body";
import dayjs from "dayjs";

const beginTime = ref(dayjs().subtract(1, "year").format("YYYY-MM-DD"));
const endTime = ref(dayjs().format("YYYY-MM-DD"));
const show = ref(false);
const TabCur = ref(0);
const weight = ref("");
// const date = ref('2024-09-01')
const today = dayjs().format("YYYY-MM-DD"); //今天日期
onMounted(() => {
  uni.$on("changeBotData", (val) => {
    if (typeVal.value != 1) {
      const TO = val.oldTime.split("-");
      const TN = val.newTime.split("-");
      dataList.value = {
        timeYear: TN[0],
        timeMonth: TN[1],
        timeDay: TN[2],
        type: typeList[typeVal.value],
        data: val.newVal + unitList[typeVal.value],
        sententce: `初始${typeList[typeVal.value]}`,
        beginMonth: TO[1],
        beginDay: TO[2],
        beginYear: TO[0],
        beginData: val.oldVal + unitList[typeVal.value],
        change: `${Number(val.newVal) - Number(val.oldVal)}${unitList[typeVal.value]}`,
      };
    } else {
      const TO = val.old.time.split("-");
      const TN = val.new.time.split("-");
      //三维的情况
      dimensionalData.value = {
        timeYear: TN[0],
        timeMonth: TN[1],
        timeDay: TN[2],
        timeBust: val.new.BUST, //胸围
        timeWaistline: val.new.WAIST, //腰围
        timeHips: val.new.HIP, //臀围
        beginMonth: TO[1],
        beginDay: TO[2],
        beginYear: TO[0],
        beginBust: val.old.BUST, //胸围
        beginWaistline: val.old.WAIST, //腰围
        beginHips: val.old.HIP, //臀围
      };
    }
  });
});
const DateBeginChange = (e: any) => {
  beginTime.value = e.detail.value;
  uni.$emit("changeTime", true);
};
const DateEndChange = (e: any) => {
  endTime.value = e.detail.value;
  uni.$emit("changeTime", true);
};
const appStore = useAppStore();
const date = ref(appStore.getCurrentDate);
const DateChange = (e: any) => {
  date.value = e.detail.value;
};
const TabList = [
  {
    title: "体重",
    content: "weight",
  },
  {
    title: "三围",
    content: "three",
  },
  {
    title: "体脂率",
    content: "body_fat",
  },
  {
    title: "BMI",
    content: "bmi",
  },
];
function tabSelect(e: any) {
  const id = e.currentTarget.dataset.id;
  TabCur.value = parseInt(id);
  temp.value = TabList[TabCur.value]["content"];
  uni.$emit("change", temp.value);
  typeVal.value = id;

  uni.$emit("changeType", id);
}
function showModal() {
  show.value = true;
}
function hideModal() {
  show.value = false;
}
const typeVal = ref(0);
const temp = ref(TabList[TabCur.value]["content"]); //临时储存一下content
const typeList = ["体重", "三维", "体脂率", "BMI"];
const enTypeList = ["WEIGHT", "THREE", "BODY_FAT", "BMI"];
const unitList = ["KG", "cm", "%", "kg/m²"];
let dataList = ref({
  timeYear: "",
  timeMonth: "",
  timeDay: "",
  type: typeList[typeVal.value],
  data: "",
  sententce: `初始${typeList[typeVal.value]}`,
  beginMonth: "",
  beginDay: "",
  beginYear: "",
  beginData: "",
  change: "",
});
let dimensionalData = ref({
  timeYear: "",
  timeMonth: "",
  timeDay: "",
  timeBust: "", //胸围
  timeWaistline: "", //腰围
  timeHips: "", //臀围
  beginMonth: "",
  beginDay: "",
  beginYear: "",
  beginBust: "", //胸围
  beginWaistline: "", //腰围
  beginHips: "", //臀围
});
let addData = reactive({
  WEIGHT: "",
  BUST: "",
  WAIST: "",
  HIP: "",
  BODY_FAT: "",
  BMI: "",
});
const addNewData = async () => {
  uni.showLoading();
  if (typeVal.value != 1) {
    //不是三维
    let data = {
      Type: enTypeList[typeVal.value],
      Value: Number(addData[enTypeList[typeVal.value]]),
    };
    addBodydata(data)
      .then((res) => {
        uni.hideLoading();
        if (res.data.code == 200) {
          uni.showToast({
            title: "增加成功",
            icon: "success",
          });
          uni.$emit("changeTime", true);
          show.value = false;
          addData = {
            WEIGHT: "",
            BUST: "",
            WAIST: "",
            HIP: "",
            BODY_FAT: "", //存疑
            BMI: "",
          };
        } else {
          uni.showToast({
            title: "增加失败",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        uni.hideLoading();
        uni.showToast({
          title: "增加失败",
          icon: "error",
        });
      });
  } else {
    let data1 = {
      Type: "BUST",
      Value: Number(addData["BUST"]),
    };
    let data2 = {
      Type: "WAIST",
      Value: Number(addData["WAIST"]),
    };
    let data3 = {
      Type: "HIP",
      Value: Number(addData["HIP"]),
    };

    const responses = await Promise.all([
      addBodydata(data1),
      addBodydata(data2),
      addBodydata(data3),
    ]);

    uni.hideLoading();
    const allSuccess = responses.every((res) => res.data.code === 200);
    if (allSuccess) {
      uni.showToast({
        title: "增加成功",
        icon: "success",
      });
      uni.$emit("changeTime", true);
      show.value = false;
      addData = {
        WEIGHT: "",
        BUST: "",
        WAIST: "",
        HIP: "",
        BODY_FAT: "", //存疑
        BMI: "",
      };
    } else {
      uni.showToast({
        title: "增加失败",
        icon: "error",
      });
    }
  }
};
</script>
<style lang="scss" scoped>
:deep(.cur) {
  // background-color: blue !important;
  background: #5bd0e1;
  border-radius: 10px;
  color: white;
  border: 0;
}
</style>
