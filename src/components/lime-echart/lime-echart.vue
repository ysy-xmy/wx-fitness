<template>
  <scroll-view
    v-if="type != 1"
    scroll-x
    class="bg-white nav"
    style="
      width: 130px;
      margin: 0 auto;
      font-size: small;
      /* height: 30px;
      line-height: 30px; */
    "
  >
    <view class="flex text-center">
      <view
        class="cu-item flex-sub"
        :class="timeKind == 'month' ? 'text-[#FF5E3A] cur' : ''"
        @tap="() => changeTimeList({ detail: { name: 'month' } })"
      >
        年
      </view>
      <view
        class="cu-item flex-sub"
        :class="timeKind == 'week' ? 'text-[#FF5E3A] cur' : ''"
        @tap="() => changeTimeList({ detail: { name: 'week' } })"
      >
        月
      </view>
      <view
        class="cu-item flex-sub"
        :class="timeKind == 'day' ? 'text-[#FF5E3A] cur' : ''"
        @tap="() => changeTimeList({ detail: { name: 'day' } })"
      >
        周
      </view>
    </view>
  </scroll-view>

  <scroll-view
    v-else
    scroll-x
    class="bg-white nav"
    style="
      width: 260px;
      margin: 20px auto;
      font-size: small;

      line-height: 30px;
      margin-top: 20px;
    "
  >
    <view class="flex text-center">
      <view
        class="cu-item flex-sub"
        :class="kind == 'bust' ? 'text-[#FF5E3A] cur' : ''"
        @tap="() => changeList({ detail: { name: 'bust' } })"
      >
        胸围
      </view>
      <view
        class="cu-item flex-sub"
        :class="kind == 'waist' ? 'text-[#FF5E3A] cur' : ''"
        @tap="() => changeList({ detail: { name: 'waist' } })"
      >
        腰围
      </view>
      <view
        class="cu-item flex-sub"
        :class="kind == 'hip' ? 'text-[#FF5E3A] cur' : ''"
        @tap="() => changeList({ detail: { name: 'hip' } })"
      >
        臀围
      </view>
    </view>
  </scroll-view>

  <view>
    <div
      style="
        width: 94%;
        /* height: 100%; */
        margin: 0 auto;
        background: #ebf6d8;
        border-radius: 30px 30px 30px 30px;
        opacity: 0.66;
        margin-top: 20px;
        z-index: -1;
      "
    >
      <l-echart
        ref="chart"
        @finished="init"
        style="background-color: red; z-index: -1"
      ></l-echart>
    </div>
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
    console.log(val, "123");
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
    //这里已经改了，日是7天为间隔，月是1月为间隔，年是12月为间隔
    if (timeKind.value == "day" || temp.value == "three") {
      getLastValuePerWeek(res.data.data, props.beginTime, props.endTime).then(
        () => {
          init();
          uni.hideLoading();
        }
      );
    } else if (timeKind.value == "week" && temp.value != "three") {
      getLastValuePerMonth(res.data.data, props.beginTime, props.endTime).then(
        () => {
          init();
          uni.hideLoading();
        }
      );
    } else if (timeKind.value == "month" && temp.value != "three") {
      getLastValuePerYear(res.data.data, props.beginTime, props.endTime).then(
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
        trigger: "axis",
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
          emphasis: {
            focus: "series",
          },
          // 添加区域填充
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(58,177,255,0.5)", // 渐变起始颜色
                },
                {
                  offset: 1,
                  color: "rgba(58,177,255,0.1)", // 渐变结束颜色
                },
              ],
            },
          },
          lineStyle: {
            color: "#3AB1FF", // 线条颜色
          },
          itemStyle: {
            color: "#3AB1FF", // 数据点颜色
          },
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
        BUST: BUSTDesc.data.data[0]?.Value || 0,
        WAIST: WAISTDesc.data.data[0]?.Value || 0,
        HIP: HIPDesc.data.data[0]?.Value || 0,
        time: dayjs(BUSTAsc.data.data[0]?.CreatedAt).format("YYYY-MM-DD"), //都是统一录入的时间应该是一样的
      },
      new: {
        BUST: BUSTAsc.data.data[0]?.Value || 0,
        WAIST: WAISTAsc.data.data[0]?.Value || 0,
        HIP: HIPAsc.data.data[0]?.Value || 0,
        time: dayjs(BUSTAsc.data.data[0]?.CreatedAt).format("YYYY-MM-DD"), //都是统一录入的时间应该是一样的
      },
    };
  } else {
    const Type = temp.value;
    console.log();
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
    console.log(responses, "res", "123");
    res = {
      oldVal: ascRes.data.data[0]?.Value || 0,
      oldTime: dayjs(ascRes.data.data[0]?.CreatedAt).format("YYYY-MM-DD"),
      newVal: descRes.data.data[0]?.Value || 0,
      newTime: dayjs(descRes.data.data[0]?.CreatedAt).format("YYYY-MM-DD"),
    };
    console.log("发送" + Type);
    if (Type == "weight" || Type === "height")
      uni.$emit("changeBody", { Type, val: res.newVal });
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

// 数据处理 - 按周计算最后一天的值
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

    // 并发处理获取上次的值和初始化周范围
    await Promise.all([
      getLastVal(data.length), // 获取上一次的值
      (async () => {
        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
          const weekStart = currentDate.startOf("week").format("YYYY-MM-DD");
          dateObj[weekStart] = 0;

          // 检查下一周是否超过结束日期
          const nextWeek = currentDate.add(1, "week");
          if (nextWeek.isAfter(endDate)) {
            // 如果超过，使用结束日期作为最后一个点
            dateObj[endDate.format("YYYY-MM-DD")] = 0;
            break;
          }

          currentDate = nextWeek;
        }
      })(),
    ]);

    const resData = disposeWeek(list);
    const xAxisKeys = Object.keys(dateObj);

    // 填充结果：按周对数据进行映射
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
      getLastVal(data.length),
      (async () => {
        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
          const monthStart = currentDate.startOf("month").format("YYYY-MM");
          dateObj[monthStart] = 0;

          // 检查下一个月是否超过结束日期
          const nextMonth = currentDate.add(1, "month");
          if (nextMonth.isAfter(endDate)) {
            // 如果超过，使用结束日期的月份作为最后一个点
            const endMonth = endDate.format("YYYY-MM");
            if (endMonth !== monthStart) {
              dateObj[endMonth] = 0;
            }
            break;
          }

          currentDate = nextMonth;
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

// 数据处理 - 按年计算最后一天的值
const disposeYear = (data) => {
  const tempObj = {};
  const res = {};
  data.forEach((item) => {
    const yearStart = dayjs(item.CreatedAt).startOf("year").format("YYYY"); // 获取年的开始日期
    const time = dayjs(item.CreatedAt).unix();

    // 记录每年内最后一天的值
    if (!tempObj[yearStart] || tempObj[yearStart].time < time) {
      tempObj[yearStart] = {
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

// 按年计算：移除不必要的操作，并行获取数据和初始化日期
const getLastValuePerYear = async (data, startDateString, endDateString) => {
  return new Promise(async (resolve, reject) => {
    const list = data || [];
    const dateObj = {};
    let currentDate = dayjs(startDateString);
    const endDate = dayjs(endDateString);

    await Promise.all([
      getLastVal(data.length),
      (async () => {
        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
          const yearStart = currentDate.startOf("year").format("YYYY");
          dateObj[yearStart] = 0;

          // 检查下一年是否超过结束日期
          const nextYear = currentDate.add(1, "year");
          if (nextYear.isAfter(endDate)) {
            // 如果超过，使用结束日期的年份作为最后一个点
            const endYear = endDate.format("YYYY");
            if (endYear !== yearStart) {
              dateObj[endYear] = 0;
            }
            break;
          }

          currentDate = nextYear;
        }
      })(),
    ]);

    const resData = disposeYear(list);
    const xAxisKeys = Object.keys(dateObj);

    // 填充结果：按年份对数据进行映射
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

<style lang="scss" scoped>
.customTooltips {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20rpx;
}

:deep(.tab-active-class) {
  background-color: rgba(156, 166, 140, 1) !important;
  color: white !important;
}
.cur {
  background: rgba(156, 166, 140, 1);
}
canvas {
  z-index: -1;
}
</style>
<style>
:deep(.nav-class) {
  background: 0 !important;
}
</style>
