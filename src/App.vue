<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { getUserInfo, refreshToken } from "@/api/user";
import { useAuthStore } from "@/state/modules/auth";
const authStore = useAuthStore();

onLaunch(() => {
  if (uni.getStorageSync("token")) {
    refreshToken().then((res) => {
      // console.log(res.data.data);
      if (res.data.data[0].Remove) {
        //Remove为true，删除本地存储
        uni.clearStorage();
        authStore.clearStore();
        return;
      } else if (!res.data.data[0].Remove && !res.data.data[0].Refresh) {
        //如果没有Remove而且Refresh为true,啥都不做
        return;
      } else {
        //刷新token
        let token = res.data.data[0].Token;
        authStore.setToken(token);
        uni.setStorageSync("token", token);
        return;
      }
    });
  }
});
onShow(() => {});
onHide(() => {});
</script>
<style>
@import url("./style/index.css");
@import "../src/subpackages/colorui/main.css";
@import "../src/subpackages/colorui/icon.css";
</style>
