<template>
  <div class="tab-mycourse w-full pb-28 flex flex-wrap justify-center">
    <van-collapse
      :value="activeName"
      v-if="Object.keys(list).length > 0"
      @change="onChange"
      style="width: 100vw"
    >
      <van-collapse-item
        :name="item"
        v-for="(item, index) in Object.keys(list)"
      >
        <template v-slot:title
          ><div style="background: rgba(59, 213, 221, 1)">
            {{ item }}
          </div></template
        >
        <div
          style="display: flex; justify-content: space-between; flex-wrap: wrap"
        >
          <div
            v-for="it in list[item]"
            style="
              width: 190px;
              height: 110px;
              padding: 2px;
              background-color: rgba(15, 98, 56, 1);
              margin: 5px 0;
              border-radius: 20px;
              display: flex;
              align-items: center;
            "
          >
            <div
              class="flex-[1.5]"
              style="display: flex; flex-direction: column; align-items: center"
            >
              <div style="font-size: 12px; color: #ffffff">私教</div>
              <div
                style="
                  font-size: 18px;
                  color: #ffffff;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ it.Name }}
              </div>
              <div style="font-size: 12px; color: #ffffff; margin-top: 10px">
                教练: {{ it.CoachName }}
              </div>
            </div>
            <div
              class="flex-1 mr-2"
              style="display: flex; flex-direction: column; align-items: center"
            >
              <van-circle :value="100 - it.Percentage" size="60"
                ><span style="color: white">
                  {{ 100 - it.Percentage + "%" }}</span
                ></van-circle
              >
              <div
                @click="
                  tomycourse(it.ID, it.Percentage, it.Name, it.Description)
                "
                style="
                  width: 60px;
                  height: 25px;
                  border: 3px solid #ffffff;
                  color: #ffffff;
                  text-align: center;
                  border-radius: 12px 12px 12px 12px;
                "
              >
                查 看
              </div>
            </div>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <!-- 我的课程 -->
    <!-- <div
    v-if="list.length > 0"
      class="course-card mt-5 text-[#303440] rounded-lg w-11/12 bg-[#f7f9fb] relative flex flex-row h-36"
      v-for="(item, index) in list"
    >
      <img class="w-1/3 h-full rounded-l-lg" :src="item.Img" />
      <div class="main-content py-3 w-2/3 h-full content-evenly flex flex-wrap">
        <div class="w-full top flex justify-between">
          <h1 class="text-2xl px-2 text-ellipsis flex-1 overflow-hidden whitespace-nowrap">{{ item.Name }}</h1>
          <div class="w-10 mr-2">
            <van-circle
              stroke-width="4"
              size="45"
              color="#6eaaac"
              :value="item.Percentage"
              :text="item.Percentage + '%'"
              style="font-size: 13px!important;"
            />
          </div>
        </div>
        <div class="mt-2 middle w-full flex justify-center">
          <span>教练：{{ item.CoachName }}</span>
        </div>
        <div class="main-btn mt-4 flex px-8 w-full justify-end">
          <van-button
            class="custom-class"
            @click="
              tomycourse(item.ID, item.Percentage, item.Name, item.Description)
            "
            round
            type="warning"
            color="#ffffff"
            size="small"
            ><span class="text-lg tracking-widest text-[#6eaaac]">查 看</span>
          </van-button>
        </div>
      </div>
    </div> -->
    <!-- 没有数据空状态 -->
    <div
      class="nodata-card flex flex-col justify-center items-center w-full"
      v-else
    >
      <van-empty description="您还没有课程哦~，可以前往购买添加课程哦~" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "uni-mini-router";
import { getMycourese } from "@/api/courses/courses";
import { onMounted, reactive, ref } from "vue";
import { getOrderlist } from "@/subpackages/apis/order";
import dayjs from "dayjs";
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
  id: string,
  Percentage: string,
  name: string,
  desc: string
) => {
  console.log({
    id,
    Percentage,
    name,
    desc,
  });
  router.push({
    // path: `/subpackages/mycourse/index?id=${id}&&Percentage=${Percentage}&&name=${name}&&desc=${desc}`,
    name: "mycourse",
    params: {
      id,
      Percentage: Percentage,
      name: name,
      desc,
    },
  });
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
      console.log(list.value);
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
