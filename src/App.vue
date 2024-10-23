<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { getUserInfo, refreshToken } from "@/api/user";
import { useAuthStore } from "@/state/modules/auth";
const authStore = useAuthStore();
onLaunch(() => {
  refreshToken().then((res) => {
    // console.log(res.data.data);
    if (!res.data.data[0].Refresh) {
      // uni.clearStorage();
      // authStore.clearStore();
      return;
    }
    let token = res.data.data[0].Token;
    authStore.setToken(token);
    uni.setStorageSync("token", token);
  });
});
onShow(() => {});
onHide(() => {});
</script>
<style>
@import url("./style/index.css");
@import "../src/subpackages/colorui/main.css";
@import "../src/subpackages/colorui/icon.css";
</style>
