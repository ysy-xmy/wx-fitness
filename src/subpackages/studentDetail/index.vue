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
        <h2 class="text-md font-bold underline text-[#F65625]">体检表</h2>
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
          >(共10节课 已上6节)</span
        >
      </div>
      <van-circle
        class="mr-4"
        stroke-width="4"
        size="45"
        layer-color="#ebedf0"
        color="#ec6853"
        value="70"
        text="70%"
        style="margin-top: 15px"
      />
    </div>

<<<<<<< HEAD
    <div class="w-11/12 flex  bg-[rgba(248,250,255,1)] justify-between cardBody" v-for="item in planList"
      :key="item.title">
      <div class="action-group  w-full">
        <div class="flex justify-between items-center w-full">
          <h2 class="title text-3xl font-extrabold px-2">{{ item.day }}</h2>
          <span class="cuIcon-unfold"></span>
        </div>
        <div class="action-item flex my-1  flex-row w-full justify-between items-center">
          <p class="ml-6 py-1 ">{{ item.title }}</p>
          <van-checkbox :value="item.finish" checked-color="#ec6853" @change="changeCheck(item)"></van-checkbox>

        </div>
        <div class="action-item my-1 flex flex-row w-full justify-between items-center">
          <p class="ml-6 py-1 ">{{ item.title }}</p>
          <van-checkbox :value="item.finish" checked-color="#ec6853" @change="changeCheck(item)"></van-checkbox>

        </div>
      </div>

=======
    <div
      class="w-11/12 flex h-16 bg-[rgba(248,250,255,1)] justify-between cardBody"
      v-for="item in planList"
      :key="item.title"
    >
      <div>
        <p class="title">{{ item.title }}</p>
        <p class="time"><span class="cuIcon-card"></span> {{ item.day }}</p>
      </div>
      <van-checkbox
        :value="item.finish"
        checked-color="#ec6853"
        @change="changeCheck(item)"
      ></van-checkbox>
>>>>>>> f2a1a9abb772040e937db8cdd55a06c09692a76a
    </div>
    <div class="showmore w-11/12 text-center bg-[rgba(248,250,255,1)]">
      展示更多 <van-icon name="arrow-down" />
    </div>
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
            data-name="OUTLINE"
            @click="() => chooseType('OUTLINE')"
          >
            <van-radio name="OUTLINE" />
          </van-cell>
          <van-cell
            title="课程计划"
            value-class="value-class"
            clickable
            data-name="planIng"
            @click="() => chooseType('planIng')"
          >
            <van-radio name="planIng" />
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
const AppStore = useAppStore();
//获取路由参数
const router = useRouter();
const stuInfo = ref();
const radioType = ref("");
const courseInfo = ref();
const showDialog = ref(false); //显示弹窗
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
      path: `/pages/home/index?isChoose=true&&stuid=${query.value.studentId}&&courid=${query.value.courseId}&&type=${radioType.value}`,
    });
  }
};
type data = {
  title: string;
  day: string;
  finish: boolean;
};
const changeCheck = (item: data) => {
  console.log(item.finish);
  item.finish = !item.finish;
};
let planList = ref([
  {
    title: "杠铃十组",
    day: "6月1日",
    finish: true,
  },
  {
    title: "杠铃十组",
    day: "6月1日",
    finish: false,
  },
  {
    title: "杠铃十组",
    day: "6月1日",
    finish: false,
  },
  {
    title: "杠铃十组",
    day: "6月1日",
    finish: false,
  },
]);
<<<<<<< HEAD


const date = ref()

=======
const query = ref({});
>>>>>>> f2a1a9abb772040e937db8cdd55a06c09692a76a
const initData = async () => {
  uni.showLoading({ title: "加载中...", mask: true });

  if (query.value) {
    const query = router.route.value.query;
    //获取个人信息
    const res = await getstudentInfobyId(query.studentId);
    stuInfo.value = res.data.data;
    //获取课程内容
    const response = await getplanlist(query.courseId);
    uni.hideLoading();
  }
};
onMounted(() => {
  query.value = router.route.value.query;
  initData();
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
