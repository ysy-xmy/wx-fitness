<template>
  <scrollFrom
    :fun="getCourses"
    :dispose="dispose"
    ref="scorllFormRef"
    :datasources="list"
  >
    <template #card>
      <div class="tab-mycourse w-full flex flex-wrap justify-center">
        <div
          @click="buycourse"
          class="course-card relative w-11/12 mt-7 rounded-lg h-auto"
          v-for="item in list"
        >
          <div
            class="w-full h-full rounded-xl bg-black absolute opacity-25"
          ></div>
          <img
            class="w-full h-full absolute rounded-xl"
            src="../../static/Overlay.png"
          />
          <img class="w-full h-44 rounded-xl" :src="item.img" />
          <div
            class="absolute text-white bottom-0 w-full p-4 pb-2 flex-wrap flex justify-start items-center"
          >
            <div class="text-left mb-3 text-2xl">{{ item.name }}</div>
            <div
              class="text-signature mb-2 w-full tracking-wider flex justify-between flex-wrap"
            >
              <div class="time-text">
                <van-icon name="clock-o" />
                <span>{{ item.time }}</span>
              </div>
              <div class="main-btn">
                <van-button
                  class="custom-class w-32"
                  round
                  type="warning"
                  color="#ffffff"
                  style="color: aqua"
                  size="small"
                  ><span class="text-lg py-2 px-5 text-[#EC6853]">查 看</span>
                </van-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #empty>
      <div class="nodata-card flex flex-col justify-center items-center w-full">
        <van-empty description="还没有课程哦~，正在加急开设哦~" />
      </div>
    </template>
  </scrollFrom>
</template>

<script setup lang="ts" name="home">
import { onMounted, reactive, ref } from "vue";
import { useAuthStore } from "@/state/modules/auth";
import { useRouter } from "uni-mini-router";
import scrollFrom from "@/components/scrollForm/index.vue";
import { getCourses } from "@/api/courses/courses";

const router = useRouter();
const authStore = useAuthStore();
type card = {
  img: string;
  name: string;
  time: string;
  id: string;
};
//7月8号 周一 2024
//私教课
//
const scorllFormRef = ref<any>(null);
let list = ref<card[]>([]);
onMounted(() => {
  uni.showLoading({ title: "数据加载中" });
  uni.$on("nextData", (val) => {
    if (val == "buy") {
      uni.showLoading();
      scorllFormRef.value.getData();
      getListData();
    }
  });
  getListData();
});
const getListData = () => {
  list.value = scorllFormRef.value?.state.list;
  if (scorllFormRef.value?.ifChange()) {
    uni.hideLoading();
    return;
  } else {
    setTimeout(() => {
      getListData();
    }, 500);
  }
};
const dispose = (item: any) => {
  return item;
};
const buycourse = () => {
  let routeData = { name: "course" };
  router.push(routeData);
};
</script>

<style scoped>
.custom-class {
  color: black !important;
}
</style>
<!-- <template>
  <div class="tab-mycourse w-full flex flex-wrap justify-center">
    <div
      @click="buycourse"
      class="course-card relative w-11/12 mt-7 rounded-lg h-auto"
      v-for="item in list"
    >
      <div class="w-full h-full rounded-xl bg-black absolute opacity-25"></div>
      <img
        class="w-full h-full absolute rounded-xl"
        src="../../static/Overlay.png"
      />
      <img class="w-full h-44 rounded-xl" :src="item.img" />
      <div
        class="absolute text-white bottom-0 w-full p-4 pb-2 flex-wrap flex justify-start items-center"
      >
        <div class="text-left mb-3 text-2xl">{{ item.name }}</div>
        <div
          class="text-signature mb-2 w-full tracking-wider flex justify-between flex-wrap"
        >
          <div class="time-text">
            <van-icon name="clock-o" />
            <span>{{ item.time }}</span>
          </div>
          <div class="main-btn">
            <van-button
              class="custom-class w-32"
              round
              type="warning"
              color="#ffffff"
              style="color: aqua"
              size="small"
              ><span class="text-lg py-2 px-5 text-[#EC6853]">查 看</span>
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="home">
import { onMounted, reactive, ref } from "vue";
import { useAuthStore } from "@/state/modules/auth";
import { useRouter } from "uni-mini-router";
import scrollFrom from "@/components/scrollForm/index.vue";
import { getCourses } from "@/api/courses/courses";
import { State } from "@/utils/layout";
// const scorllFormRef = ref<any>(null);
const router = useRouter();
const authStore = useAuthStore();
const dispose = (item: any) => {
  return item;
};
const state = new State(getCourses, dispose);
type card = {
  img: string;
  name: string;
  time: string;
  id: string;
};
//7月8号 周一 2024
//私教课
//
const len = ref(0);
let list = ref<card[]>([]);
onMounted(() => {
  uni.showLoading({ title: "数据加载中" });
  uni.$on("nextData", (val) => {
    state.changeData();
    setTimeout(() => {
      list.value = [...state.list];
    }, 1000);
  });
  state.init();
  getListData();
});
const getListData = () => {
  //   console.log(1);
  if (state.total == 0) {
    return;
  } else {
    list.value = [...state.list];
    if (list.value.length == 0)
      setTimeout(() => {
        getListData();
      }, 1000);
    else {
      uni.hideLoading();
      len.value = list.value.length;
      return;
    }
  }
};

const buycourse = () => {
  let routeData = { name: "course" };
  router.push(routeData);
};
</script>

<style scoped>
.custom-class {
  color: black !important;
}
</style> -->
