<template>
    <view class="content w-screen px-2 flex flex-wrap">


        <!-- 
        <vin-button color="#7232dd" @click="push"> 跳转路由 </vin-button>

        <vin-button color="#7232dd" @click="apis"> api请求 </vin-button>
 -->
        <view class="w-full flex justify-start items-center">
            <van-search class="flex-1" @search="onSearch" @cancel="onCancel" v-model="searchword"
                placeholder="请输入搜索关键词" />
            <template #action>
                <div @click="search">搜索</div>
            </template>

        </view>
        <div class="w-full exhibition-box my-5  relative flex justify-centers">

            <div class="w-full h-full bg-black absolute opacity-25"></div>
            <img class="w-full h-50 " src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
            <div class="absolute text-white bottom-0 w-full p-2  flex-wrap flex justify-center items-center">
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
            <van-tabs :class="['custom-class', 'my-custom-tabs']" nav-class="my-nav-class" tab-class="my-tab-class"
                tab-active-class="my-tab-active-class" swipeable animated border="false" color="#ec6853"
                class=" w-2/3 rounded-md " v-model:active="active" type="card">
                <van-tab title="购买课程">
                    <tabBuycourse />
                </van-tab>
                <van-tab title="我的课程">
                    <tabMycourse />
                </van-tab>


            </van-tabs>
        </div>

    </view>

</template>

<script setup lang="ts" name="index">
import { ref } from 'vue';
import { useRouter } from 'uni-mini-router';
// import coas from '@/static/logo.png';
import { useAppStore } from '@/state/app';
import { getlist } from '@/api/common/user/user';
import tabBuycourse from '@/components/index/tab-buycourse.vue';
import tabMycourse from '@/components/index/tab-mycourse.vue';
// import vinButton from '@vingogo/uni-ui/lib/components/button/index.vue';

const router = useRouter();
const usetsto = useAppStore();

let env = import.meta.env.VITE_APP_ENV;
let api = import.meta.env.VITE_BASE_URL;

const title = ref('Tailwind CSS');

const showPreview = ref(false);

const searchword = ref('')
const onSearch = () => { };
const onCancel = () => { };
// 跳转路由
function push() {
    router.push({
        name: 'course',
    });
}

//搜索
function search() {
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
