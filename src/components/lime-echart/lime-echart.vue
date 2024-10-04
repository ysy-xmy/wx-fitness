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
import dayjs from "dayjs";
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
    setTimeout(() => {
      changeType(temp.value);
    }, 1);
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
    changeBotDay();
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
    console.log(option);
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

//修改展示下方数据
const changeBotDay = async () => {
  let res = {};
  if (temp.value == "three") {
    //三维
    const dataBUSTAsc = {
      Type: "BUST",
      Count: 1,
      StartTime: `1999-01-01 00:00:00`,
      EndTime: `${dayjs().format("YYYY-MM-DD")} 23:59:59`,
      OrderBy: "ASC",
    };
    const dataBUSTDesc = {
      Type: "BUST",
      Count: 1,
      StartTime: `1999-01-01 00:00:00`,
      EndTime: `${dayjs().format("YYYY-MM-DD")} 23:59:59`,
      OrderBy: "DESC",
    };
    const dataWAISTAsc = {
      Type: "WAIST",
      Count: 1,
      StartTime: `1999-01-01 00:00:00`,
      EndTime: `${dayjs().format("YYYY-MM-DD")} 23:59:59`,
      OrderBy: "ASC",
    };
    const dataWAISTDesc = {
      Type: "WAIST",
      Count: 1,
      StartTime: `1999-01-01 00:00:00`,
      EndTime: `${dayjs().format("YYYY-MM-DD")} 23:59:59`,
      OrderBy: "DESC",
    };
    const dataHIPAsc = {
      Type: "HIP",
      Count: 1,
      StartTime: `1999-01-01 00:00:00`,
      EndTime: `${dayjs().format("YYYY-MM-DD")} 23:59:59`,
      OrderBy: "ASC",
    };
    const dataHIPDesc = {
      Type: "HIP",
      Count: 1,
      StartTime: `1999-01-01 00:00:00`,
      EndTime: `${dayjs().format("YYYY-MM-DD")} 23:59:59`,
      OrderBy: "DESC",
    };
    const responses = await Promise.all([
      getBodydata(dataBUSTAsc),
      getBodydata(dataBUSTDesc),
      getBodydata(dataWAISTAsc),
      getBodydata(dataWAISTDesc),
      getBodydata(dataHIPAsc),
      getBodydata(dataHIPDesc),
    ]);
    const [BUSTAsc, BUSTDesc, WAISTAsc, WAISTDesc, HIPAsc, HIPDesc] = responses;
    res = {
      old: {
        BUST: BUSTDesc.data.data[0].Value,
        WAIST: WAISTDesc.data.data[0].Value,
        HIP: HIPDesc.data.data[0].Value,
        time: dayjs(BUSTAsc.data.data[0].CreatedAt).format("YYYY-MM-DD"), //都是统一录入的时间应该是一样的
      },
      new: {
        BUST: BUSTAsc.data.data[0].Value,
        WAIST: WAISTAsc.data.data[0].Value,
        HIP: HIPAsc.data.data[0].Value,
        time: dayjs(BUSTAsc.data.data[0].CreatedAt).format("YYYY-MM-DD"), //都是统一录入的时间应该是一样的
      },
    };
  } else {
    const Type = temp.value;
    // console.log(Type);
    const dataAsc = {
      Type,
      Count: 1,
      StartTime: `1999-01-01 00:00:00`,
      EndTime: `${dayjs().format("YYYY-MM-DD")} 23:59:59`,
      OrderBy: "ASC",
    };
    const dataDesc = {
      Type,
      Count: 1,
      StartTime: `1999-01-01 00:00:00`,
      EndTime: `${dayjs().format("YYYY-MM-DD")} 23:59:59`,
      OrderBy: "DESC",
    };
    const responses = await Promise.all([
      getBodydata(dataAsc),
      getBodydata(dataDesc),
    ]);
    const [ascRes, descRes] = responses;
    console.log(responses, "res");
    res = {
      oldVal: ascRes.data.data[0].Value,
      oldTime: dayjs(ascRes.data.data[0].CreatedAt).format("YYYY-MM-DD"),
      newVal: descRes.data.data[0].Value,
      newTime: dayjs(descRes.data.data[0].CreatedAt).format("YYYY-MM-DD"),
    };
  }
  uni.$emit("changeBotData", res);
  console.log(res);
};

const lastValue = ref(0);
// 获取上一次的值，优化为并发请求，减少等待时间
const getLastVal = async (len) => {
  const Type = temp.value === "three" ? kind.value : temp.value;
  const data = {
    Type,
    Count: len + 1,
    StartTime: `1999-01-01 00:00:00`,
    EndTime: `${props.endTime} 23:59:59`,
  };

  const res = await getBodydata(data);
  const resData = res.data.data;
  lastValue.value = resData.length === len ? 0 : resData[0]?.Value || 0;
};

//数据处理
const disposeDay = (data) => {
  const tempObj = {};
  const res = {};
  data.forEach((item) => {
    const day = dayjs(item.CreatedAt).format("YYYY-MM-DD");
    const time = dayjs(item.CreatedAt).unix();
    if (!tempObj[day] || tempObj[day].time < time)
      tempObj[day] = {
        value: item.Value,
        time,
      };
  });
  for (let item of Object.keys(tempObj)) res[item] = tempObj[item]["value"];
  return res;
};

// 按天计算：移除不必要的操作，并行获取数据和初始化日期
const getLastValuePerDay = async (data, startDateString, endDateString) => {
  return new Promise(async (resolve, reject) => {
    const list = data || [];
    const dateObj = {};
    let currentDate = dayjs(startDateString);
    const endDate = dayjs(endDateString);

    // 并发获取上次的值和初始化日期范围
    await Promise.all([
      getLastVal(data.length), // 获取上一次的值
      (async () => {
        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
          dateObj[currentDate.format("YYYY-MM-DD")] = 0;
          currentDate = currentDate.add(1, "day");
        }
      })(),
    ]);

    const resData = disposeDay(list);
    const xAxisKeys = Object.keys(dateObj);

    // 优化填充过程：减少重复计算
    xAxis.value = xAxisKeys;
    yAxis.value = xAxisKeys.map((key) => {
      const value = resData[key] || lastValue.value;
      if (resData[key]) {
        lastValue.value = value;
      }
      return value;
    });

    resolve(true);
  });
};

//// 数据处理 - 按周计算最后一天的值
const disposeWeek = (data) => {
  const tempObj = {};
  const res = {};
  data.forEach((item) => {
    const weekStart = dayjs(item.CreatedAt)
      .startOf("week")
      .format("YYYY-MM-DD"); // 获取周开始日期
    const time = dayjs(item.CreatedAt).unix();

    // 记录每周内最后一天的值
    if (!tempObj[weekStart] || tempObj[weekStart].time < time) {
      tempObj[weekStart] = {
        value: item.Value,
        time,
      };
    }
  });

  for (let item of Object.keys(tempObj)) {
    res[item] = tempObj[item]["value"];
  }
  return res;
};
// 按周计算：移除不必要的操作，并行获取数据和初始化日期
const getLastValuePerWeek = async (data, startDateString, endDateString) => {
  return new Promise(async (resolve, reject) => {
    const list = data || [];
    const dateObj = {};
    let currentDate = dayjs(startDateString);
    const endDate = dayjs(endDateString);

    // 并发获取上次的值和初始化日期范围
    await Promise.all([
      getLastVal(data.length), // 获取上一次的值
      (async () => {
        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
          const weekStart = currentDate.startOf("week").format("YYYY-MM-DD");
          dateObj[weekStart] = 0; // 用周的开始日期作为键
          currentDate = currentDate.add(1, "week"); // 每次加一周
        }
      })(),
    ]);

    const resData = disposeWeek(list);
    const xAxisKeys = Object.keys(dateObj);

    // 优化填充过程：减少重复计算
    xAxis.value = xAxisKeys;
    yAxis.value = xAxisKeys.map((key) => {
      const value = resData[key] || lastValue.value;
      if (resData[key]) {
        lastValue.value = value;
      }
      return value;
    });

    resolve(true);
  });
};

// 数据处理 - 按月计算最后一天的值
const disposeMonth = (data) => {
  const tempObj = {};
  const res = {};
  data.forEach((item) => {
    const monthStart = dayjs(item.CreatedAt).startOf("month").format("YYYY-MM"); // 获取月开始日期
    const time = dayjs(item.CreatedAt).unix();

    // 记录每月内最后一天的值
    if (!tempObj[monthStart] || tempObj[monthStart].time < time) {
      tempObj[monthStart] = {
        value: item.Value,
        time,
      };
    }
  });

  for (let item of Object.keys(tempObj)) {
    res[item] = tempObj[item]["value"];
  }
  return res;
};

// 按月计算：移除不必要的操作，并行获取数据和初始化日期
const getLastValuePerMonth = async (data, startDateString, endDateString) => {
  return new Promise(async (resolve, reject) => {
    const list = data || [];
    const dateObj = {};
    let currentDate = dayjs(startDateString);
    const endDate = dayjs(endDateString);

    // 并发获取上次的值和初始化日期范围
    await Promise.all([
      getLastVal(data.length), // 获取上一次的值
      (async () => {
        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
          const monthStart = currentDate.startOf("month").format("YYYY-MM");
          dateObj[monthStart] = 0; // 用月的开始日期作为键
          currentDate = currentDate.add(1, "month"); // 每次加一月
        }
      })(),
    ]);

    const resData = disposeMonth(list);
    const xAxisKeys = Object.keys(dateObj);

    // 优化填充过程：减少重复计算
    xAxis.value = xAxisKeys;
    yAxis.value = xAxisKeys.map((key) => {
      const value = resData[key] || lastValue.value;
      if (resData[key]) {
        lastValue.value = value;
      }
      return value;
    });

    resolve(true);
  });
};
</script>

<style>
.customTooltips {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20rpx;
}
</style>
