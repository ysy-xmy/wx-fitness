<template>
  <div class="mine-page w-screen relative min-h-screen bg-[#fafafa]">
    <div class="mine-header w-full h-64 relative">
      <img
        @click="router.push({ name: 'login' })"
        class="w-screen z-0 absolute top-0"
        src="https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20241231/1735586047169.png"
      />

      <div class="user-info z-10 p-5 w-full h-32 flex items-center">
        <view
          v-if="useAuthStore().getToken"
          class="cu-avatar round lg"
          :style="{ backgroundImage: `url(${Avatar})` }"
        ></view>
        <view
          v-else
          class="cu-avatar round lg"
          :style="{
            backgroundImage: `url('https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20250101')`,
          }"
        ></view>
        <div class="flex flex-wrap z-10">
          <div
            class="text-xl w-full z-10 text-white pl-4"
            v-if="useAuthStore().getToken"
          >
            {{ Username }}
            <text
              v-if="Sex === 1"
              style="font-size: 25px; color: #a54aff"
              class="cuIcon-female w-10 h-10 text-2xl text-red margin-right-xs"
            ></text>

            <text
              v-else
              style="font-size: 25px; color: #16a9fa"
              class="cuIcon-male w-10 h-10 text-2xl text-red margin-right-xs"
            ></text>

            <!-- <text
              @click="clearStorage"
              style="font-size: 25px; color: #ffffff"
              class="cuIcon-delete ml-2"
            ></text> -->
          </div>
          <p
            class="text-sm z-10 text-white pl-4"
            v-if="useAuthStore().getToken"
          >
            {{ Age ? Age + "岁" : "未填写" }}
          </p>
          <p
            class="text-m z-10 text-white pl-4"
            v-else
            @click="router.push({ name: 'login' })"
          >
            未登录，点击登录
          </p>
        </div>
      </div>
    </div>

    <div
      style="top: 100px"
      class="mine-indicators absolute w-full h-40 flex justify-center items-center"
    >
      <div
        style="width: 90%"
        class="shadow-md rounded-lg px-10 bg-white flex justify-around flex-row py-5"
      >
        <div
          class="mine-indicator bg-white"
          v-if="roleName === 'student'"
          @click="bodyinfo"
        >
          <div class="indicator-left flex flex-col">
            <span class="title text-gray-500 tracking-wider mb-3 text-center"
              >身高</span
            >
            <span
              class="num text-2xl text-black font-bold tracking-wider"
              v-if="useAuthStore().getToken && showTab1 != '0'"
              >{{ showTab1 }}cm</span
            >
            <span class="num text-xl font-bold tracking-wider" v-else
              >暂无数据</span
            >
          </div>
        </div>
        <div class="mine-indicator bg-white" v-else>
          <div class="indicator-left flex flex-col">
            <span class="title text-gray-500 tracking-wider mb-3 text-center"
              >售课次数</span
            >
            <span class="num text-2xl text-black font-bold tracking-wider">{{
              showTab1
            }}</span>
          </div>
        </div>
        <div
          class="mine-indicator bg-white"
          v-if="roleName === 'student'"
          @click="bodyinfo"
        >
          <div class="indicator-left flex flex-col">
            <span class="title text-gray-500 tracking-wider mb-3 text-center"
              >体重</span
            >
            <span
              class="num text-2xl text-black font-bold tracking-wider"
              v-if="useAuthStore().getToken && showTab2 != '0'"
              >{{ showTab2 }}kg</span
            >
            <span class="num text-xl text-black font-bold tracking-wider" v-else
              >暂无数据</span
            >
          </div>
        </div>
        <div class="mine-indicator bg-white" v-else>
          <div class="indicator-left flex flex-col">
            <span class="title text-gray-500 tracking-wider mb-3 text-center"
              >学员数量</span
            >
            <span class="num text-2xl text-black font-bold tracking-wider">{{
              showTab2
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mine-content">
      <view
        style="display: flex; justify-content: center"
        class="flex-wrap cu-list menu text-left"
      >
        <view
          @click="exitinfo"
          class="cu-item my-3 w-11/12 shadow-sm p-3 py-5 rounded-xl arrow"
        >
          <view class="content py-3 flex flex-row items-center">
            <text class="cuIcon-circlefill text-grey"></text>
            <div class="flex flex-col ml-3">
              <text class="text-[#042c5c] text-xl font-bold">设置个人信息</text>
              <text class="text-gray-500">设置头像和昵称</text>
            </div>
          </view>
        </view>
        <view
          v-if="roleName === 'student'"
          @click="orderinfo"
          class="cu-item my-3 w-11/12 shadow-sm p-3 py-5 rounded-xl arrow"
        >
          <view class="content py-3 flex flex-row items-center">
            <text class="cuIcon-circlefill text-grey"></text>
            <div class="flex flex-col ml-3">
              <text class="text-[#042c5c] text-xl font-bold">我的订单</text>
              <text class="text-gray-500">查看订单状态</text>
            </div>
          </view>
        </view>
        <view
          @click="bodyinfo"
          class="cu-item my-3 w-11/12 shadow-sm p-3 py-5 rounded-xl arrow"
        >
          <view class="content py-3 flex flex-row items-center">
            <text class="cuIcon-circlefill text-grey"></text>
            <div class="flex flex-col ml-3">
              <text class="text-[#042c5c] text-xl font-bold">身体指标</text>
              <text class="text-gray-500">查看我的身体指标</text>
            </div>
          </view>
        </view>
        <view
          @click="myMes"
          class="cu-item my-3 w-11/12 shadow-sm p-3 py-5 rounded-xl arrow"
        >
          <view class="content py-3 flex flex-row items-center">
            <text class="cuIcon-circlefill text-grey"></text>
            <div class="flex flex-col ml-3">
              <text class="text-[#042c5c] text-xl font-bold">信息系统</text>
              <text class="text-gray-500">查看我的信息</text>
            </div>
          </view>
          <view class="action" v-if="usemesStore().hadNew > 0">
            <view class="cu-tag round bg-red sm">{{
              usemesStore().hadNew
            }}</view>
          </view>
        </view>
        <view
          v-if="roleName === 'coach'"
          @click="diyTab"
          class="cu-item my-3 w-11/12 shadow-sm p-3 py-5 rounded-xl arrow"
        >
          <view class="content py-3 flex flex-row items-center">
            <text class="cuIcon-circlefill text-grey"></text>
            <div class="flex flex-col ml-3">
              <text class="text-[#042c5c] text-xl font-bold">自定义课程</text>
              <text class="text-gray-500">自定义课程内容</text>
            </div>
          </view>
        </view>
        <!-- <view
          @click="router.push({ name: 'calender' })"
          class="cu-item my-3 w-11/12 shadow-sm p-3 py-5 rounded-xl arrow"
        >
          <view class="content py-3 flex flex-row items-center">
            <text class="cuIcon-circlefill text-grey"></text>
            <div class="flex flex-col ml-3">
              <text class="text-[#042c5c] text-xl font-bold">我的训练计划</text>
              <text class="text-gray-500">查看我的训练计划</text>
            </div>
          </view>
        </view> -->
      </view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { getCourseAndStudentCount } from "@/api/coach";
import { getHWInfo, getUserInfo } from "@/api/user";
import { useAuthStore } from "@/state/modules/auth";
import { usemesStore } from "@/state/modules/mes";
import { useRouter } from "uni-mini-router";
const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const showTab1 = ref<string>("0");
const showTab2 = ref<string>("0");
const roleName = ref<string>("student");
const Avatar = ref("");
const Username = ref("");
const Age = ref(0);
const Sex = ref(0);
onMounted(async () => {
  uni.$on("changeUser", async (val) => {
    const ress = await (await getUserInfo()).data.data;
    Avatar.value = ress.Avatar;
    Age.value = ress.Age;
    Sex.value = ress.Sex;
    Username.value = ress.Username;
  });
  uni.$on("changeBody", (val) => {
    console.log("变");
    getHWInfo().then((res) => {
      showTab1.value = res.data.data.Height.toString();
      showTab2.value = res.data.data.Weight.toString();
    });
  });
  const ress = await (await getUserInfo()).data.data;
  Avatar.value = ress.Avatar;
  Age.value = ress.Age;
  Sex.value = ress.Sex;
  Username.value = ress.Username;
  roleName.value = ress.RoleName ? ress.RoleName : "student";
  if (roleName.value === "coach") {
    getCourseAndStudentCount().then((res) => {
      showTab1.value = res.data.data.CourseCount.toString();
      showTab2.value = res.data.data.StudentCount.toString();
    });
  } else {
    getHWInfo().then((res) => {
      showTab1.value = res.data.data.Height.toString();
      showTab2.value = res.data.data.Weight.toString();
    });
  }
});

const exitinfo = () => {
  router.push({ name: "info" });
};
const myMes = () => {
  router.push({ name: "mes" });
};
const orderinfo = () => {
  router.push({ name: "orderRecord" });
};

const bodyinfo = () => {
  router.push({ name: "indicators" });
};

const diyTab = () => {
  router.push({ name: "diyTable" });
};

const clearStorage = () => {
  uni.clearStorageSync();
  uni.showToast({
    title: "存储已清除",
    icon: "success",
  });
  router.push({ name: "login" });
};
</script>

<style scoped></style>
