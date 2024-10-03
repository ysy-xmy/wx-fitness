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
const temp = ref("weight"); //传值，展示tabs上面的
const timeKind = ref("month"); //时间，是日周月
const kind = ref("bust"); //类型，是要那种
onMounted(() => {
  uni.$on("changeTime", () => {
    changeType(temp.value);
  });
  uni.$on("changeType", (val) => {
    type.value = val;
  });
  uni.$on("change", (val) => {
    temp.value = val;
    changeType(val);
  });
  changeType("weight");
});
// const changeList = (e) => {
//   //切换三维
//   kind.value = e.detail.name;
//   changeType(temp.value);
// };
const changeTimeList = (e) => {
  timeKind.value = e.detail.name;
  changeType(temp.value);
};
const changeList = (e) => {
  kind.value = e.detail.name;
  changeType(temp.value);
};
const changeType = (active) => {
  uni.showLoading();
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
    xAxis.value = [];
    yAxis.value = [];

    if (timeKind.value == "day" || temp.value == "three") {
      getLastValuePerDay(res.data.data, props.beginTime, props.endTime).then(
        () => {
          init();
          uni.hideLoading();
        }
      );
    } else if (timeKind.value == "week" && temp.value != "three") {
      getLastValuePerWeek(res.data.data, props.beginTime, props.endTime).then(
        () => {
          init();
          uni.hideLoading();
        }
      );
    } else if ((timeKind.value = "month" && temp.value != "three")) {
      getLastValuePerMonth(res.data.data, props.beginTime, props.endTime).then(
        () => {
          init();
          uni.hideLoading();
        }
      );
    }
  });
};
const xAxis = ref([]); //表格最终要展示的数据
const yAxis = ref([]); //表格最终要展示的数据

const showTip = ref(false);
const position = ref([]);
const params = ref([]);
const chart = ref(null); // 获取图表引用

//在除了三维的时候
const init = () => {
  chart.value.init(echarts, (chartInstance) => {
    const option = {
      tooltip: {
        trigger: "axis", // 或 "axis", 根据需求选择
        formatter: (params) => {
          return `${params[0].axisValue}: ${params[0].data}`;
        },
      },
      xAxis: {
        type: "category",
        data: xAxis.value,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: yAxis.value,
          type: "line",
          smooth: true,
        },
      ],
    };
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

// const save = () => {
//   chart.value.canvasToTempFilePath({
//     success(res) {
//       console.log("res::::", res);
//     },
//   });
// };

// 计算当前日期相对于起始日期是第几个月
function getRelativeMonth(startDate, currentDate) {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // 计算月份差
  return (currentYear - startYear) * 12 + (currentMonth - startMonth) + 1;
}

// 按月计算
function getLastValuePerMonth(data, startDateString, endDateString) {
  return new Promise((resolve, reject) => {
    // 将起始日期和结束日期转换为 Date 对象
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    // 用来存储每月的最后一个值
    const result = {};

    // 按月分组数据
    const groupedByMonth = {};

    data.forEach((item) => {
      const currentDate = new Date(item.CreatedAt);

      // 计算当前日期相对于起始日期是第几个月
      const month = getRelativeMonth(startDate, currentDate);

      // 组合 key，作为唯一标识（如：第1月、第2月）
      const monthKey = `第${month}月`;

      // 如果当前月的记录已经存在，更新为更晚的记录
      if (
        !groupedByMonth[monthKey] ||
        new Date(groupedByMonth[monthKey].CreatedAt) < currentDate
      ) {
        groupedByMonth[monthKey] = item;
      }
    });

    // 逐月填充结果，如果某月没有数据，使用前一个月的值
    let lastValue = 0; // 第1月没有数据时默认值为0
    let currentDate = new Date(startDate); // 从起始日期开始

    while (currentDate <= endDate) {
      const month = getRelativeMonth(startDate, currentDate); // 计算相对于起始日期是第几个月
      const monthKey = `第${month}月`;

      if (groupedByMonth[monthKey]) {
        // 当前月有数据，取当前月的值
        lastValue = groupedByMonth[monthKey].Value;
      }

      // 当前月如果没有数据，使用前一个月的值
      result[monthKey] = lastValue;

      // 将每月的值添加到 yAxis
      yAxis.value.push(lastValue);

      // 继续到下一个月
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    // xAxis 应该是从第1月到结束日期的顺序
    xAxis.value = Object.keys(result);

    // 返回结果
    resolve(true);
  });
}

// 计算当前日期相对于起始日期是第几周
function getRelativeWeek(startDate, currentDate) {
  const oneDay = 86400000; // 一天的毫秒数
  const diffDays = Math.floor((currentDate - startDate) / oneDay); // 计算相差的天数
  return Math.floor(diffDays / 7) + 1; // 计算是第几周
}

// 按周计算
function getLastValuePerWeek(data, startDateString, endDateString) {
  return new Promise((resolve, reject) => {
    // 将起始日期和结束日期转换为 Date 对象
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    // 用来存储每周的最后一个值
    const result = {};

    // 按周分组数据
    const groupedByWeek = {};

    data.forEach((item) => {
      const currentDate = new Date(item.CreatedAt);

      // 计算当前日期相对于起始日期是第几周
      const week = getRelativeWeek(startDate, currentDate);

      // 组合 key，作为唯一标识（如：第1周、第2周）
      const weekKey = `第${week}周`;

      // 如果当前周的记录已经存在，更新为更晚的记录
      if (
        !groupedByWeek[weekKey] ||
        new Date(groupedByWeek[weekKey].CreatedAt) < currentDate
      ) {
        groupedByWeek[weekKey] = item;
      }
    });

    // 逐周填充结果，如果某周没有数据，使用前一周的值
    let lastValue = 0; // 第1周没有数据时默认值为0
    const oneWeek = 7 * 86400000; // 一周的毫秒数
    let currentDate = new Date(startDate); // 从起始日期开始

    while (currentDate <= endDate) {
      const week = getRelativeWeek(startDate, currentDate); // 计算相对于起始日期是第几周
      const weekKey = `第${week}周`;

      if (groupedByWeek[weekKey]) {
        // 当前周有数据，取当前周的值
        lastValue = groupedByWeek[weekKey].Value;
      }

      // 当前周如果没有数据，使用前一周的值
      result[weekKey] = lastValue;

      // 将每周的值添加到 yAxis
      yAxis.value.push(lastValue);

      // 继续到下一周
      currentDate = new Date(currentDate.getTime() + oneWeek);
    }

    // xAxis 应该是从第1周到结束日期的顺序
    xAxis.value = Object.keys(result);

    // 返回结果
    resolve(true);
  });
}

// // 计算当前日期相对于起始日期是第几天
// function getRelativeDay(startDate, currentDate) {
//   const oneDay = 86400000; // 一天的毫秒数
//   const diffDays = Math.floor((currentDate - startDate) / oneDay); // 计算相差的天数
//   return diffDays + 1; // 计算是第几天，最小为1
// }

// 按天计算
function getLastValuePerDay(data, startDateString, endDateString) {
  return new Promise((resolve, reject) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const result = {};
    const groupedByDay = {};

    data.forEach((item) => {
      const currentDate = new Date(item.CreatedAt);
      const dayDiff = Math.floor(
        (currentDate - startDate) / (1000 * 60 * 60 * 24)
      ); // 计算当前日期距离起始日期的天数
      const dayKey = `第${dayDiff + 1}天`; // 使用天数差来生成键

      // 更新为更晚的记录
      if (
        !groupedByDay[dayKey] ||
        new Date(groupedByDay[dayKey].CreatedAt) < currentDate
      ) {
        groupedByDay[dayKey] = item;
      }
    });

    // 逐天填充结果
    let lastValue = 0; // 初始为0，代表第一天
    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)); // 计算总天数

    for (let i = 0; i <= totalDays; i++) {
      const dayKey = `第${i + 1}天`;
      if (i === 0) {
        // 第一天下的值为0
        result[dayKey] = 0;
      } else if (groupedByDay[dayKey]) {
        lastValue = groupedByDay[dayKey].Value; // 获取当前天的值
        result[dayKey] = lastValue; // 当前天的值
      } else {
        result[dayKey] = lastValue; // 继续使用前一天的值
      }

      yAxis.value.push(result[dayKey]); // 将值添加到y轴
      xAxis.value.push(dayKey); // 添加到x轴
    }

    resolve(result); // 返回结果
  });
}
</script>

<style>
.customTooltips {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20rpx;
}
</style>
