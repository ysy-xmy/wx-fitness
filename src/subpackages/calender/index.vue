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
          :range="false"
          :clearDate="false"
          :showToday="false"
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
    <div v-for="(item, index) in planListType" :key="index">
      <div class="plan-container" v-if="item.type === 'weight'">
        <div class="top" style="background-color: rgba(59, 213, 221, 1)">
          <div class="title">{{ item.title }}</div>
          <div class="top-actions">
            <van-icon
              name="edit"
              size="20"
              color="white"
              @click="toggleEditMode(item)"
              style="margin-right: 10px"
            />
            <van-icon
              name="plus"
              size="20"
              color="white"
              @click="addAction(item)"
              v-if="roleName === 'coach' || actionsStore.getCoachID === 0"
            />
          </div>
        </div>
        <div class="bottom">
          <div class="card" v-for="it in item.planActions" :key="it.ActionName">
            <div class="card-content">
              <div class="content">
                <div class="name" @click="godetail(it)">
                  {{ it.ActionName }}
                </div>
                <div class="wei" v-if="!item.isEditing">{{ it.Weight }}Kg</div>
                <input
                  v-else
                  type="number"
                  v-model="it.Weight"
                  class="edit-input"
                  placeholder="重量"
                />
                <div class="count" v-if="!item.isEditing">
                  {{ it.GroupNum }}次
                </div>
                <input
                  v-else
                  type="number"
                  v-model="it.GroupNum"
                  class="edit-input"
                  placeholder="组数"
                />
              </div>
              <div
                class="delete-btn"
                @click="deleteAction(item, it)"
                v-if="
                  item.isEditing &&
                  (roleName === 'coach' || actionsStore.getCoachID === 0)
                "
              >
                <van-icon name="minus" size="15" color="white" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="plan-container" v-if="item.type === 'stretch'">
        <div class="top" style="background-color: rgba(138, 207, 90, 1)">
          <div class="title">{{ item.title }}</div>
          <div class="top-actions">
            <van-icon
              name="edit"
              size="20"
              color="white"
              @click="toggleEditMode(item)"
              style="margin-right: 10px"
            />
            <van-icon
              name="plus"
              size="20"
              color="white"
              @click="addAction(item)"
              v-if="roleName === 'coach' || actionsStore.getCoachID === 0"
            />
          </div>
        </div>
        <div class="bottom">
          <div class="card" v-for="it in item.planActions" :key="it.ActionName">
            <div class="card-content">
              <div class="content">
                <div class="name" @click="godetail(item)">
                  {{ it.ActionName }}
                </div>
                <div class="count" v-if="!item.isEditing">
                  {{ it.Second }}秒
                </div>
                <input
                  v-else
                  type="number"
                  v-model="it.Second"
                  class="edit-input"
                  placeholder="秒数"
                />
              </div>
              <div
                class="delete-btn"
                @click="deleteAction(item, it)"
                v-if="
                  item.isEditing &&
                  (roleName === 'coach' || actionsStore.getCoachID === 0)
                "
              >
                <van-icon name="minus" size="15" color="white" />
              </div>
            </div>
          </div>
          <div
            class="card"
            style="text-align: center"
            v-if="item.planActions.length === 0"
          >
            暂无计划
          </div>
        </div>
      </div>
    </div>
    <div
      style="text-align: center; margin-top: 20px; width: 100%"
      v-if="planListType.length === 0"
    >
      暂无计划
    </div>
    <div
      class="addBtn"
      @click="toActionArrange"
      v-if="roleName === 'coach' || actionsStore.getCoachID === 0"
    >
      <div class="add-content">
        <van-icon name="plus" size="24" color="#ffffff" />
        <span class="add-text">添加计划</span>
      </div>
    </div>
  </view>
  <van-dialog
    use-slot
    title="课程信息"
    :show="showDialog"
    show-cancel-button
    @confirm="goChooseAction"
    @close="onCloseDialog"
  >
    <van-radio-group :value="radioType">
      <van-cell-group>
        <van-cell
          title="放松训练"
          value-class="value-class"
          clickable
          data-name="stretch"
          @click="() => chooseType('stretch')"
        >
          <van-radio name="stretch" />
        </van-cell>
        <van-cell
          title="力量训练"
          value-class="value-class"
          clickable
          data-name="weight"
          @click="() => chooseType('weight')"
        >
          <van-radio name="weight" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-field
      :value="addClassName"
      placeholder="请输入动作组名称"
      border="true"
      @change="onChangeAddClassName"
    />
  </van-dialog>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "uni-mini-router";
import { useActionsStore } from "@/state/modules/actions";
import { useAuthStore } from "@/state/modules/auth";
import {
  updateActionToGroup,
  deleteActionFromGroup,
  getActionByDate,
  getActionDate,
} from "@/api/action/action";
import dayjs from "dayjs";
import { onShow } from "@dcloudio/uni-app";
// import uniCalendar from "@dcloudio/uni-ui/lib/uni-calendar/uni-calendar.vue";
const router = useRouter();
const authStore = useAuthStore();
const selected = ref<any[]>([]);
const startDate = ref<string>("2023-01-01");
const endDate = ref<string>("2054-12-31");
const showCalendar = ref<boolean>(false);
const currentDate = ref<string>(new Date().toISOString().split("T")[0]);
const wrapperHeight = ref<number>(415);
const isDragging = ref<boolean>(false);
const startY = ref<number>(0);
const startHeight = ref<number>(150);
const calendarRef = ref<any>(null);
const currentSelectDay = ref(""); //当前选择的日期
const planListType = ref<any[]>([]);
const actionsStore = useActionsStore();
const addClassName = ref<string>("");
const planId = ref(Infinity);
const onChangeAddClassName = (e: any) => {
  addClassName.value = e.detail;
};
const route = useRoute();
onShow(() => {
  getAction(currentSelectDay.value);
});
const roleName = computed(() => {
  return authStore.user.RoleName;
});
const addAction = (item: any) => {
  console.log(item, "item");
  let temp = {
    type: item.type,
    name: item.title,
  };
  actionsStore.setChooseActions(temp);
  router.push({
    name: "actionArrange",
  });
};
const godetail = (item: any) => {
  console.log(item, 123);
  router.push({
    name: "actionDetail",
    params: {
      itemid: String(item.ExerciseActionID),
    },
  });
};
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
const deleteAction = (item: any, it: any) => {
  deleteActionFromGroup([it.ID])
    .then((res: any) => {
      if (res.data.code == 200) {
        // 直接从本地数组中过滤掉被删除的动作
        const groupIndex = planListType.value.findIndex(
          (group) => group.title === item.title
        );
        if (groupIndex !== -1) {
          planListType.value[groupIndex].planActions = planListType.value[
            groupIndex
          ].planActions.filter((action) => action.ActionName !== it.ActionName);
        }

        uni.showToast({
          title: "删除成功",
          icon: "success",
        });
      } else {
        uni.showToast({
          title: "删除失败",
          icon: "none",
        });
      }
    })
    .catch((err) => {
      console.log(err, "err");
      uni.showToast({
        title: "删除失败",
        icon: "none",
      });
    });
};
const changeTime = (dateTime: string) => {
  // 将字符串转化为 Date 对象
  const date = new Date(dateTime.replace(" ", "T"));

  // 转化为 ISO 格式并提取日期部分
  const isoDate = date.toISOString().split("T")[0];
  return isoDate;
};

const showDialog = ref<boolean>(false);
const radioType = ref<string>("");

const chooseType = (type: string) => {
  radioType.value = type;
};
const getWhichDate = () => {
  getActionDate({
    id: useActionsStore().getClassID,
    type: useActionsStore().getFindActionData.Type,
  }).then((res: any) => {
    console.log(res, "res");
    if (res.data.code === 200 && res.data.data) {
      selected.value = res.data.data.map((date: string) => ({
        date: dayjs(date).format("YYYY-MM-DD"),
      }));
      // 强制更新日历组件
      nextTick(() => {
        showCalendar.value = false;
        nextTick(() => {
          showCalendar.value = true;
        });
      });
    }
  });
};
const onCloseDialog = () => {
  addClassName.value = "";
  radioType.value = "";
  showDialog.value = false;
};
const goChooseAction = () => {
  console.log(radioType.value, "radioType");
  console.log(addClassName.value, "addClassName");
  if (!radioType.value) {
    uni.showToast({
      title: "请选择课程类型",
      icon: "none",
    });
    return;
  }
  if (!addClassName.value) {
    uni.showToast({
      title: "请输入动作组名称",
      icon: "none",
    });
    return;
  }
  let temp = {
    type: radioType.value,
    name: addClassName.value,
  };
  actionsStore.setChooseActions(temp);
  onCloseDialog();
  router.push({
    name: "actionArrange",
  });
};
// const planListType = computed(() => {
//   console.log(currentSelectDay.value, "currentSelectDay", planListType.value);
//   return currentSelectDay.value === changeTime(actionsStore.getTime)
//     ? planListType.value
//     : [];
// });

const toActionArrange = () => {
  showDialog.value = true;
};
watch(
  () => currentSelectDay.value,
  (newVal) => {
    if (newVal) {
      getAction(newVal);
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
const getAction = (data: any) => {
  const temp = {
    id: useActionsStore().getClassID,
    date: dayjs(data).format("YYYY-MM-DD"),
    type: useActionsStore().getFindActionData.Type,
  };

  getActionByDate(temp)
    .then((res: any) => {
      planListType.value = [];
      console.log(res.data, "res");
      if (res.data.code === 200 && res.data.data) {
        res.data.data.forEach((it: any, ind: number) => {
          planListType.value.push({
            planActions: it["PlanActions"],
            title: it["ActionGroupTitle"] || `动作${ind + 1}`,
            type: it["ContentType"],
            isEditing: false,
          });
        });
        console.log(planListType.value, "planListType");
      } else {
      }
      // planListType.value = res.data.data;
    })
    .catch((err) => {
      console.log(err, "err");
      uni.showToast({
        title: "获取动作失败",
        icon: "none",
      });
    });
};
onMounted(() => {
  console.log(actionsStore.getFindActionData, "actionsStore.getFindActionData");
  if (route.query) {
    planId.value = route.query.id;
  }
  nextTick(() => {
    showCalendar.value = true;
    // 获取今天的日期
    currentDate.value = changeTime(actionsStore.getTime);
    currentSelectDay.value = changeTime(actionsStore.getTime);
    startDate.value = getDate(new Date(), -60).fullDate;
    endDate.value = getDate(new Date(), 30).fullDate;
    // getAction(dayjs(actionsStore.getTime).format("YYYY-MM-DD"));
    getWhichDate();
    // 初始化打卡数据
    // selected.value = [
    //   {
    //     date: changeTime(actionsStore.getTime),
    //   },
    // ];
    console.log(selected.value, "selected");
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
  currentSelectDay.value = e.fulldate;
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
const saveNewAction = (item: any) => {
  console.log(item, "item");
  item.planActions.forEach((it: any) => {
    it["PlanID"] = Number(planId.value);
    it.ExerciseActionID = Number(it.ExerciseActionID);
    it.GroupNum = Number(it.GroupNum);
    it.ID = Number(it.ID);
    it.OrderNum = Number(it.OrderNum);
    it.Second = Number(it.Second);
    it.TimesNum = Number(it.TimesNum);
    it.Weight = Number(it.Weight);
  });
  updateActionToGroup(item.planActions).then((res: any) => {
    console.log(res, "res");
    if (res.data.code === 200) {
      uni.showToast({
        title: "保存成功",
        icon: "success",
      });
      item.isEditing = false;
    } else {
      uni.showToast({
        title: "保存失败",
        icon: "none",
      });
    }
  });
};
const dragEnd = () => {
  isDragging.value = false;
};

const toggleEditMode = (item: any) => {
  if (item.isEditing) {
    // 保存所有修改
    saveNewAction(item);
  } else item.isEditing = !item.isEditing;
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
      min-height: 35px;
      height: auto;
      padding: 10px;

      .card-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      }

      .content {
        flex: 1;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 10px;
        align-items: center;
      }

      .delete-btn {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #ffb6c1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
      }
    }
  }
}
.addBtn {
  margin: 10px auto 60px;
  width: 95%;
  background: linear-gradient(135deg, #6495ED, #4169E1);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(100, 149, 237, 0.3);
  transition: all 0.3s ease;
}

.addBtn:active {
  transform: scale(0.98);
  box-shadow: 0 2px 5px rgba(100, 149, 237, 0.3);
}

.add-content {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-text {
  margin-left: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
}
:deep(.uni-calendar-item__weeks-box-circle) {
  background-color: #6495ed !important;
  top: 42px !important;
  right: 50% !important;
  transform: translateX(50%) !important;
}
:deep(.uni-calendar-item__weeks-box-text) {
  font-size: 19px;
  font-weight: 700;
}
:deep(.uni-calendar__backtoday) {
  display: none;
}
.top-actions {
  display: flex;
  align-items: center;
}

.edit-input {
  width: 60px;
  height: 24px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 5px;
  font-size: 14px;
}

.content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 10px;
  align-items: center;
}
</style>
<style>
.uni-calendar-item--checked {
  background-color: #3bd5dd !important;
  border-radius: 50% !important;
}
</style>
