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
      class="add-card bg-[#f2f6ff] h-52 absolute w-screen pt-8 z-10 bottom-0"
      v-if="typeVal != 1"
    >
      <div class="flex card-top">
        <span class="text-[#6D819C] text-[14px] px-[20px]"
          >更新于: {{ dataList.timeMonth }} 月 {{ dataList.timeDay }} 日,
          {{ dataList.beginYear }}</span
        >
      </div>

      <div class="flex card-content px-[20px] py-[10px] items-center">
        <span class="text-[#6D819C] text-[14px] mr-5">{{ dataList.type }}</span
        ><span class="text-[#282C37] text-[36px] tracking-wide font-bold">{{
          dataList.data
        }}</span>
      </div>

      <div class="flex card-bottom px-[20px] py-[10px]">
        <div class="left-box flex-col flex">
          <span class="text-[#6D819C] text-[14px] mr-5 mb-1"
            >{{ dataList.sententce }}{{ dataList.beginMonth }} 月
            {{ dataList.beginDay }} 日，{{ dataList.beginYear }}</span
          >
          <span class="text-[#282C37] text-[24px] tracking-wide">{{
            dataList.beginData
          }}</span>
        </div>
        <div class="right-box flex-col flex items-center">
          <span class="text-[#6D819C] text-[14px] mr-5 mb-1">变化</span>
          <span class="text-[#FF8D1A] text-[36px] tracking-wide">{{
            dataList.change
          }}</span>
        </div>
      </div>

      <van-button
        @click="showModal"
        size="large"
        type="primary"
        round
        class="btn-gradient absolute top-10 right-10 w-[100px] h-[40px]"
        color="linear-gradient(90deg, #FF6243 0%, #FF0072 100%)"
      >
        <span>添 加</span>
      </van-button>
    </div>
    <div
      class="add-card bg-[#f2f6ff] h-52 absolute w-screen pt-8 z-10 bottom-0"
      v-else
    >
      <div class="flex card-top">
        <span class="text-[#6D819C] text-[14px] px-[20px]"
          >更新于: {{ dimensionalData.timeMonth }} 月
          {{ dimensionalData.timeDay }} 日,
          {{ dimensionalData.beginYear }}</span
        >
      </div>

      <div class="card-content px-[20px] py-[10px] items-center flex">
        <div class="mr-5">
          <p class="text-[#6D819C] text-[15px] mr-5">
            <span class="text-[#44DB5E] text-[15px] mr-2 font-bold">·</span>胸围
          </p>
          <p class="text-[#282C37] text-[23px] tracking-wide font-bold">
            {{ dimensionalData.timeBust }}
          </p>
        </div>
        <div class="mr-5">
          <p class="text-[#6D819C] text-[15px] mr-5">
            <span class="text-[#FF5E3A] text-[15px] mr-2 font-bold">·</span>腰围
          </p>
          <p class="text-[#282C37] text-[23px] tracking-wide font-bold">
            {{ dimensionalData.timeWaistline }}
          </p>
        </div>
        <div class="mr-5">
          <p class="text-[#6D819C] text-[15px] mr-5">
            <span class="text-[#5856D6] text-[15px] mr-2 font-bold">·</span>臀围
          </p>
          <p class="text-[#282C37] text-[23px] tracking-wide font-bold">
            {{ dimensionalData.timeHips }}
          </p>
        </div>
      </div>
      <div class="left-box flex-col flex px-[20px]">
        <span class="text-[#6D819C] text-[14px] mr-5 mb-1"
          >初始数据{{ dimensionalData.beginMonth }} 月
          {{ dimensionalData.beginDay }} 日，{{
            dimensionalData.beginYear
          }}</span
        >
      </div>
      <div class="card-content px-[20px] py-[10px] items-center flex">
        <div class="mr-5">
          <p class="text-[#6D819C] text-[15px] mr-5">
            <span class="text-[#44DB5E] text-[15px] mr-2 font-bold">·</span>胸围
          </p>
          <p class="text-[#282C37] text-[23px] tracking-wide font-bold">
            {{ dimensionalData.beginBust }}
          </p>
        </div>
        <div class="mr-5">
          <p class="text-[#6D819C] text-[15px] mr-5">
            <span class="text-[#FF5E3A] text-[15px] mr-2 font-bold">·</span>腰围
          </p>
          <p class="text-[#282C37] text-[23px] tracking-wide font-bold">
            {{ dimensionalData.beginWaistline }}
          </p>
        </div>
        <div class="mr-5">
          <p class="text-[#6D819C] text-[15px] mr-5">
            <span class="text-[#5856D6] text-[15px] mr-2 font-bold">·</span>臀围
          </p>
          <p class="text-[#282C37] text-[23px] tracking-wide font-bold">
            {{ dimensionalData.beginHips }}
          </p>
        </div>
      </div>
      <van-button
        @click="showModal"
        size="large"
        type="primary"
        round
        class="btn-gradient absolute top-10 right-10 w-[100px] h-[40px]"
        color="linear-gradient(90deg, #FF6243 0%, #FF0072 100%)"
      >
        <span>添 加</span>
      </van-button>
    </div>
    <echart />
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
                v-model="addData.weight"
                placeholder="请输入体重(kg)"
                name="input"
              />
              <span>kg</span>
            </view>
            <div class="mt-4"></div>
            <view class="cu-form-group">
              <view class="title">日期选择</view>
              <picker
                mode="date"
                :value="addData.time"
                start="2015-09-01"
                end="2020-09-01"
                @change="DateChange"
              >
                <view class="picker">
                  {{ addData.time }}
                </view>
              </picker>
            </view>
          </div>
          <!-- 添加三维 -->
          <div v-if="typeVal == 1">
            <view class="cu-form-group margin-top">
              <view class="title">胸围</view>
              <input
                class="text-right"
                v-model="addData.Bust"
                placeholder="请输入胸围(cm)"
                name="input"
              />
              <span>cm</span>
            </view>
            <view class="cu-form-group margin-top">
              <view class="title">腰围</view>
              <input
                class="text-right"
                v-model="addData.Bust"
                placeholder="请输入腰围(cm)"
                name="input"
              />
              <span>cm</span>
            </view>
            <view class="cu-form-group margin-top">
              <view class="title">臀围</view>
              <input
                class="text-right"
                v-model="addData.Bust"
                placeholder="请输入臀围(cm)"
                name="input"
              />
              <span>cm</span>
            </view>
            <div class="mt-4"></div>
            <view class="cu-form-group">
              <view class="title">日期</view>
              <picker
                mode="addData.time"
                :value="addData.time"
                @change="DateChange"
              >
                <view class="picker">
                  {{ addData.time }}
                </view>
              </picker>
            </view>
          </div>
          <!-- 添加体脂率 -->
          <div v-if="typeVal == 2">
            <view class="cu-form-group margin-top">
              <view class="title">体脂率</view>
              <input
                class="text-right"
                v-model="addData.bodyFatPercentage"
                placeholder="请添加体脂率(%)"
                name="input"
              />
              <span>%</span>
            </view>
            <div class="mt-4"></div>
            <view class="cu-form-group">
              <view class="title">日期</view>
              <picker
                mode="addData.time"
                :value="addData.time"
                @change="DateChange"
              >
                <view class="picker">
                  {{ addData.time }}
                </view>
              </picker>
            </view>
          </div>
          <!-- 添加BMI -->
          <div v-if="typeVal == 3">
            <view class="cu-form-group margin-top">
              <view class="title">BMI</view>
              <input
                class="text-right"
                v-model="weight"
                placeholder="请添加BMI(kg/m²)"
                name="input"
              />
              <span>kg/m²</span>
            </view>
            <div class="mt-4"></div>
            <view class="cu-form-group">
              <view class="title">日期</view>
              <picker
                mode="addData.time"
                :value="addData.time"
                @change="DateChange"
              >
                <view class="picker">
                  {{ addData.time }}
                </view>
              </picker>
            </view>
          </div>
          <!-- 添加基础代谢 -->
          <div v-if="typeVal == 4">
            <view class="cu-form-group margin-top">
              <view class="title">BMI</view>
              <input
                class="text-right"
                v-model="weight"
                placeholder="请添加基础代谢"
                name="input"
              />
              <span></span>
            </view>
            <div class="mt-4"></div>
            <view class="cu-form-group">
              <view class="title">日期</view>
              <picker
                mode="addData.time"
                :value="addData.time"
                @change="DateChange"
              >
                <view class="picker">
                  {{ addData.time }}
                </view>
              </picker>
            </view>
          </div>
          <div class="mt-4"></div>
          <van-button
            @click="showModal"
            size="large"
            type="primary"
            round
            class="btn-gradient mt-5"
            color="linear-gradient(90deg, #FF6243 0%, #FF0072 100%)"
          >
            <span>添 加</span>
          </van-button>
        </van-cell-group>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
// 引入echarts
import { reactive, ref } from "vue";
import { useAppStore } from "../../state/app";
import echart from "@/components/echart/try.vue";
const show = ref(false);
const TabCur = ref(0);
const weight = ref("");
// const date = ref('2024-09-01')
const appStore = useAppStore();
const date = ref(appStore.getCurrentDate);
const DateChange = (e: any) => {
  date.value = e.detail.value;
};
const TabList = [
  {
    title: "体重",
    content: "Content1",
  },
  {
    title: "三围",
    content: "Content2",
  },
  {
    title: "体脂率",
    content: "Content3",
  },
  {
    title: "BMI",
    content: "Content4",
  },
  {
    title: "基础代谢",
    content: "Content5",
  },
];
function tabSelect(e: any) {
  const id = e.currentTarget.dataset.id;
  TabCur.value = parseInt(id);
  typeVal.value = id;
  if (id != 1) {
    dataList = {
      timeYear: 2024,
      timeMonth: 7,
      timeDay: 1,
      type: typeList[typeVal.value],
      data: "70Kg",
      sententce: `初始${typeList[typeVal.value]}`,
      beginMonth: 3,
      beginDay: 1,
      beginYear: 2024,
      beginData: "70kg",
      change: "-70kg",
    };
  }
  uni.$emit("changeType", id);
}
function showModal() {
  show.value = true;
}
function hideModal() {
  show.value = false;
}
const typeVal = ref(0);
const typeList = ["体重", "三维", "体脂率", "BMI", "基础代谢"];
let dataList = reactive({
  timeYear: 2024,
  timeMonth: 7,
  timeDay: 1,
  type: typeList[typeVal.value],
  data: "70Kg",
  sententce: `初始${typeList[typeVal.value]}`,
  beginMonth: 3,
  beginDay: 1,
  beginYear: 2024,
  beginData: "70kg",
  change: "-70kg",
});
let dimensionalData = reactive({
  timeYear: 2024,
  timeMonth: 7,
  timeDay: 1,
  timeBust: "108cm", //胸围
  timeWaistline: "78cm", //腰围
  timeHips: "105cm", //臀围
  beginMonth: 3,
  beginDay: 1,
  beginYear: 2024,
  beginBust: "108cm", //胸围
  beginWaistline: "78cm", //腰围
  beginHips: "105cm", //臀围
});
let addData = reactive({
  time: "",
  weight: "",
  Bust: "",
  Waistline: "",
  Hips: "",
  bodyFatPercentage: "",
  BMI: "",
  basalMetabolism: "",
});
</script>
