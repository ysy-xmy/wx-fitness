<template>
  <div
    style="height: 100vh;display: flex;flex-direction: column;"
  >
    <div style="flex:1!important;height: 0;" class="viewcontent flex-1">
      <div v-show="usetsto.active === 'index'" class="index-page">
        <CoachHome v-if="permission == 'coach'" />
        <Index v-else />
      </div>
      <div v-show="usetsto.active === 'action'" class="action-page h-full">
        <Action
          class="h-full"
          :if-choose="ifChoose"
          :stuid="stuid"
          :courid="courid"
          :type="type"
          :name="sourName"
        />
      </div>
      <div v-show="usetsto.active === 'mine'" class="mine-page">
        <Mine />
      </div>
    </div>
    <van-tabbar
      placeholder
      @change="onChange"
      v-model="usetsto.getcurrentactive"
    >
      <van-tabbar-item
        :name="tabbardata[0].name"
        style=" height: 84px"
        class="pt-3"

        v-if="usetsto.active == tabbardata[0].name"
        placeholder
      >
        <span :style="{ color: tabbardata[0].textactivecolor }">{{ tabbardata[0].title }}</span>
        <template #icon>
          <img class="w-7 h-7" :src="tabbardata[0].activeicon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        style=" height: 84px"
        class="pt-3"

        :name="tabbardata[0].name"
        v-else
      >
        <span :style="{ color: tabbardata[0].textcolor }">{{ tabbardata[0].title }}</span>
        <template #icon>
          <img class="w-7 h-7" :src="tabbardata[0].inactiveicon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        style=" height: 84px"
        class="pt-3"

        :name="tabbardata[1].name"
        v-if="usetsto.active == tabbardata[1].name"
      >
        <span :style="{ color: tabbardata[1].textactivecolor }">{{ tabbardata[1].title }}</span>
        <template #icon>
          <img class="w-7 h-7" :src="tabbardata[1].activeicon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        style=" height: 84px"
        class="pt-3"


        :name="tabbardata[1].name"
        v-else
      >
        <span :style="{ color: tabbardata[1].textcolor }">{{ tabbardata[1].title }}</span>
        <template #icon>
          <img class="w-7 h-7" :src="tabbardata[1].inactiveicon" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item
        style=" height: 84px"
        class="pt-3"


        :name="tabbardata[2].name"
        v-if="usetsto.active == tabbardata[2].name"
      >
        <span :style="{ color: tabbardata[2].textactivecolor }">{{ tabbardata[2].title }}</span>
        <template #icon>
          <img class="w-7 h-7" :src="tabbardata[2].activeicon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        style=" height: 84px"
        class="pt-3"


        :name="tabbardata[2].name"
        v-else
      >
        <span :style="{ color: tabbardata[2].textcolor }">{{ tabbardata[2].title }}</span>
        <template #icon>
          <img class="w-7 h-7" :src="tabbardata[2].inactiveicon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
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
import { getCoachClass } from "@/api/courses/courses";
import { useRouter } from "uni-mini-router";
const router = useRouter();
const usetsto = useAppStore();
const AuthStore = useAuthStore();
const onChange = (item: any) => {
  usetsto.setactive(item.detail);
  ifChoose.value = false;
};
const permission = ref("");
// const lowerBottom = () => {
//   if (usetsto.active === "index") {
//     uni.$emit("bot", true);
//   }
// };
const ifChoose = ref(false);
const stuid = ref(-1);
const courid = ref(-1);
const type = ref("");
const sourName = ref("");
onMounted(() => {
  if (router.route.value.query.isChoose) {
    ifChoose.value = true;
    stuid.value = decodeURIComponent(router.route.value.query.stuid);
    courid.value = decodeURIComponent(router.route.value.query.courid);
    type.value = decodeURIComponent(router.route.value.query.type);
    sourName.value = decodeURIComponent(router.route.value.query.name);
  } else {
    ifChoose.value = false;
  }
  if (AuthStore.getUser) {
    uni.showLoading();
    getUserInfo()
      .then((res) => {
        uni.hideLoading();
        permission.value = res.data.data.RoleName;
        AuthStore.setUser({
          OpenID: res.data.data.OpenID,
          name: res.data.data.Username || "微信用户",
          id: res.data.data.ID,
          phone: res.data.data.phone,
          Sex: res.data.data.Sex || 0,
          img: res.data.data.Avatar,
          RoleName: res.data.data.RoleName,
          Age: res.data.data.Age || "18",
        });
        if (res.data.data.RoleName == "coach") {
          getCoachClass(res.data.data.ID)
            .then((res) => {
              AuthStore.setClassId(res.data.data.ID);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        uni.hideLoading();
      });
  }
});
</script>
<style>
.van-tabbar {
  height: 76px!important;
  align-items: center;
}
</style>
