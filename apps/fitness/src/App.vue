<script setup lang="ts">
import { onLaunch, onShow, onHide, onUnload } from "@dcloudio/uni-app";
import { refreshToken } from "@/api/user";
import { useAuthStore } from "@/state/modules/auth";
import { usemesStore } from "@/state/modules/mes";
const authStore = useAuthStore();

onLaunch(() => {
  if (uni.getStorageSync("token")) {
    refreshToken().then((res) => {
      // console.log(res.data.data);
      if (res.data.data.Remove) {
        //Remove为true，删除本地存储
        uni.clearStorage();
        authStore.clearStore();
        return;
      } else if (!res.data.data.Remove && !res.data.data.Refresh) {
        return;
      } else {
        //刷新token
        let token = res.data.data.Token;
        authStore.setToken(token);
        uni.setStorageSync("token", token);
        return;
      }
    });
  }
});
onShow(() => {});
onHide(() => {
  usemesStore().closeSocket();
});
//关闭之前
onUnload(() => {
  const mesStore = usemesStore();
  if (mesStore && mesStore.socket) {
    mesStore.closeSocket();
  }
});
</script>
<style>
@import url("./style/index.css");
@import "../src/subpackages/colorui/main.css";
@import "../src/subpackages/colorui/icon.css";
</style>
