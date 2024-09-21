<template>
    <view class="content w-screen px-2 flex flex-wrap">
        <view class="w-full flex justify-start items-center">
            <van-search class="flex-1" @search="onSearch" @cancel="onCancel" v-model="searchword"
                placeholder="请输入搜索关键词" />
            <template #action>
                <div @click="search">搜索</div>
            </template>
        </view>
        <div class="tabs  w-full">
            <myStudent />
        </div>

    </view>

</template>

<script setup lang="ts" name="coach">
import { ref } from 'vue';
import { useRouter } from 'uni-mini-router';
import { useAppStore } from '@/state/app';
import { getlist } from '@/api/common/user/user';
import myStudent from '@/components/myStudent/myStudent.vue';
const router = useRouter();
const usetsto = useAppStore();
let env = import.meta.env.VITE_APP_ENV;
let api = import.meta.env.VITE_BASE_URL;
const searchword = ref('')
// 跳转路由
function push() {
    router.push({
        name: 'course',
    });
}

//搜索
function onSearch() {
    console.log(searchword.value, '我搜索了');
}
// 请求api
function apis() {
    getlist({ id: 1 }).then((res) => {
        console.log(res, '我点击了');
    });
}
</script>

<style>
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.logo {
    margin: 200rpx auto 50rpx;
    width: 200rpx;
    height: 200rpx;
}

.text-area {
    display: flex;
    justify-content: center;
}

:deep(.vin-image-preview-custom-pop) {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background: transparent !important;
}
</style>
