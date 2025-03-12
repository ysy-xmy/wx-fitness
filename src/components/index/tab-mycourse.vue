<template>
  <div class="tab-mycourse w-full pb-28 flex flex-wrap justify-center">
    <div v-if="Object.keys(list).length > 0" style="width: 100vw">
      <div v-for="(item, index) in Object.keys(list)" :key="index">
        <div
          v-for="it in list[item]"
          :key="it.ID"
          class="course-card"
          style="
            width: 85%;
            height: 125px;
            padding: 10px;
            background-color: #ffffff;
            margin: 10px auto;
            margin-bottom: 20px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            position: relative;
          "
        >
          <div
            style="
              width: 15px;
              height: 100%;
              background-color: #51b2a7;
              position: absolute;
              left: 0;
              top: 0;
              border-top-left-radius: 15px;
              border-bottom-left-radius: 15px;
            "
          ></div>
          <div
            class="flex-1"
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding-left: 15px;
            "
          >
            <div
              style="
                font-size: 18px;
                width: 180px;
                font-weight: bold;
                color: #333333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              <text v-if="it.CoachID !== 0"
                >私教课程 (
                {{
                  it.CourseType === "lesson" ? it.LessonCount + "节" : "包月"
                }})</text
              >
              <text v-else>自我训练</text>
            </div>
            <div
              style="
                font-size: 14px;
                color: #666666;
                margin-top: 5px;
                margin-left: 10px;
              "
            >
              <text v-if="it.CoachID !== 0"> 教练员: {{ it.CoachName }}</text>
              <text v-else>为自己安排训练计划</text>
            </div>
            <div
              v-if="it.CoachID !== 0"
              style="
                font-size: 14px;
                color: #666666;
                margin-top: 5px;
                margin-left: 10px;
              "
            >
              课程进度: {{ it.Percentage }}%
            </div>
          </div>
          <div
            class="flex-1"
            style="display: flex; justify-content: center; align-items: center"
          >
            <img
              src="https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20250101/1735724206120.png"
              alt="icon"
              style="height: 100px; width: 100px"
            />
          </div>
          <van-button
            @click="
              tomycourse(
                it.CoachID,
                it.ID,
                it.Percentage,
                it.Name,
                it.Description,
                it.CoachName,
                it.LessonCount,
                it.EndTime,
                it.CreatedAt,
                it.UserID
              )
            "
            plain
            size="small"
            style="position: absolute; right: 10px; bottom: 10px; border: none"
            color="#6bafa6"
          >
            查 看
          </van-button>
        </div>
      </div>
    </div>
    <!-- 没有数据空状态 -->
    <div
      class="nodata-card flex flex-col justify-center items-center w-full"
      v-else
    >
      <van-empty
        description="您还没有课程哦~，可以前往购买添加课程哦~"
        v-if="useAuthStore().getToken"
      />
      <van-empty description="您还没登录，请先登录" v-else />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "uni-mini-router";
import { getMycourese } from "@/api/courses/courses";
import { onMounted, reactive, ref } from "vue";
import { useAuthStore } from "@/state/modules/auth";
import { getOrderlist } from "@/subpackages/apis/order";
import dayjs from "dayjs";
import { useActionsStore } from "@/state/modules/actions";
const props = defineProps<{
  change: () => void;
}>();

type course = {
  ID: number;
  Name: string;
  Description: string;
  img: string;
  CoachName: string;
  CourseType: string;
  LessonCount: number | null;
  RemainingCount: number | null;
  RemainingTime: number | null;
};
const activeName = ref<string[]>([]);
const onChange = (event: any) => {
  activeName.value = event.detail;
};
const router = useRouter();
const tomycourse = (
  CoachID: number,
  id: string,
  Percentage: string,
  name: string,
  desc: string,
  CoachName: string,
  LessonCount: string,
  EndTime: string,
  CreatedAt: string,
  stuId: string
) => {
  console.log(id, Percentage, name, desc, LessonCount, EndTime, CreatedAt);
  if (CoachID === 0) {
    useActionsStore().setClassID(id);
    useActionsStore().setClassname(name);
    useActionsStore().setCoachID(CoachID);
    router.push({
      name: "studentDetail",
      params: {
        studentId: stuId,
        courseId: id,
        CoachPunchInAuth: "true",
      },
    });
  } else {
    useActionsStore().setClassID(id);
    router.push({
      name: "mycourse",
      params: {
        id,
        Percentage: Percentage,
        name: name,
        desc,
        CoachName: encodeURIComponent(CoachName),
        LessonCount: LessonCount,
        EndTime: EndTime,
        CreatedAt: CreatedAt,
      },
    });
  }
};
const tocourse = () => {
  props.change();
};
// const scorllFormRef = ref<any>(null);
const dispose = (item: any) => {
  return item;
};
let list = ref<any>({});
const getList = () => {
  getMycourese()
    .then((res) => {
      list.value = [];
      const temp = (res.data.data || []).sort(
        (a: any, b: any) =>
          dayjs(b.CreatedAt).valueOf() - dayjs(a.CreatedAt).valueOf()
      );
      temp.forEach((item: any) => {
        console.log(dayjs(item.CreatedAt).format("YYYY-MM"));
        if (!list.value[dayjs(item.CreatedAt).format("YYYY-MM")]) {
          list.value[dayjs(item.CreatedAt).format("YYYY-MM")] = [];
        }
        list.value[dayjs(item.CreatedAt).format("YYYY-MM")].push(dispose(item));
      });
      uni.hideLoading();
    })
    .catch((err) => {
      console.log(err);
      uni.hideLoading();
      uni.showToast({
        title: "加载数据错误",
        icon: "error",
      });
    });
};
onMounted(() => {
  uni.showLoading({ title: "数据加载中" });
  getList();
  uni.$on("alreadyBuy", () => {
    getList();
  });
  setTimeout(() => {
    uni.hideLoading();
  }, 3000);
});
</script>
<style scoped>
.course-card {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.van-circle__text {
  font-size: 8px !important;
}
.van-collapse-item__title {
  background-color: rgba(59, 213, 221, 1) !important;
}
</style>
