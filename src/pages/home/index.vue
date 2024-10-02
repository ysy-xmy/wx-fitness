<template>
  <scroll-view
    style="height: 100vh"
    @scrolltolower="lowerBottom"
    scroll-y="true"
  >
    <div class="viewcontent">
      <div v-show="usetsto.active === 'index'" class="index-page">
        <Index v-if="permission == 'student'" />
        <CoachHome v-else />
      </div>
      <div v-show="usetsto.active === 'action'" class="action-page">
        <Action />
      </div>
      <div v-show="usetsto.active === 'mine'" class="mine-page">
        <Mine />
      </div>
    </div>
    <van-tabbar
      placeholder
      style="margin-bottom: 15px; margin-top: 15px; padding-top: 15px"
      @change="onChange"
      v-model="usetsto.getcurrentactive"
    >
      <van-tabbar-item
        :name="tabbardata[0].name"
        style="margin-bottom: 15px; height: 100%"
        v-if="usetsto.active == tabbardata[0].name"
      >
        <span :style="{ color: tabbardata[0].textactivecolor }">{{
          tabbardata[0].title
        }}</span>
        <template #icon>
          <img class="w-7 h-7" :src="tabbardata[0].activeicon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        style="margin-bottom: 15px; height: 100%"
        :name="tabbardata[0].name"
        v-else
      >
        <span :style="{ color: tabbardata[0].textcolor }">{{
          tabbardata[0].title
        }}</span>
        <template #icon>
          <img class="w-7 h-7" :src="tabbardata[0].inactiveicon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        style="margin-bottom: 15px; height: 100%"
        :name="tabbardata[1].name"
        v-if="usetsto.active == tabbardata[1].name"
      >
        <span :style="{ color: tabbardata[1].textactivecolor }">{{
          tabbardata[1].title
        }}</span>
        <template #icon>
          <img class="w-7 h-7" :src="tabbardata[1].activeicon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        style="margin-bottom: 15px; height: 100%"
        :name="tabbardata[1].name"
        v-else
      >
        <span :style="{ color: tabbardata[1].textcolor }">{{
          tabbardata[1].title
        }}</span>
        <template #icon>
          <img class="w-7 h-7" :src="tabbardata[1].inactiveicon" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item
        style="margin-bottom: 15px; height: 100%"
        :name="tabbardata[2].name"
        v-if="usetsto.active == tabbardata[2].name"
      >
        <span :style="{ color: tabbardata[2].textactivecolor }">{{
          tabbardata[2].title
        }}</span>
        <template #icon>
          <img class="w-7 h-7" :src="tabbardata[2].activeicon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        style="margin-bottom: 15px; height: 100%"
        :name="tabbardata[2].name"
        v-else
      >
        <span :style="{ color: tabbardata[2].textcolor }">{{
          tabbardata[2].title
        }}</span>
        <template #icon>
          <img class="w-7 h-7" :src="tabbardata[2].inactiveicon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </scroll-view>
</template>
<script setup lang="ts" name="home">
import { useAppStore } from "@/state/app";
import Index from "@/components/stuHome/index.vue";
import { tabbardata } from "@/tabbar";
import Action from "@/components/action/index.vue";
import Mine from "@/components/mine/index.vue";
import CoachHome from "@/components/coachHome/index.vue";
import { onMounted, ref } from "vue";
import { getUserInfo } from "@/api/user";
import { useAuthStore } from "@/state/modules/auth";
import { updateUserInfo } from "../login/wx_session";
const usetsto = useAppStore();
const AuthStore = useAuthStore();
const onChange = (item: any) => {
  usetsto.setactive(item.detail);
};
const permission = ref("");
const lowerBottom = () => {
  console.log("到底了");
  if (usetsto.active === "index") {
    uni.$emit("bot", true);
  }
};
onMounted(() => {
  console.log(AuthStore.getUser, "user");
  if (AuthStore.getUser) {
    getUserInfo().then((res) => {
      permission.value = res.data.data.RoleName;
      AuthStore.setUser({
        name: res.data.data.Username || "微信用户",
        id: res.data.data.ID,
        phone: res.data.data.phone,
        Sex: res.data.data.Sex || 0,
        img: res.data.data.Avatar,
        RoleName: res.data.data.RoleName,
      });
    });
  }
});
</script>
<style scoped></style>
