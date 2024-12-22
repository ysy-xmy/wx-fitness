<template>
  <view
    style="
      width: 100%;
      height: 100%;
      min-height: 100vh;
      background-color: rgba(0, 0, 0, 0.1);
    "
  >
    <view class="calendar-container">
      <view
        class="calendar-wrapper"
        :style="{ height: wrapperHeight + 'px' }"
        ref="calendarRef"
      >
        <uni-calendar
          class="uni-calendar--hook"
          :selected="selected"
          :showMonth="showCalendar"
          :insert="true"
          :startDate="startDate"
          :endDate="endDate"
          :range="false"
          :clearDate="false"
          @change="change"
          @monthSwitch="monthSwitch"
          :date="currentDate"
          :weeksCount="showCalendar ? 6 : 1"
        />
      </view>
      <view
        class="drag-bar"
        @touchstart="dragStart"
        @touchmove="dragMove"
        @touchend="dragEnd"
        @click="toggleHeight"
      >
        <view class="drag-line"></view>
      </view>
    </view>

    <div class="plan-container">
      <div class="top" style="background-color: rgba(59, 213, 221, 1)">
        <div class="title">负重臀桥</div>
        <van-icon name="plus" size="20" color="white" />
      </div>
      <div class="bottom">
        <div class="card" v-for="item in 3">
          <div class="content">
            <div class="name">第一组</div>
            <div class="wei">70Kg</div>
            <div class="count">10次</div>
          </div>
          <div class="btn">
            <van-icon name="minus" size="15" color="white" />
          </div>
        </div>
      </div>
    </div>
    <div class="plan-container">
      <div class="top" style="background-color: rgba(138, 207, 90, 1)">
        <div class="title">拉伸运动</div>
        <van-icon name="plus" size="20" color="white" />
      </div>
      <div class="bottom">
        <div class="card">
          <div class="content">
            <div class="name">肱二头肌</div>
            <div class="count">10次</div>
          </div>
          <div class="btn">
            <van-icon name="minus" size="15" color="white" />
          </div>
        </div>
      </div>
    </div>

    <div class="addBtn">
      <van-icon name="plus" size="20" color="#6495ED" />
    </div>
  </view>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";

const selected = ref<any[]>([]);
const startDate = ref<string>("2023-01-01");
const endDate = ref<string>("2024-12-31");
const showCalendar = ref<boolean>(false);
const currentDate = ref<string>(new Date().toISOString().split("T")[0]);
const wrapperHeight = ref<number>(415);
const isDragging = ref<boolean>(false);
const startY = ref<number>(0);
const startHeight = ref<number>(150);
const calendarRef = ref<any>(null);

function getDate(date: Date | string, AddDayCount = 0) {
  if (!date) {
    date = new Date();
  }
  if (typeof date !== "object") {
    date = date.replace(/-/g, "/");
  }
  const dd = new Date(date);

  dd.setDate(dd.getDate() + AddDayCount);

  const y = dd.getFullYear();
  const m =
    dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return {
    fullDate: y + "-" + m + "-" + d,
    year: y,
    month: m,
    date: d,
    day: dd.getDay(),
  };
}

onMounted(() => {
  nextTick(() => {
    showCalendar.value = true;
    // 获取今天的日期
    const today = getDate(new Date()).fullDate;
    currentDate.value = today;
    startDate.value = getDate(new Date(), -60).fullDate;
    endDate.value = getDate(new Date(), 30).fullDate;

    // 初始化打卡数据
    selected.value = [
      {
        date: getDate(new Date(), -3).fullDate,
      },
      {
        date: getDate(new Date(), -2).fullDate,
      },
      {
        date: getDate(new Date(), -1).fullDate,
      },
    ];

    // 检查今天是否已打卡
    // const todayChecked = selected.value.find((item) => item.date === today);
    // if (todayChecked) {
    //   uni.showToast({
    //     title: "今日已打卡",
    //     icon: "success",
    //   });
    // } else {
    //   uni.showToast({
    //     title: "今日未打卡",
    //     icon: "none",
    //   });
    // }
  });
});

const scrollToSelectedDate = () => {
  nextTick(() => {
    const selectedDateElement = calendarRef.value?.querySelector(
      ".uni-calendar-item--selected"
    );
    if (selectedDateElement) {
      const offsetTop = selectedDateElement.offsetTop;
      calendarRef.value.scrollTop = offsetTop;
    }
  });
};

const change = (e: any) => {
  console.log("选择的日期是:", e);
  // 检查是否已经打卡
  scrollToSelectedDate();
};

const monthSwitch = (e: any) => {
  console.log("切换月份:", e);
};

const toggleHeight = () => {
  wrapperHeight.value = wrapperHeight.value === 150 ? 415 : 150;
  if (wrapperHeight.value === 150) {
    scrollToSelectedDate();
  }
};

const dragStart = (e: any) => {
  isDragging.value = true;
  startY.value = e.touches[0].clientY;
  startHeight.value = wrapperHeight.value;
};

const dragMove = (e: any) => {
  if (!isDragging.value) return;
  const deltaY = e.touches[0].clientY - startY.value;
  const newHeight = startHeight.value + deltaY;
  wrapperHeight.value = Math.min(Math.max(newHeight, 150), 415);
};

const dragEnd = () => {
  isDragging.value = false;
};
</script>

<style scoped>
.calendar-container {
  position: relative;
  background: #fff;
}

.calendar-wrapper {
  overflow: auto;
  transition: height 0.3s ease-in-out;
}

.uni-calendar--hook {
  height: 100%;
}

.drag-bar {
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  cursor: ns-resize;
}

.drag-line {
  width: 40px;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
}

.uni-calendar-checked {
  background-color: #4caf50 !important;
  border-radius: 50% !important;
}
.plan-container {
  margin: 10px auto;
  width: 95%;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;

  .top {
    padding: 0 10px;
    padding-top: 10px;
    display: flex;
    justify-content: space-between;

    align-items: flex-start;
    .title {
      height: 30px;
      font-weight: bold;
      color: white;
      font-size: 15px;
      line-height: 20px;
      font-style: normal;
      letter-spacing: 10px;
    }
  }
  .bottom {
    .card {
      margin: 5px auto;
      height: 35px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 20px;
      padding-right: 10px;
      padding-bottom: 10px;
      .content {
        margin-right: 20px;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name,
        .wei,
        .count {
          font-size: 15px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
        }
      }
      .btn {
        width: 15px;
        height: 15px;
        border-radius: 75%;
        background: #ffb6c1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.addBtn {
  position: absolute;
  bottom: 50px;
  right: 20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 75%;
  padding: 10px;
  width: 40px;
  height: 40px;
}
:deep(.uni-calendar-item__weeks-box-circle) {
  background-color: #6495ed !important;
  top: 42px !important;
  right: 50% !important;
  transform: translateX(50%) !important;
}
:deeo(.uni-calendar-item__weeks-box-text) {
  font-size: 19px;
  font-weight: 700;
}
</style>
