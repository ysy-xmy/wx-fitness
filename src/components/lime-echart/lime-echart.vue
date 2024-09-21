<template>
  <view>
	  <van-tabs v-if="type!=1" type="card" style="width: 130px;float: right;font-size: small;height: 30px;line-height: 30px;margin-top: 20px;">
	    <van-tab title="周"></van-tab>
	    <van-tab title="月"></van-tab>
	    <van-tab title="日"></van-tab>
	  </van-tabs>
	  <van-tabs v-else type="card" style="width: 130px;float: right;font-size: small;height: 30px;line-height: 30px;margin-top: 20px;">
	    <van-tab title="全部"></van-tab>
	    <van-tab title="胸围"></van-tab>
	    <van-tab title="腰围"></van-tab>
	    <van-tab title="臀围"></van-tab>
	  </van-tabs>
    <l-echart ref="chart" @finished="init"></l-echart>
  </view>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import * as echarts from "echarts/dist/echarts.esm";

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
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
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

const type=ref(0)//和other
const save = () => {
  chart.value.canvasToTempFilePath({
    success(res) {
      console.log("res::::", res);
    },
  });
};

onMounted(() => {
  init();
  uni.$on('changeType',val=>{
	  console.log(val)
		type.value=val;
  })
});
</script>

<style>
.customTooltips {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20rpx;
}
</style>
