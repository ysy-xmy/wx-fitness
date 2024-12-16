<template>
  <div class="main-container">
    <div class="top">
      <div class="bg-img">
        <img
          class="w-full h-40"
          src="https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20241027/1730030052587.png"
          alt=""
        />
      </div>
    </div>
    <div class="info-card w-full flex justify-center p-4">
      <div class="card w-full bg-[#f7f9fb] p-3">
        <div class="card-top">
          <div class="title w-full flex justify-between items-center px-1">
            <h2 class="text-xl font-bold">{{ state.name }}</h2>
            <van-circle
              stroke-width="6"
              size="60"
              layer-color="#ebedf0"
              color="#ec6853"
              :value="state.Percentage"
              :text="state.Percentage + '%'"
              style="font-size: 13px!important"
            />
          </div>
        </div>
        <div class="card-body mt-2 flex w-full justify-between flex-nowrap">
          <div class="body-content w-2/3 text-[#666] text-ellipsis h-20 overflow-y-auto text-lg flex items-center">
            <h1>{{ state.desc? state.desc : "暂无描述" }}</h1>
          </div>
          <div
            class="body-btn w-1/3 flex-1 flex flex-col items-center justify-end"
          >
            <span class="text-[#0c96f2] text-xs w-full text-center pb-2">
              授权教练打卡
            </span>
            <div class="btn ml-2">
              <van-switch :checked="checked" @change="handleswitch" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mycourse-tabs">
      <van-tabs swipeable animated>
        <van-tab title="已完成">
          <finishedtask :list="finish"></finishedtask>
        </van-tab>
        <van-tab title="线下计划">
          <plan :list="outline"></plan>
        </van-tab>
        <van-tab title="线上任务">
          <onlinetask :list="online"></onlinetask>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup name="mycourse">
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "uni-mini-router";
import {
  cancelCoachClok,
  allowCoachClock,
  selectCoachClok,
} from "@/api/courses/courses";
import { getplanlist } from "@/api/course";
import dayjs from "dayjs";
const router = useRouter();
const state = ref({
  id: "",
  name: "",
  desc: "",
  Percentage: "",
});
// 定义 list 对象的类型
interface ActionItem {
  timesNum: number;
  groupNum: number;
  name: string;
  time: string;
}

interface PlanItem {
  id: number;
  name: string;
  groupNum: number;
  begin: string;
  end: string;
}
const finish = ref({});
const online = ref({});
const outline = ref({});
let list = reactive<{
  finish: Record<string, ActionItem[]>;
  online: Record<string, PlanItem[]>;
  outline: Record<string, any>; // outline 这里假设类型
}>({
  finish: {},
  online: {},
  outline: {},
});
const iddd = ref(0);
const courseId = ref("");
onMounted(() => {
  uni.$on("refreshAction", () => {
    console.log("刷新");
    getPlan();
  });
  // 获取路由参数
  const id = router.route.value.params?.id;
  iddd.value = router.route.value.params?.id; //直接堆了
  courseId.value = router.route.value.params?.id;
  const name = router.route.value.params?.name;
  const desc = router.route.value.params?.desc;
  const Percentage = router.route.value.params?.Percentage;
  selectCoachClok(id).then((res) => {
    console.log(res,'dfg');
    if (res.data.data == false) checked.value = false;
    else checked.value = true;
  });
  // 假设 state 已经在其他地方定义了类型
  state.value = {
    id,
    name: decodeURIComponent(name || ""), // 处理可能为 undefined 的情况
    desc: decodeURIComponent(desc || ""),
    Percentage,
  };
  getPlan();
  //模拟假数据
  // let dddd = [
  //   {
  //     ID: 1,
  //     Type: "outline",
  //     PlanTime: "2024-09-28 12:29:09",
  //     Percentage: 0,
  //     CreatedAt: "0001-01-01T00:00:00Z",
  //     Actions: [
  //       {
  //         ExerciseActionID: 18,
  //         ActionName: "由影并",
  //         GroupNum: 50,
  //         Completed: true,
  //         UpdatedAt: "2024-09-29T00:35:34.085+08:00",
  //       },
  //       {
  //         ExerciseActionID: 19,
  //         ActionName: "儿包完安米个",
  //         GroupNum: 34,
  //         Completed: false,
  //         UpdatedAt: "2024-09-27T00:25:59.23+08:00",
  //       },
  //     ],
  //   },
  //   {
  //     ID: 1,
  //     Type: "plan",
  //     PlanTime: "2024-09-28 12:29:09",
  //     Percentage: 0,
  //     CreatedAt: "0001-01-01T00:00:00Z",
  //     Actions: [
  //       {
  //         ExerciseActionID: 20,
  //         ActionName: "由影并",
  //         GroupNum: 50,
  //         Completed: true,
  //         UpdatedAt: "2024-09-27T00:35:34.085+08:00",
  //       },
  //       {
  //         ExerciseActionID: 29,
  //         ActionName: "儿包完安米个",
  //         GroupNum: 34,
  //         Completed: false,
  //         UpdatedAt: "2024-09-27T00:25:59.23+08:00",
  //       },
  //     ],
  //   },
  //   {
  //     ID: 1,
  //     Type: "outline",
  //     PlanTime: "2024-09-28 12:29:09",
  //     Percentage: 0,
  //     CreatedAt: "0001-01-01T00:00:00Z",
  //     Actions: [
  //       {
  //         ExerciseActionID: 21,
  //         ActionName: "由影并",
  //         GroupNum: 50,
  //         Completed: true,
  //         UpdatedAt: "2024-09-29T00:35:34.085+08:00",
  //       },
  //       {
  //         ExerciseActionID: 22,
  //         ActionName: "儿包完安米个",
  //         GroupNum: 34,
  //         Completed: false,
  //         UpdatedAt: "2024-09-27T00:25:59.23+08:00",
  //       },
  //     ],
  //   },
  // ];
  // 获取计划列表
});
const getPlan = () => {
  uni.showLoading({
    title: "加载中",
    mask: false
  });
  list = {
    finish: {},
    online: {},
    outline: {},
  };
  getplanlist(Number(iddd.value)).then((res) => {
    let temp = res.data.data || [];
    temp.forEach(
      (item: {
        ID: any;
        PlanTime: any;
        CreatedAt: string | number | Date | dayjs.Dayjs | null | undefined;
        Actions: any[];
        Type: string;
      }) => {
        let temp: {
          id: number;
          time: string;
          beginTime: string;
        } = {
          id: item.ID,
          time: item.PlanTime,
          beginTime: "1999",
        };
        item.Actions.forEach((i) => {
          if (i.Complete) {
            let day =
              dayjs(i.UpdatedAt).format("YYYY-MM-DD").split("-")[0] +
              "_" +
              dayjs(i.UpdatedAt).format("YYYY-MM-DD").split("-")[1] +
              "_" +
              dayjs(i.UpdatedAt).format("YYYY-MM-DD").split("-")[2];
            console.log(day, "day");
            // 处理完成的任务
            if (list["finish"][day]) {
              list["finish"][day].push({
                timesNum: i.TimesNum,
                groupNum: i.GroupNum,
                name: i.ActionName,
                time: dayjs(i.UpdatedAt).format("YYYY-MM-DD HH-MM"),
              });
            } else {
              list["finish"][day] = [
                {
                  timesNum: i.TimesNum,
                  groupNum: i.GroupNum,
                  name: i.ActionName,
                  time: dayjs(i.UpdatedAt).format("YYYY-MM-DD HH-MM"),
                  id: i.ID,
                },
              ];
            }
          } else {
            console.log(item, "未完成");
            // 处理未完成的任务，假设 item.Type 是 "plan" 或 "outline"
            const type = item.Type as "online" | "outline";
            if (list[type]) {
              // const day = item.ID; //如果用id
              const day = dayjs(i.UpdatedAt).format("YYYY-MM-DD"); //如果用时间
              if (!list[type][day]) list[type][day] = {};
              list[type][day][i.ExerciseActionID] = {
                id: i.ExerciseActionID,
                cardID: i.ID, //用来打卡的ID
                name: i.ActionName,
                groupNum: i.GroupNum,
                begin: temp["beginTime"],
                end: dayjs(i.UpdatedAt).format("YYYY-MM-DD"),
              };
            }
          }
        });
      }
    );
    uni.hideLoading();
    online.value = list["online"];
    finish.value = list["finish"];
    outline.value = list["outline"];
  });
};
//@ts-ignore
import finishedtask from "@/components/mycourse/finishedtask.vue";
//@ts-ignore
import plan from "@/components/mycourse/plan.vue";
//@ts-ignore
import onlinetask from "@/components/mycourse/onlinetask.vue";
const value = ref("");
const checked = ref(false);
const handleswitch = () => {
  uni.showModal({
    title: !checked.value ? "授权教练打卡" : "取消授权",
    content: !checked.value ? "是否授权教练打卡？" : "是否取消授权", // 注意：在uni-app中，message属性应该改为content
    confirmText: "确定", // 注意：在uni-app中，confirmButtonText属性应该改为confirmText
    cancelText: "取消", // 注意：在uni-app中，cancelButtonText属性应该改为cancelText
    success: (res) => {
      if (res.confirm) {
        if (!checked.value) {
          allowCoachClock(courseId.value).then((res) => {
            uni.showToast({
              title: "授权成功",
              icon: "success", //如果要纯文本，不要icon，将值设为'none'
              duration: 2000, //持续时间为 2秒
            });
            checked.value = !checked.value;
          });
        } else {
          cancelCoachClok(courseId.value).then((res) => {
            uni.showToast({
              title: "取消授权成功",
              icon: "success", //如果要纯文本，不要icon，将值设为'none'
              duration: 2000, //持续时间为 2秒
            });
            checked.value = !checked.value;
          });
        }
      }
    },
    fail: (err) => {
      console.error("showModal 调用失败", err);
    },
  });
};
</script>
<style scoped></style>
