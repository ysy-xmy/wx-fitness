<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { getUserInfo, refreshToken } from "@/api/user";
import { useAuthStore } from "@/state/modules/auth";
const authStore = useAuthStore();
onLaunch(() => {
  if (authStore.isLogin) {
    refreshToken().then((res) => {
      console.log(res);
      if (res.data.length == 0) return;
      let token = res.data[0].Token;
      authStore.setToken(token);
      uni.setStorageSync("token", token);
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
