<template>
    <view class="content w-screen px-2 flex flex-wrap">
        <view @click="enterSearch()" class="w-full flex justify-start items-center">
            <van-search class="flex-1" @search="onSearch" @cancel="onCancel" v-model="searchword"
                placeholder="请输入搜索关键词" />
            <template #action>
                <div @click="enSearch">搜索</div>
            </template>
        </view>

        <div class="w-full exhibition-box my-5  relative flex justify-centers">
            <div class="w-full h-full bg-black absolute z-20 opacity-25"></div>
            <img class="w-full h-50 "
                src="https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d" />
            <div class="absolute z-50 text-white bottom-0 w-full p-2  flex-wrap flex justify-center items-center">
                <div class=" text-left mb-5">“健身不只是身体上的锻炼，它还是心灵和情感的一种训练。”
                </div>
                <div class="text-signature mb-2 w-full flex justify-between flex-wrap">
                    <div class="time-text">
                        <span>7月8号 周一 2024</span>
                    </div>
                    <div class="writer-text">
                        <span>亚里士多德</span>
                    </div>

                </div>
            </div>

        </div>

        <div class="tabs  w-full">
            <myStudent />
        </div>

    </view>

</template>

<script setup lang="ts" name="coach">
import { ref } from 'vue';
import { useRouter } from 'uni-mini-router';
import { getlist } from '@/api/common/user/user';
import myStudent from '@/components/myStudent/myStudent.vue';
const router = useRouter();

const enterSearch = () => {
    console.log('我点击了搜索按钮');
    router.push({
        name: 'searchStu'
    }
    )

}
// 请求api
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
