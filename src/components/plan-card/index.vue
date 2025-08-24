<template>
  <div class="training-plan" v-if="!isHideHeader">
    <div class="plan-header">
      <div class="plan-title tracking-wider">
        {{ props.title }}
      </div>
    </div>
    <div class="plan-info">
      <div v-if="props.startDate" class="plan-dates">
        {{ formatDateRange(props.startDate, props.endDate) }}
      </div>
      <span>{{ props.status ? "已完成" : "进行中" }}</span>
    </div>
    <div class="plan-details">
      <ul class="plan-sessions">
        <li
          class="flex justify-between actionGroup-item"
          v-for="(plan, index) in planList"
          @click="getOrderDetail(plan)"
          :key="index"
        >
          <span class="flex flex-nowrap">
            <div @click.stop="handlePunchIn(plan.ID, plan.Complete, index)">
              <van-checkbox
                class="round cyan"
                checked-color="#1cbbb4"
                icon-size="24px"
                :value="plan.Complete"
                :checked="plan.Complete"
              />
            </div>

            <view class="title ml-3">
              {{
                plan.PlanTitle === ""
                  ? `私教课第 ${index + 1} 节`
                  : plan.PlanTitle
              }}</view
            >
          </span>
          <span>{{ plan.PlanTime.split(" ")[0] }}</span>
        </li>
      </ul>
    </div>
  </div>
  <ul class="plan-sessions" v-if="isHideHeader">
    <li
      class="flex justify-between actionGroup-item"
      v-for="(plan, index) in planList"
      :key="index"
      @click="getOrderDetail(plan)"
    >
      <span class="flex flex-nowrap">
        <div @click.stop="handlePunchIn(plan.ID, plan.Complete, index)">
          <van-checkbox
            class="round cyan"
            checked-color="#1cbbb4"
            icon-size="24px"
            :value="plan.Complete"
            :checked="plan.Complete"
          />
        </div>
        <view class="title ml-3">
          {{
            plan.PlanTitle === "" ? `私教课第 ${index + 1}节` : plan.PlanTitle
          }}</view
        >
      </span>
      <div class="flex items-center">
        <span class="mr-2">{{ plan.PlanTime }}</span>
        <div
          class="edit-btn ml-2 mr-2 w-[20px] h-[20px] rounded-full bg-[#4dff53] flex justify-center items-center"
          @click.stop="handleEdit(plan)"
          v-if="!plan.Complete"
        >
          <van-icon name="edit" size="14px" color="#fff" />
        </div>
        <div
          v-if="!plan.Complete"
          style="
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #ff4d4f;
            display: flex;
            justify-content: center;
            align-items: center;
          "
          @click.stop="handleDelete(plan)"
        >
          <van-icon name="minus" size="14px" color="#fff" />
        </div>
      </div>
    </li>
  </ul>

  <!-- 写一个弹窗，用来修改名字和日期 -->
  <van-dialog
    use-slot
    :title="`编辑 ${editForm.title || '课程'} 信息`"
    :show="showDialog"
    show-cancel-button
    @confirm="handleEditConfirm"
    @close="handleDialogClose"
  >
    <input
      :value="editForm.name"
      class="edit-input"
      placeholder="请输入课程名"
      border="true"
      @change="changeName"
    />
    <view class="cu-form-group">
      <view class="title">日期选择</view>
      <picker
        mode="date"
        :value="editForm.date"
        @change="(e: any) => (editForm.date = e.detail.value)"
      >
        <view class="picker">
          {{ editForm.date || "请选择日期" }}
        </view>
      </picker>
    </view>
  </van-dialog>
  <!-- 移除不必要的日期选择器，直接在picker中选择日期 -->
</template>

<script lang="ts" setup>
import { ref, PropType, watch, reactive } from "vue";
import { useRouter } from "uni-mini-router";
import { useActionsStore } from "@/state/modules/actions";
import { actionClok, updateCoursePlan } from "@/api/courses/courses";
import { deletePlan } from "@/api/action/action";
import dayjs from "dayjs";

const emit = defineEmits(["del"]);
type ActionGroupType = {
  ID: number;
  Type: string;
  PlanTitle: string;
  PlanTime: string;
  CreatedAt: string;
  Complete: boolean;
};
const changeName = (e: any) => {
  console.log(e, "e");
  editForm.name = e.detail.value;
};
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  startDate: {
    type: String,
    required: false,
  },
  endDate: {
    type: String,
    required: false,
  },
  status: {
    type: Number,
    required: true,
  },
  actionGroups: {
    type: Array as PropType<ActionGroupType[]>,
    required: true,
  },
  isHideHeader: {
    type: Boolean,
    required: false,
  },
});
const planList = ref<ActionGroupType[]>(props.actionGroups);
const showDialog = ref(false);
const editForm = reactive({
  name: "",
  date: "",
  id: 0,
  title: "",
});
const handleEditConfirm = () => {
  console.log(editForm, "editForm");
  let data = {
    ID: editForm.id,
    PlanTitle: editForm.name,
    PlanTime: editForm.date,
  };
  console.log(data, "data");
  updateCoursePlan(data)
    .then((res) => {
      if (res.data.code !== 200) {
        uni.showToast({
          title: res.data.msg,
          icon: "error",
          duration: 2000,
        });
      } else {
        uni.showToast({
          title: "更新成功",
          icon: "success",
          duration: 2000,
        });
        showDialog.value = false;
        uni.$emit("reload", true);
      }
    })
    .catch((err) => {
      uni.showToast({
        title: "更新失败",
        icon: "error",
        duration: 2000,
      });
    });
};

const handleDialogClose = () => {
  showDialog.value = false;
};
const router = useRouter();
const handleEdit = (item: any) => {
  showDialog.value = true;
  editForm.name = item.PlanTitle;
  editForm.date = item.PlanTime;
  editForm.id = item.ID;
  editForm.title = item.PlanTitle;
};
const formatDateRange = (startDate?: string, endDate?: string) => {
  if (!startDate) return "";

  const formatDate = (date: string) => date.split(" ")[0];
  const start = dayjs(startDate).format("YYYY-MM-DD");

  if (!endDate) {
    return `创建于 ${start}`;
  }

  return `${start} - ${dayjs(endDate).format("YYYY-MM-DD")}`;
};

const getOrderDetail = (item: any) => {
  console.log(item, "item");
  useActionsStore().setFindActionData({
    // ID: item["ID"],
    Type: item["Type"].toUpperCase(),
  });
  console.log(useActionsStore().getFindActionData, "useActionsStore");
  useActionsStore().setPlanList(item);
  useActionsStore().setTime(item.PlanTime);
  useActionsStore().setChooseActionId(item.ID);
  router.push({
    path: "/subpackages/calender/index?id=" + item.ID,
  });
};

const handlePunchIn = (id: any, status: boolean, index: number) => {
  //todo 如果是自己的话直接取消打卡就行
  if (status && useActionsStore().getCoachID !== 0) {
    uni.showToast({
      title: "已完成打卡，如需取消请联系对应教练取消取消",
      icon: "none",
      duration: 2000,
      mask: false,
    });
    planList.value[index].Complete = true;
    planList.value = [...planList.value];
    return;
  }
  if (!status)
    uni.showModal({
      title: "日常打卡",
      content: "是否进行打卡？",
      confirmText: "确定",
      cancelText: "取消",
      success: (res) => {
        if (res.confirm) {
          actionClok(id)
            .then((r) => {
              console.log(r, "res");
              if (r.data.code !== 200) {
                uni.showToast({
                  title: r.data.msg,
                  icon: "error",
                  duration: 2000,
                });
                return;
              }
              planList.value[index].Complete = true;
              uni.showToast({
                title: "成功",
                icon: "success",
                duration: 2000,
                mask: false,
              });
              setTimeout(() => {
                uni.$emit("reload", true);
              }, 2200);
            })
            .catch((err) => {
              uni.showToast({
                title: err.data.msg,
                icon: "error",
                duration: 2000,
                mask: false,
              });
              console.error("打卡失败", err);
            });
        } else {
          uni.showToast({
            title: "已取消打卡",
            icon: "none",
            duration: 2000,
            mask: false,
          });
          planList.value[index].Complete = false;
          planList.value = [...planList.value];
        }
      },
    });
  else if (status)
    uni.showModal({
      title: "取消",
      content: "是否取消打卡？",
      confirmText: "确定",
      cancelText: "取消",
      success: (res) => {
        if (res.confirm) {
          actionClok(id)
            .then((r) => {
              if (r.data.code !== 200) {
                uni.showToast({
                  title: r.data.msg,
                  icon: "error",
                  duration: 2000,
                });
                return;
              }
              planList.value[index].Complete = false;
              uni.showToast({
                title: "成功",
                icon: "success",
                duration: 2000,
                mask: false,
              });
              setTimeout(() => {
                console.log("取消打卡成功");
                uni.$emit("reload", true);
              }, 2200);
            })
            .catch((err) => {
              uni.showToast({
                title: err.data.msg,
                icon: "error",
                duration: 2000,
                mask: false,
              });
              console.error("打卡失败", err);
            });
        } else {
          uni.showToast({
            title: "已取消",
            icon: "none",
            duration: 2000,
            mask: false,
          });
          planList.value[index].Complete = true;
          planList.value = [...planList.value];
        }
      },
    });
};

const handleDelete = async (item: any) => {
  const data = {
    id: item.ID,
  };
  console.log(data, item, "item");

  const res = await deletePlan(data);
  if (res.data.code === 200) {
    emit("del", item);
    uni.showToast({
      title: "删除成功",
      icon: "success",
    });
  } else {
    uni.showToast({
      title: "删除失败",
      icon: "error",
    });
  }
  // console.log(item, "item");
};

watch(
  () => props.actionGroups,
  (newVal: any) => {
    planList.value = newVal;
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>
<style scoped>
.training-plan {
  border-radius: 8px;
  margin: 10px 0;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.plan-header {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.plan-title {
  font-weight: bold;
  font-size: 20px;
  line-height: 1.5;
}

.plan-details {
  border-top: 1px solid #037fec;
  border-image: linear-gradient(
    to right,
    #92c2f3 0%,
    #1f90f3 50%,
    #92c2f3 100%
  );
  border-image-slice: 1;
  margin-top: 20px;
  padding-top: 20px;
}

.plan-info {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.plan-dates {
  color: #888;
  margin-bottom: 10px;
}

.plan-sessions {
  list-style: none;
  padding: 0;
}

.plan-sessions li {
  margin: 5px 0;
}

.actionGroup-item {
  margin-bottom: 20px;
  word-spacing: 1.5px;
  font-size: 16px;
}
.edit-input {
  width: 100%;
  /* border: 1px solid #dcdfe6; */
  padding: 1rpx 30rpx;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  min-height: 100rpx;
}
</style>
