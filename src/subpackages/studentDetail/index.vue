<template>
  <div class="main flex w-full justify-center flex-col items-center">
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

    <div class="tab-title mt-2 bg-[#f8fafc] w-11/12 rounded-lg p-2">
      <div class="tab flex justify-center items-center bg-white">
        <div class="tab-item w-1/3 text-center py-3 cursor-pointer">
          <span class="text-[#F65625] tracking-widest">训 练 计 划</span>
        </div>
      </div>
    </div>
    <div
      class="cardTitle py-2 w-11/12 flex bg-[rgba(248,250,255,1)] h-10 leading-10 justify-between px-3 rounded mt-4"
    >
      <div class="font-bold">
        私教课<span
          class="ml-2 font-thin tracking-wider"
          style="color: #6d819cff; margin-left: 2px"
        ></span>
      </div>
      <!-- <van-circle class="mr-4" stroke-width="4" size="45" layer-color="#ebedf0" color="#ec6853" value="70" text="70%"
        style="margin-top: 15px" /> -->
    </div>

    <div
      style="align-items: start"
      class="w-11/12 flex content-start items-start bg-[rgba(248,250,255,1)] justify-center cardBody flex-wrap"
    >
      <div
        v-if="planList"
        v-for="item in planList"
        :key="item.ID"
        class="action-group w-full"
      >
        <div class="flex justify-between items-center w-full">
          <h2 class="text-xl font-extrabold px-2 py-2">{{ item.PlanTime }}</h2>
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
    </div>
    <div clss></div>
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
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
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
const courseInfo = ref();
const showDialog = ref(false); //显示弹窗
const CoachPunchInAuth = ref(false); //是否授权
const seeBodyForm = () => {
  const imgData = JSON.stringify(stuInfo.value.BodyCheckImg);
  router.push({
    path: `/subpackages/bodyFormDetail/index?img=${imgData}&&name=${stuInfo.value.Username}`, // 对 JSON 字符串进行编码
  });
};
const toAddClass = () => {
  //去添加课程
  showDialog.value = true;
};
const onCloseDialog = () => {
  showDialog.value = false;
  radioType.value = "";
};
const chooseType = (val: string) => {
  //选择课程类型
  radioType.value = val;
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
let planList = ref();

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
    console.log(response.data.data, "课程内容");
    if (response.data.data === null || !response.data.data)
      return uni.hideLoading();
    planList.value = response.data.data.map((item: any) => {
      return {
        ...item,
        PlanTime: formatDateString(item.PlanTime),

        show: false,
      };
    });
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
  border-bottom: 0.5px solid #e5e5e5;
}

.cardBody {
  padding-left: 0.75rem;
  padding-right: 1.5rem;
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
// }
</style>
