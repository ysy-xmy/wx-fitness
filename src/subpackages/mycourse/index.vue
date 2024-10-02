<template>
  <div class="main-container">
    <div class="top">
      <div class="bg-img">
        <img
          class="w-full h-56"
          src="https://img95.699pic.com/photo/50195/4017.jpg_wh860.jpg"
          alt=""
        />
      </div>
    </div>
    <div class="info-card w-full flex justify-center p-4">
      <div class="card w-full bg-[#f9fafb] p-3">
        <div class="card-top">
          <div class="title w-full flex justify-between items-center">
            <h2 class="text-xl font-bold">{{ state.name }}</h2>
            <van-circle
              stroke-width="8"
              size="60"
              layer-color="#ebedf0"
              color="#ec6853"
              :value="state.Percentage"
              :text="state.Percentage + '%'"
            />
          </div>
        </div>
        <div class="card-body mt-2 flex w-full justify-between flex-nowrap">
          <div class="body-content w-2/3 text-lg flex items-center">
            <h1>{{ state.desc }}</h1>
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
          <finishedtask :list="list['finish']"></finishedtask>
        </van-tab>
        <van-tab title="计划表">
          <plan :list="list['plan']"></plan>
        </van-tab>
        <van-tab title="线上任务">
          <onlinetask :list="list['outline']"></onlinetask>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup name="mycourse">
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "uni-mini-router";
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

const list = reactive<{
  finish: Record<string, ActionItem[]>;
  plan: Record<string, PlanItem[]>;
  outline: Record<string, any>; // outline 这里假设类型
}>({
  finish: {},
  plan: {},
  outline: {},
});

onMounted(() => {
  // 获取路由参数
  console.log(router.route.value.params);
  const id = router.route.value.params?.id;
  const name = router.route.value.params?.name;
  const desc = router.route.value.params?.desc;
  const Percentage = router.route.value.params?.Percentage;

  // 假设 state 已经在其他地方定义了类型
  state.value = {
    id,
    name: decodeURIComponent(name || ""), // 处理可能为 undefined 的情况
    desc: decodeURIComponent(desc || ""),
    Percentage,
  };

  // 获取计划列表
  getplanlist(Number(id)).then((res) => {
    res.data.forEach(
      (item: {
        id: any;
        PlanTime: any;
        CreatedAt: string | number | Date | dayjs.Dayjs | null | undefined;
        Actions: any[];
        Type: string;
      }) => {
        let temp: {
          ID: number;
          time: string;
          beginTime: string;
        } = {
          ID: item.id,
          time: item.PlanTime,
          beginTime: dayjs(item.CreatedAt).format("YYYY-MM-DD"),
        };

        item.Actions.forEach((i) => {
          if (i.Completed) {
            // 处理完成的任务
            if (list["finish"][temp["beginTime"]]) {
              list["finish"][temp["beginTime"]].push({
                groupNum: i.groupNum,
                name: i.ActionName,
                time: dayjs(i.UpdatedAt).format("YYYY-MM-DD"),
              });
            } else {
              list["finish"][temp["beginTime"]] = [
                {
                  groupNum: i.groupNum,
                  name: i.ActionName,
                  time: dayjs(i.UpdatedAt).format("YYYY-MM-DD"),
                },
              ];
            }
          } else {
            // 处理未完成的任务，假设 item.Type 是 "plan" 或 "outline"
            const type = item.Type as "plan" | "outline";
            if (list[type]) {
              list[type].push({
                id: i.ExerciseActionID,
                name: i.ActionName,
                groupNum: i.GroupNum,
                begin: temp["beginTime"],
                end: dayjs(i.UpdatedAt).format("YYYY-MM-DD"),
              });
            }
          }
        });
      }
    );
  });
});

//@ts-ignore
import finishedtask from "@/components/mycourse/finishedtask.vue";
//@ts-ignore
import plan from "@/components/mycourse/plan.vue";
//@ts-ignore
import onlinetask from "@/components/mycourse/onlinetask.vue";
const value = ref("");
const checked = ref(false);
const handleswitch = (newValue) => {
  if (!checked.value) {
    uni.showModal({
      title: "授权教练打卡",
      content: "是否授权教练打卡？", // 注意：在uni-app中，message属性应该改为content
      confirmText: "确定", // 注意：在uni-app中，confirmButtonText属性应该改为confirmText
      cancelText: "取消", // 注意：在uni-app中，cancelButtonText属性应该改为cancelText
      success: (res) => {
        if (res.confirm) {
          console.log("用户点击确定");
          // 在这里执行用户点击确定的操作
          checked.value = true;
          console.log(checked.value);
        } else if (res.cancel) {
          console.log("用户点击取消");
          // 在这里执行用户点击取消的操作
          checked.value = false;
        }
      },
      fail: (err) => {
        console.error("showModal 调用失败", err);
      },
    });
  } else {
    checked.value = false;
  }
};
</script>
<style scoped></style>
