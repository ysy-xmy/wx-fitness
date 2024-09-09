<template>

    <div class="tab-mycourse  w-full flex flex-wrap justify-center">
        <div @click="buycourse" class="course-card relative w-11/12  mt-7  rounded-lg h-auto">
            <div class="w-full h-full  rounded-xl bg-black absolute opacity-25"></div>

            <img class="w-full h-full  absolute rounded-xl " src="../../static/Overlay.png" />
            <img class="w-full h-44 rounded-xl " src="../../static/exercise.png" />
            <div class="absolute text-white bottom-0 w-full p-4 pb-2 flex-wrap flex justify-start items-center">
                <div class=" text-left mb-3  text-2xl">私教课
                </div>
                <div class="text-signature mb-2 w-full tracking-wider flex justify-between flex-wrap">
                    <div class="time-text">
                        <van-icon name="clock-o" />
                        <span>7月8号 周一 2024</span>
                    </div>
                    <div class="main-btn">
                        <van-button class="custom-class w-32 	" round type="warning" color="#ffffff"
                            style="color: aqua;" size="small"><span class=" text-lg py-2 px-5 text-[#EC6853]">查 看</span>
                        </van-button>

                    </div>

                </div>
            </div>
        </div>




    </div>
</template>

<script setup lang="ts" name="home">

import { reactive } from 'vue';
import { useAuthStore } from '@/state/modules/auth';
import { useRouter } from 'uni-mini-router';
const router = useRouter();
const authStore = useAuthStore();
const buycourse = () => {
    let routeData = { name: 'course' };
    router.push(routeData);
}
</script>

<style scoped>
.custom-class {
    color: black !important;

}
</style>