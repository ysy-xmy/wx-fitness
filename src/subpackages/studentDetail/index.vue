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
        style="border-radius: 75%; width: 15px; height: 15px"
        @click="showDialogAddTags = true"
        ><van-icon name="plus" color="black" size="16"
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
        style="border-radius: 75%; width: 15px; height: 15px"
        @click="showDialogAddTags = true"
        ><van-icon name="plus" color="black" size="16"
      /></van-button>
    </div>
    <div class="info mt-5 flex flex-col items-center">
      <div class="avatar">
        <img class="w-28 h-28 rounded-full" :src="stuInfo.Avatar" alt="" />
      </div>
      <h1 class="my-3 text-2xl text-center font-bold">
        {{ stuInfo.Username }}
      </h1>
      <span class="text-white font-bold text-sm text-center"
        >{{ stuInfo.Age }}岁</span
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
        <van-tab title="已完成" name="finish"></van-tab>
        <van-tab title="线下计划" name="outline"></van-tab>
        <van-tab title="线上任务" name="online"></van-tab>
      </van-tabs>
    </div>
    <van-collapse :value="activeName" @change="onChange" class="w-full">
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
        <!-- <div
          style="align-items: start"
          class="w-full flex content-start items-start bg-[rgba(248,250,255,1)] justify-center cardBody flex-wrap"
        >
          <div
            v-if="planList"
            v-for="item in planList"
            :key="item.ID"
            class="action-group w-full"
          >
            <div class="flex justify-between items-center w-full">
              <h2 class="text-xl font-extrabold px-2 py-2">
                {{ item.PlanTime }}
              </h2>
              <span
                v-if="item.show"
                class="cuIcon-unfold"
                @click="item.show = !item.show"
              ></span>
              <span
                v-else
                class="cuIcon-fold"
                @click="item.show = !item.show"
              ></span>
            </div>
            <div v-if="item.show">
              <div
                v-for="item2 in item.Actions"
                :key="item2.title"
                class="action-item flex my-1 flex-row w-full justify-between items-center"
              >
                <p class="ml-6 py-1">
                  {{ item2.ActionName }} x {{ item2.GroupNum }}组
                </p>
                <van-checkbox
                  :value="item2.Complete"
                  checked-color="#ec6853"
                  @change="changeCheck(item2)"
                ></van-checkbox>
              </div>
            </div>
          </div>
          <div v-else>
            <van-empty class="h-28" description="该课程暂无计划" />
          </div>
        </div> -->
        <PlanCard :isHideHeader="true" :status="1" :actionGroups="showList" />
      </van-collapse-item>
    </van-collapse>

    <!-- <div class="showmore w-11/12 text-center bg-[rgba(248,250,255,1)]">
      展示更多 <van-icon name="arrow-down" />
    </div> -->
    <div class="addmore w-11/12" @click="toAddClass">+ 添加课表</div>
    <van-dialog
      use-slot
      title="课程信息"
      :show="showDialog"
      show-cancel-button
      @confirm="goChooseAction"
      @close="onCloseDialog"
    >
      <van-radio-group v-model="radioType">
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
      <van-field
        type="datetime"
        :value="actionTime"
        placeholder="请输入时间"
        border="true"
        @focus="showSelectTime = true"
        @change="(e: any) => (currentDate = e.detail)"
      />
    </van-dialog>
    <van-datetime-picker
      style="z-index: 10000; width: 100vw; position: absolute; bottom: 0"
      v-if="showSelectTime"
      type="datetime"
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
        @change="changeDialogAddTags"
      />
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import PlanCard from "@/components/plan-card/index.vue";
import { computed, reactive, ref, watch } from "vue";
import { getplanlist, postPlan } from "@/api/course/index";
import { getstudentInfobyId } from "@/api/coach/index";
import { useRouter } from "uni-mini-router";
import { onMounted } from "vue";
import { useAppStore } from "@/state/app";
import { actionClok } from "@/api/courses/courses";
import dayjs from "dayjs";
import { useActionsStore } from "@/state/modules/actions";
const AppStore = useAppStore();
const actionsStore = useActionsStore();
//获取路由参数
const router = useRouter();
const stuInfo = ref();
const addClassName = ref("");
const radioType = ref("");
const title = ref(actionsStore.getClassname || "私教课");
const addTagVal = ref(""); //添加标签
const showDialogAddTags = ref(false); //是否展示弹窗输入标签
const courseInfo = ref();
const showDialog = ref(false); //显示弹窗
const CoachPunchInAuth = ref(false); //是否授权
const activeName = ref([]);
const currentDate = ref();
const minDate = new Date().getTime();
const maxDate = new Date(
  new Date().setFullYear(new Date().getFullYear() + 1)
).getTime();
const tagsList = ref<{ content: string; color: string }[]>([]);
const tagsColor = ["#00FF7F", "#FF0000", "#FFD700"];
const tabStatus = ref("finish");
const columns = ref(["私教课"]);
const showSelectTime = ref(false);
const changeTab = (e: any) => {
  console.log(e, "changeTab");
  tabStatus.value = e.detail.name;
};
const showList = computed(() => {
  return plansList.value[tabStatus.value];
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
  showDialogAddTags.value = false;
};
const onChange = (val: any) => {
  console.log(val, "onChange");
  activeName.value = val.detail;
};
const toAddClass = () => {
  //去添加课程
  showDialog.value = true;
};
const actionTime = computed(() => {
  return dayjs(currentDate.value).format("YYYY-MM-DD HH:mm:ss");
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
};
const onCloseDialog = () => {
  showDialog.value = false;
  radioType.value = "";
  addClassName.value = "";
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
  if (
    radioType.value == "" ||
    addClassName.value == "" ||
    actionTime.value == ""
  ) {
    uni.showToast({
      title: "请完善信息！",
      icon: "error",
    });
    return;
  }
  let data = {
    UserID: Number(query.value.studentId),
    UserCourseID: Number(query.value.courseId),
    Type: radioType.value,
    PlanTitle: addClassName.value,
    PlanTime: actionTime.value,
  };
  postPlan(data)
    .then((res) => {
      console.log(data, "res");
      if (res.data.code === 200) {
        uni.showToast({
          title: "添加成功！",
        });
        initData();
      } else {
        uni.showToast({
          title: "添加失败！",
          icon: "error",
        });
      }
    })
    .catch((err) => {
      uni.showToast({
        title: "添加失败！",
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
      title: "请先授权",
      icon: "none",
    });
    return;
  }
  //修改计划状态
  uni.showLoading({ title: "打卡中...", mask: true });
  actionClok(item.ID).then((res) => {
    if (res.data.code === 200) {
      item.Complete = true;
      uni.hideLoading();
      uni.showToast({
        title: "打卡成功",
        icon: "success",
      });
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
    //获取课程内容
    const response = await getplanlist(query.value.courseId);
    if (response.data.data === null || !response.data.data)
      return uni.hideLoading();
    response.data.data.forEach((item: any) => {
      let temp = {
        PlanTitle: item["PlanTitle"] || "私教课",
        PlanTime: item["PlanTime"],
        Complete: item["Complete"] ? 1 : 0,
        ID: item["ID"],

        actionGroups: item["ActionGroups"].map((it: any, ind: number) => {
          return {
            title: it["ActionGroupTitle"] || `动作${ind + 1}`,
            date: "",
            status: it["Complete"],
            List: it["PlanActions"],
            type: it["ContentType"],
          };
        }),
      };
      if (
        actionsStore.getChooseActionId != -Infinity &&
        actionsStore.getChooseActionId == item["ID"]
      ) {
        actionsStore.setPlanList(temp);
        console.log(actionsStore.setPlanList, "actionsStore.getChooseActions");
      }
      plansList.value[item["Type"].toLowerCase()].push(temp);
      if (item["Complete"]) {
        plansList.value["finish"].push(temp);
      }
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

onMounted(() => {
  query.value = router.route.value.query;
  initData();
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
  left: 20px;
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
  right: 40px;
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
</style>
