<template>
  <view>
    <van-tabs
      v-if="type != 1"
      type="card"
      :active="timeKind"
      @change="changeTimeList"
      style="
        width: 130px;
        float: right;
        font-size: small;
        height: 30px;
        line-height: 30px;
        margin-top: 20px;
      "
    >
      <van-tab title="月" name="month"></van-tab>
      <van-tab title="周" name="week"></van-tab>
      <van-tab title="日" name="day"></van-tab>
    </van-tabs>
    <van-tabs
      v-else
      type="card"
      :active="kind"
      @change="changeList"
      style="
        width: 260px;
        float: right;
        font-size: small;
        height: 30px;
        line-height: 30px;
        margin-top: 20px;
      "
    >
      <van-tab title="胸围" name="bust"></van-tab>
      <van-tab title="腰围" name="waist"></van-tab>
      <van-tab title="臀围" name="hip"></van-tab>
    </van-tabs>
    <l-echart ref="chart" @finished="init"></l-echart>
  </view>
</template>

<script setup>
import { reactive, ref, onMounted, defineProps } from "vue";
import * as echarts from "echarts/dist/echarts.esm";
import { getBodydata } from "@/api/body";
const props = defineProps({
  beginTime: String,
  endTime: String,
  // active: String,
});
const temp = ref("weight");
const timeKind = ref("month");
const kind = ref("bust");
onMounted(() => {
  uni.$on("change", (val) => {
    temp.value = val;
    changeType(val);
  });
  changeType("weight");
});
const changeList = (e) => {
  kind.value = e.detail.name;
  changeType(temp.value);
};
const changeTimeList = (e) => {
  timeKind.value = e.detail.name;
};
const changeType = (active) => {
  let Type = "";
  if (active == "three") Type = kind.value;
  else Type = active;
  const data = {
    Type,
    Count: 1000,
    StartTime: `${props.beginTime} 00:00:00`,
    EndTime: `${props.endTime} 23:59:59`,
  };
  getBodydata(data).then((res) => {
    console.log(res, "res");
  });
};
const ListX = ref([]); //表格最终要展示的数据
const ListY = ref([]); //表格最终要展示的数据
const dataSources = reactive({
  weight: [],
  height: [],
  bust: [],
  waist: [],
  hip: [],
  body_fat: [],
  bmi: [],
});
const showTip = ref(false);
const position = ref([]);
const params = ref([]);
const chart = ref(null); // 获取图表引用

//在除了三维的时候
const option = reactive({
  tooltip: {
    trigger: "axis", // 或 "axis", 根据需求选择
    formatter: (params) => {
      return `${params[0].axisValue}: ${params[0].data}`;
    },
  },
  xAxis: {
    type: "category",
    data: ListX.value,
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: ListY.value,
      type: "line",
      smooth: true,
    },
  ],
});
const init = () => {
  chart.value.init(echarts, (chartInstance) => {
    chartInstance.setOption(option);

    // 监听鼠标悬浮显示的事件
    chartInstance.on("showTip", (paramsData) => {
      showTip.value = true;
      params.value = [paramsData]; // 把当前悬浮点的数据存储起来

      // 检查 event 是否存在，再获取偏移量
      if (paramsData.event) {
        position.value = [
          paramsData.event.offsetX || 0,
          paramsData.event.offsetY || 0,
        ];
      } else {
        // 如果 event 不存在，提供默认值或处理逻辑
        position.value = [0, 0];
      }

      // console.log("showTip::", paramsData);
    });

    chartInstance.on("hideTip", () => {
      setTimeout(() => {
        showTip.value = false;
      }, 300);
    });
  });
};

const type = ref(0); //和other
const save = () => {
  chart.value.canvasToTempFilePath({
    success(res) {
      console.log("res::::", res);
    },
  });
};

onMounted(() => {
  init();
  uni.$on("changeType", (val) => {
    type.value = val;
  });
});
</script>

<style>
.customTooltips {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20rpx;
}
</style>
