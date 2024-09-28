<template>
  <div class="tab-mycourse w-full flex flex-wrap justify-center pb-20">
    <!-- 我的课程 -->
    <div
      class="course-card mt-5 rounded-lg bg-[#e7eeff] w-11/12 flex flex-row h-36"
      v-for="(item, index) in courseList"
      v-if="courseList.length > 0"
    >
      <img class="w-1/3 h-full" :src="item.img" />
      <div class="main-content py-3 w-2/3 h-full content-evenly flex flex-wrap">
        <div class="w-full top flex justify-between">
          <h1 class="text-2xl">{{ item.Name }}</h1>
          <div>
            <van-circle
              stroke-width="8"
              size="40"
              color="#ec6853"
              value="60"
              text="20%"
              class="mr-[0.75rem]"
            />
          </div>
        </div>
        <div class="mt-2 middle w-full flex justify-center">
          <span>授课老师：{{ item.CoachName }}</span>
        </div>
        <div class="main-btn mt-4 flex px-8 w-full justify-between">
          <van-button
            class="custom-class"
            @click="tomycourse"
            round
            type="warning"
            color="#ffffff"
            size="small"
            ><span class="text-lg tracking-widest text-[#EC6853]"
              >&nbsp;查 看</span
            >
          </van-button>
          <van-button
            class="custom-class ml-2"
            round
            type="warning"
            color="#ffffff"
            size="small"
            ><span
              @click="tomycourse"
              class="tracking-widest text-lg w-20 text-[#EC6853]"
              >&nbsp;打 卡</span
            >
          </van-button>
        </div>
      </div>
    </div>

    <!-- 没有数据空状态 -->
    <div
      class="nodata-card flex flex-col justify-center items-center w-full"
      v-else
    >
      <van-empty description="您还没有课程哦~，可以前往购买添加课程哦~" />
    </div>
    <van-button
      @click="tocourse"
      round
      type="primary"
      color="#fd7d46"
      class="bottom-button mt-3"
      >去 添 加</van-button
    >
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "uni-mini-router";
import { getMycourese } from "@/api/courses/courses";
import { onMounted, reactive } from "vue";
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
const router = useRouter();
const courseList = reactive<course[]>([]);
const tomycourse = () => {
  router.push({ name: "mycourse" });
};

const tocourse = () => {
  router.push({ name: "course" });
};
const getList = async () => {
  const res = await getMycourese();
  const courseList = res.data;
};
onMounted(async () => {});
</script>
