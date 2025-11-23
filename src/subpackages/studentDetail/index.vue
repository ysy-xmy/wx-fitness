<template>
  <div class="main flex w-full justify-center flex-col items-center">
    <img
      src="https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20241231/1735586047169.png"
      alt=""
      class="bg"
    />
    <div class="tags-left">
      <van-tag
        round
        v-for="item in tagsList.slice(0, 6)"
        :key="item"
        size="large"
        class="tag"
        :color="item.color"
        closeable="true"
        @close="deleteTag(item)"
        >{{ item.content }}</van-tag
      >
      <van-button
        v-if="tagsList.length < 6"
        color="#F0FFFF"
        class="tag"
        style="border-radius: 75%"
        @click="showDialogAddTags = true"
        ><van-icon name="plus" color="black" size="12"
      /></van-button>
    </div>
    <div class="tags-right" v-if="tagsList.length >= 6">
      <van-tag
        round
        v-for="item in tagsList.slice(6, 12)"
        :key="item"
        :color="item.color"
        size="large"
        class="tag"
        closeable="true"
        @close="deleteTag(item)"
        >{{ item.content }}</van-tag
      >
      <van-button
        v-if="tagsList.length < 12"
        color="#F0FFFF"
        class="tag"
        style="border-radius: 75%"
        @click="showDialogAddTags = true"
        ><van-icon name="plus" color="black" size="12"
      /></van-button>
    </div>
    <div class="info mt-5 flex flex-col items-center">
      <div class="avatar">
        <img
          class="w-28 h-28 rounded-full"
          :src="
            stuInfo.Avatar ||
            'https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20250105/1736063470137.png'
          "
          alt=""
        />
      </div>

      <h1 class="mt-1 text-2xl text-center font-bold text-white">
        {{ stuInfo.Username || "默认用户" }}
      </h1>
      <h5 class="text-sm text-center text-red" v-if="remark">({{ remark }})</h5>

      <span class="text-white font-bold text-sm text-center"
        >{{ stuInfo.Age || "暂未填写" }}岁</span
      >
    </div>

    <div class="info-card flex flex-row items-center mt-1 w-11/12">
      <div class="card p-5 w-1/3 flex justify-center flex-col items-center">
        <h2 class="text-xl font-bold">{{ stuInfo.Weight }}kg</h2>
        <span class="text-gray-400 text-sm">体重</span>
      </div>
      <div class="card p-5 w-1/3 flex justify-center flex-col items-center">
        <h2 class="text-xl font-bold">{{ stuInfo.Height }}cm</h2>
        <span class="text-gray-400 text-sm">身高</span>
      </div>
      <div class="card p-5 w-1/3 flex justify-center flex-col items-center">
        <h2
          class="text-md font-bold underline text-[#00bfff]"
          @click="seeBodyForm"
        >
          体检表
        </h2>
      </div>
    </div>

    <div class="tab-title mt-2 bg-[#f8fafc] w-full">
      <van-tabs :active="tabStatus" @change="changeTab">
        <van-tab
          title="线下计划"
          name="outline"
          v-if="courseType !== 'online_auto' && courseType !== 'online_video'"
        ></van-tab>
        <van-tab title="线上任务" name="online"></van-tab>
        <van-tab title="已完成" name="finish"></van-tab>
      </van-tabs>
    </div>
    <van-collapse
      :value="activeName"
      @change="onChange"
      class="w-full"
      v-if="tabStatus != 'finish'"
    >
      <van-collapse-item name="1">
        <template v-slot:title>
          <div class="cardTitle py-2 w-full leading-10 px-3 rounded">
            <div class="font-bold">
              {{ title
              }}<span
                class="ml-2 font-thin tracking-wider"
                style="color: #6d819cff; margin-left: 2px"
              ></span>
            </div>
            <div
              style="
                font-size: 14px;
                margin-top: 10px;
                width: 100%;
                display: flex;
                font-weight: 500;
                justify-content: space-between;
              "
            >
              <!-- <div>{{ item.day }} (起始时间)</div> -->
              <div>进行中</div>
            </div>
          </div>
        </template>
        <PlanCard
          :isHideHeader="true"
          :status="1"
          :actionGroups="showList"
          @del="deletePlan"
        />
      </van-collapse-item>
    </van-collapse>

    <van-collapse
      :value="activeName"
      @change="onChange"
      class="w-full"
      v-if="tabStatus == 'finish'"
    >
      <van-collapse-item name="online">
        <template v-slot:title>
          <div class="cardTitle py-2 w-full leading-10 px-3 rounded">
            <div class="font-bold">
              {{ title
              }}<span
                class="ml-2 font-thin tracking-wider"
                style="color: #6d819cff; margin-left: 2px"
              ></span>
            </div>
            <div
              style="
                font-size: 14px;
                margin-top: 10px;
                width: 100%;
                display: flex;
                font-weight: 500;
                justify-content: space-between;
              "
            >
              <!-- <div>{{ item.day }} (起始时间)</div> -->
              <div>线上任务</div>
            </div>
          </div>
        </template>
        <PlanCard
          :isHideHeader="true"
          :status="1"
          :actionGroups="
            showList.filter(
              (item) =>
                item.Type === 'online_auto' || item.Type === 'online_video'
            )
          "
          @del="deletePlan"
        />
      </van-collapse-item>
    </van-collapse>

    <van-collapse
      :value="activeName"
      @change="onChange"
      class="w-full"
      v-if="
        tabStatus == 'finish' &&
        courseType !== 'online_auto' &&
        courseType !== 'online_video'
      "
    >
      <van-collapse-item name="outline">
        <template v-slot:title>
          <div class="cardTitle py-2 w-full leading-10 px-3 rounded">
            <div class="font-bold">
              {{ title
              }}<span
                class="ml-2 font-thin tracking-wider"
                style="color: #6d819cff; margin-left: 2px"
              ></span>
            </div>
            <div
              style="
                font-size: 14px;
                margin-top: 10px;
                width: 100%;
                display: flex;
                font-weight: 500;
                justify-content: space-between;
              "
            >
              <!-- <div>{{ item.day }} (起始时间)</div> -->
              <div>线下计划</div>
            </div>
          </div>
        </template>
        <PlanCard
          :isHideHeader="true"
          :status="1"
          :actionGroups="showList.filter((item) => item.Type === 'outline')"
          @del="deletePlan"
        />
      </van-collapse-item>
    </van-collapse>

    <div class="addmore w-11/12" @click="toAddClass">+ 添加课表</div>
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
            title="在线任务"
            value-class="value-class"
            clickable
            data-name="ONLINE"
            @click="() => chooseType('ONLINE')"
          >
            <van-radio name="ONLINE" />
          </van-cell>
          <van-cell
            title="线下任务"
            value-class="value-class"
            clickable
            data-name="OUTLINE"
            @click="() => chooseType('OUTLINE')"
            v-if="courseType !== 'online_auto' && courseType !== 'online_video'"
          >
            <van-radio name="OUTLINE" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-field
        :value="addClassName"
        placeholder="请输入课程名"
        border="true"
        @change="onChangeAddClassName"
      />
      <view class="cu-form-group">
        <view class="title">日期选择</view>
        <picker
          mode="date"
          :value="actionTime"
          @change="(e: any) => (currentDate = e.detail.value)"
        >
          <view class="picker">
            {{ actionTime }}
          </view>
        </picker>
      </view>
    </van-dialog>
    <van-datetime-picker
      style="z-index: 10000; width: 100vw; position: absolute; bottom: 0"
      v-if="showSelectTime"
      type="date"
      :value="currentDate"
      :min-date="minDate"
      :max-date="maxDate"
      @input="onInput"
      @confirm="showSelectTime = false"
      @cancel="showSelectTime = false"
    />
    <van-dialog
      use-slot
      title="添加标签"
      :show="showDialogAddTags"
      show-cancel-button
      @confirm="addTags"
      @close="
        () => {
          addTagVal = '';
          showDialogAddTags = false;
        }
      "
    >
      <van-field
        :value="addTagVal"
        placeholder="输入标签"
        maxlength="7"
        @change="changeDialogAddTags"
      />
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import PlanCard from "@/components/plan-card/index.vue";
import { computed, reactive, ref, watch } from "vue";
import { getCoursePlan, getplanlist, postPlan } from "@/api/course/index";
import { getstudentInfobyId } from "@/api/coach/index";
import { useRouter } from "uni-mini-router";
import { onMounted } from "vue";
import { useAppStore } from "@/state/app";
import {
  actionClok,
  getCourseStudentTag,
  sendCourseStudentTag,
} from "@/api/courses/courses";
import dayjs from "dayjs";
import { useActionsStore } from "@/state/modules/actions";
const AppStore = useAppStore();
const actionsStore = useActionsStore();
//获取路由参数
const router = useRouter();
const stuInfo = ref();
const addClassName = ref();
const radioType = ref("");
const title = ref(actionsStore.getClassname || "私教课");
const addTagVal = ref(""); //添加标签
const showDialogAddTags = ref(false); //是否展示弹窗输入标签
const courseInfo = ref();
const showDialog = ref(false); //显示弹窗
const CoachPunchInAuth = ref(false); //是否授权
const activeName = ref([]);
const currentDate = ref(new Date().getTime());
const minDate = dayjs().format("YYYY-MM-DD");
const maxDate = dayjs().add(1, "year").format("YYYY-MM-DD");
const tagsList = ref<{ content: string; color: string }[]>([]);
const tagsColor = ["rgb(144,199,97)", "rgb(226,198,29)", "rgb(217,9,84)"];
const tabStatus = ref("outline");
const columns = ref(["私教课"]);
const courseType = ref("");
const showSelectTime = ref(false);
const changeTab = (e: any) => {
  console.log(e, "changeTab");
  tabStatus.value = e.detail.name;
};
const deletePlan = (item: any) => {
  console.log(item, "deletePlan");
  //planList里面三个全部查看，用filter过滤掉
  Object.keys(plansList.value).forEach((key) => {
    plansList.value[key] = plansList.value[key].filter(
      (i: any) => i.ID !== item.ID
    );
  });
};
const showList = computed(() => {
  return plansList.value[tabStatus.value];
});
const remark = computed(() => {
  return actionsStore.getRemark;
});
const onInput = (e: any) => {
  console.log(e, "onInput");
  currentDate.value = e.detail;
};
const seeBodyForm = () => {
  const imgData = JSON.stringify(stuInfo.value.BodyCheckImg);
  router.push({
    path: `/subpackages/bodyFormDetail/index?img=${imgData}&&name=${stuInfo.value.Username}`, // 对 JSON 字符串进行编码
  });
};
const addTags = () => {
  tagsList.value.push({
    content: addTagVal.value,
    color: tagsColor[Math.floor(Math.random() * tagsColor.length)],
  });
  changeTags("add");
};
const changeTags = (type: "add" | "delete") => {
  let data = {
    UserCourseID: Number(query.value.courseId),
    Labels: tagsList.value.map((item) => item.content),
  };
  sendCourseStudentTag(data)
    .then((res) => {
      console.log(res, "res");
      if (res.data.code === 200) {
        uni.showToast({
          title: type == "add" ? "添加成功" : "删除成功",
        });
        showDialogAddTags.value = false;
      } else {
        uni.showToast({
          title: type == "add" ? "添加失败" : "删除失败",
          icon: "none",
        });
      }
    })
    .catch((err) => {
      uni.showToast({
        title: type == "add" ? "添加失败" : "删除失败",
        icon: "none",
      });
    });
};
const onChange = (val: any) => {
  activeName.value = val.detail;
};
const toAddClass = () => {
  //去添加课程
  showDialog.value = true;
};
const actionTime = computed(() => {
  return dayjs(currentDate.value).format("YYYY-MM-DD");
});
const onChangeAddClassName = (e: any) => {
  addClassName.value = e.detail;
};
const changeClass = (e: any) => {
  const { picker, value, index } = e.detail;
  console.log(picker, value, index, "changeClass");
};
const plansList = ref<any>({
  online: [],
  outline: [],
  finish: [],
});
const deleteTag = (item: any) => {
  console.log(item, "deleteTag");
  tagsList.value = tagsList.value.filter((tag) => tag !== item);
  changeTags("delete");
};
const onCloseDialog = () => {
  showDialog.value = false;
  radioType.value = "OUTLINE";
  addClassName.value = "";
  currentDate.value = new Date().getTime();
};
const selectTime = (e: any) => {
  // e.preventDefault();
  uni.hideKeyboard();
  showSelectTime.value = true;
};
const chooseType = (val: string) => {
  //选择课程类型
  radioType.value = val;
};
const changeDialogAddTags = (e: any) => {
  console.log(e, "addTagVal");
  addTagVal.value = e.detail;
};
const goChooseAction = () => {
  // 更详细的参数验证
  if (!radioType.value) {
    uni.showToast({
      title: "请选择课程类型",
      icon: "error",
    });
    return;
  }

  if (!addClassName.value?.trim()) {
    uni.showToast({
      title: "请输入课程名称",
      icon: "error",
    });
    return;
  }

  if (!currentDate.value) {
    uni.showToast({
      title: "请选择日期",
      icon: "error",
    });
    return;
  }

  const data = {
    UserID: Number(query.value.studentId),
    UserCourseID: Number(query.value.courseId),
    Type: radioType.value,
    PlanTitle: addClassName.value.trim(),
    PlanTime: dayjs(currentDate.value).format("YYYY-MM-DD"),
  };
  postPlan(data)
    .then((res) => {
      if (res.data.code === 200) {
        uni.showToast({
          title: "添加成功！",
        });
        onCloseDialog();
        setTimeout(() => {
          initData();
        }, 2500);
      } else {
        uni.showToast({
          title: res.data.msg || "添加失败！", // 显示后端返回的错误信息
          icon: "error",
        });
      }
    })
    .catch((err) => {
      uni.showToast({
        title: err.response?.data?.msg || "网络请求失败！", // 显示错误信息
        icon: "error",
      });
    });
};
type data = {
  title: string;
  day: string;
  finish: boolean;
};
const changeCheck = (item: any) => {
  if (item.Complete) return;
  //判断是否已经授权，如果没有授权，提示
  if (!CoachPunchInAuth.value) {
    uni.showToast({
      title: "请先获取授权",
      icon: "none",
    });
    return;
  }
  //修改计划状态
  uni.showLoading({ title: "打卡中...", mask: true });
  actionClok(item.ID).then((res) => {
    if (res.data.code === 200) {
      uni.hideLoading();
      uni.showToast({
        title: "打卡成功",
        icon: "success",
      });
      setTimeout(() => {
        initData();
      }, 2200);
    } else {
      uni.showToast({
        title: "打卡失败",
        icon: "none",
      });
    }
  });
  // console.log(params, "修改计划状态");
  // const response = await changePlanStatus(params);
};

const query = ref();
const initData = async () => {
  if (query.value) {
    plansList.value = {
      online: [],
      outline: [],
      finish: [],
    };
    uni.showLoading({ title: "加载中...", mask: true });
    // const query = router.route.value.query;
    CoachPunchInAuth.value = query.value.CoachPunchInAuth;
    //获取个人信息
    const res = await getstudentInfobyId(query.value.studentId);
    stuInfo.value = res.data.data;
    // const r = await getCoursePlan(query.value.courseId);
    // console.log(r, "r");
    //获取课程内容
    const response = await getCoursePlan(query.value.courseId);
    console.log(response, "response获取课程成功");
    if (response.data.data === null || !response.data.data)
      return uni.hideLoading();
    response.data.data.forEach((item: any) => {
      let temp = {
        PlanTitle: item["PlanTitle"] || "私教课",
        PlanTime: item["PlanTime"],
        Complete: item["Complete"] ? 1 : 0,
        ID: item["ID"],
        Type: item["Type"],
        actionGroups: (item["ActionGroups"] || []).map(
          (it: any, ind: number) => {
            return {
              title: it["ActionGroupTitle"] || `动作${ind + 1}`,
              date: "",
              status: it["Complete"],
              List: it["PlanActions"],
              type: it["ContentType"],
            };
          }
        ),
      };
      if (
        actionsStore.getChooseActionId != -Infinity &&
        actionsStore.getChooseActionId == item["ID"]
      ) {
        actionsStore.setPlanList(temp);
        console.log(actionsStore.setPlanList, "actionsStore.getChooseActions");
      }
      // actionsStore.setFindActionData({
      //   ID: item["ID"],
      //   Type: item["Type"].toUpperCase(),
      // });

      if (item["Complete"]) {
        plansList.value["finish"].push(temp);
      } else plansList.value[item["Type"].toLowerCase()].push(temp);
    });
    console.log(plansList.value, "plansList");
    uni.hideLoading();
  }
};
//格式化日期
function formatDateString(dateStr: string) {
  // 解析日期字符串
  const date = new Date(dateStr);

  // 获取月份和日期
  const month = date.getMonth() + 1; // getMonth() 返回的月份是从0开始的，所以要加1
  const day = date.getDate();

  // 返回格式化的字符串
  return `${month}月${day}`;
}
//获取标签
const getTags = async () => {
  const res = await getCourseStudentTag(query.value.courseId);
  console.log(res, "res");
  tagsList.value = [];
  res.data.data.Labels.forEach((item: any) => {
    if (item)
      tagsList.value.push({
        content: item,
        color: tagsColor[Math.floor(Math.random() * tagsColor.length)],
      });
  });
};
// const onConfirmDate = (value: any) => {
//   currentDate.value = value;
//   showSelectTime.value = false;
// };
onMounted(() => {
  query.value = router.route.value.query;
  courseType.value = query.value.CourseType;
  initData();
  getTags();
  uni.$on("getNew", () => {
    initData();
  });
  uni.$on("reload", () => {
    console.log("重新获取");
    initData();
    console.log(actionsStore.getChooseActionId, "plansList");
  });
});
</script>

<style scoped lang="scss">
.cardTitle {
  align-items: center;
  vertical-align: middle;
  border-radius: 5px;
  border-bottom: 2px solid skyblue;
}

.cardBody {
  align-items: center;
  vertical-align: middle;

  //
  .title {
    font-weight: 400;
    font-size: large;
    color: #282c37ff;
  }

  .time {
    margin-top: 7px;
    color: #6d819cff;
    font-size: 14px;
  }

  // &:last-child {
  //   // border-radius: 5px;
  // }
}

.showmore {
  height: 25px;
  line-height: 25px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom: 0.5px solid gray;
}

.addmore {
  text-align: right;
  padding-right: 15px;
  color: #ff5e3aff;
  height: 42px;
  line-height: 42px;
}
.bg {
  // background-color: skyblue;
  width: 100%;
  height: 270px;
  z-index: -1;
  position: absolute;
  opacity: 0.7;
  top: 0;
  left: 0;
  // -webkit-clip-path: polygon(
  //   58% 0,
  //   100% 0,
  //   100% 35%,
  //   100% 71%,
  //   67% 50%,
  //   31% 58%,
  //   10% 70%,
  //   0 51%,
  //   0% 35%,
  //   0 0
  // );
  // clip-path: polygon(
  //   58% 0,
  //   100% 0,
  //   100% 35%,
  //   100% 71%,
  //   67% 50%,
  //   31% 58%,
  //   10% 70%,
  //   0 51%,
  //   0% 35%,
  //   0 0
  // );
  // .progress {
  //   width: 35px;
  //   height: 35px;
  //   border-color: white;
  //   border-radius: 75%;
  //   position: relative;
  //   &::after {
  //     content: "75%";
  //     position: absolute;
  //     border-radius: 75%;
  //     font-size: small;
  //     line-height: 35px;
  //     text-align: center;
  //     width: 35px;
  //     height: 35px;
  //     background-color: orange;
  //     top: 0;
  //     left: 0;
  //   }
}
.tags-left {
  height: 220px;
  position: absolute;
  top: 10px;
  left: 0px;
  display: flex;
  flex-direction: column;

  .tag {
    font-weight: 700;
    color: white;
    margin-top: 15px;
    &:nth-child(1) {
      margin-left: 40px;
    }
    &:nth-child(2) {
      margin-left: 30px;
    }
    &:nth-child(3) {
      margin-left: 20px;
    }
    &:nth-child(4) {
      margin-left: 20px;
    }
    &:nth-child(5) {
      margin-left: 30px;
    }
    &:nth-child(6) {
      margin-left: 40px;
    }
  }
}

.tags-right {
  height: 220px;
  position: absolute;
  top: 10px;
  right: 0px;
  display: flex;
  flex-direction: column;
  .tag {
    margin-top: 15px;
    &:nth-child(1) {
      margin-left: 0px;
    }
    &:nth-child(2) {
      margin-left: 10px;
    }
    &:nth-child(3) {
      margin-left: 20px;
    }
    &:nth-child(4) {
      margin-left: 20px;
    }
    &:nth-child(5) {
      margin-left: 10px;
    }
    &:nth-child(6) {
      margin-left: 0px;
    }
  }
}
:deep(.van-tabs__line) {
  background-color: #00bfff;
}
:deep(.van-button--normal) {
  padding: 0 10px !important;
}
</style>
