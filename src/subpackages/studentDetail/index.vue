<template>
  <div class="main flex w-full justify-center flex-col items-center">
    <img src="@/static/wave-bg.png" alt="" class="bg" />
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
      <span class="text-gray-400 text-sm text-center">{{ stuInfo.Age }}岁</span>
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
          class="text-md font-bold underline text-[#F65625]"
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
      title="选择课程类型"
      :show="showDialog"
      show-cancel-button
      @confirm="goChooseAction"
      @close="onCloseDialog"
    >
      <van-picker :columns="columns" @change="changeClass" />
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
    </van-dialog>

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
import { getplanlist } from "@/api/course/index";
import { getstudentInfobyId } from "@/api/coach/index";
import { useRouter } from "uni-mini-router";
import { onMounted } from "vue";
import { useAppStore } from "@/state/app";
import { actionClok } from "@/api/courses/courses";
const AppStore = useAppStore();
//获取路由参数
const router = useRouter();
const stuInfo = ref();
const radioType = ref("");
const title = ref(uni.getStorageSync("classname") || "私教课");
const addTagVal = ref(""); //添加标签
const showDialogAddTags = ref(false); //是否展示弹窗输入标签
const courseInfo = ref();
const showDialog = ref(false); //显示弹窗
const CoachPunchInAuth = ref(false); //是否授权
const activeName = ref([]);
const tagsList = ref<{ content: string; color: string }[]>([]);
const tagsColor = ["#00FF7F", "#FF0000", "#FFD700"];
const tabStatus = ref("finish");
const columns = ref(["私教课"]);

const changeTab = (e: any) => {
  console.log(e, "changeTab");
  tabStatus.value = e.detail.name;
};
const showList = computed(() => {
  return plansList.value[tabStatus.value];
});
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
  if (radioType.value == "") {
    uni.showToast({
      title: "请选择课程类型",
      icon: "error",
    });
  } else {
    AppStore.setactive("action");
    router.push({
      path: `/pages/home/index?isChoose=true&&stuid=${query.value.studentId}&&courid=${query.value.courseId}&&type=${radioType.value}&&name=${stuInfo.value.Username}`,
    });
  }
};
type data = {
  title: string;
  day: string;
  finish: boolean;
};
const changeCheck = (item: data) => {
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
        title: item["PlanTitle"] || "私教课",
        day: item["PlanTime"],
        status: item["Complete"] ? 1 : 0,
        id: item["ID"],

        actionGroups: item["ActionGroups"].map((it: any, ind: number) => {
          return {
            title: it["ActionGroupTitle"] || `动作${ind + 1}`,
            date: "",
            status: it["Complete"] || 0,
            List: it["PlanActions"],
            type: it["ContentType"],
          };
        }),
      };
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
  height: 300px;
  z-index: -1;
  position: absolute;
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
