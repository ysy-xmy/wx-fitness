<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { getUserInfo, refreshToken } from '@/api/user'
import { useAuthStore } from '@/state/modules/auth'
const authStore = useAuthStore()
onLaunch(() => {
    if (authStore.isLogin) {
        getUserInfo().then(res => {
            console.log("------------", res)
            authStore.setUser(res.data.data)
            console.log("===========", authStore.getUser)
        })
        refreshToken().then(res => {
            console.log(res)
            if (res.data.length == 0) return
            token = res.data[0].Token
            authStore.setToken(token);
            uni.setStorageSync("token", token);
        })


    }
});
onShow(() => {


});
onHide(() => {
});
</script>
<style>
@import url('./style/index.css');
@import "../colorui/main.css";
@import "../colorui/icon.css";
</style>