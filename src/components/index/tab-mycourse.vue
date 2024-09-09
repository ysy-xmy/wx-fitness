<template>

    <div class="tab-mycourse  w-full  flex flex-wrap justify-center pb-20 ">
        <div class="course-card mt-5 rounded-lg bg-[#e7eeff] w-11/12 flex flex-row  h-36">

            <img class="w-1/3 h-full" src="../../static/mycourse-pic.png" />
            <div class="main-content py-3 w-2/3  h-full content-evenly   flex  flex-wrap">
                <div class="w-full top flex justify-between">
                    <h1 class="text-2xl ">liliangjichuke</h1>
                    <div class="ring"></div>
                </div>
                <div class="mt-2 middle w-full flex justify-center">
                    <span>shoukelaoshi:lilaoshi</span>
                </div>
                <div class="main-btn mt-4 flex px-8 w-full  justify-between">
                    <van-button class="custom-class  " @click="tomycourse" round type="warning" color="#ffffff"
                        size="small"><span class=" text-lg tracking-widest  text-[#EC6853] ">&nbsp;查 看</span>
                    </van-button>
                    <!-- <van-button class="custom-class w-32 	" round type="warning" color="#ffffff" style="color: aqua;"
                        size="small"><span class=" text-lg py-2 px-5 text-[#EC6853]">查 看</span>
                    </van-button> -->
                    <van-button class="custom-class ml-2 	" round type="warning" color="#ffffff" size="small"><span
                            @click="tomycourse" class="tracking-widest text-lg w-20 text-[#EC6853]">&nbsp;打 卡</span>
                    </van-button>

                </div>
            </div>

        </div>

        <div class="course-card mt-5 rounded-lg bg-[#e7eeff] w-11/12 flex flex-row  h-36">

            <img class="w-1/3 h-full" src="../../static/mycourse-pic.png" />
            <div class="main-content py-3 w-2/3  h-full content-evenly   flex  flex-wrap">
                <div class="w-full top flex justify-between">
                    <h1 class="text-2xl ">liliangjichuke</h1>
                    <div class="ring"></div>
                </div>
                <div class="mt-2 middle w-full flex justify-center">
                    <span>shoukelaoshi:lilaoshi</span>
                </div>
                <div class="main-btn mt-4 flex px-8 w-full  justify-between">
                    <van-button @click="tomycourse" class="custom-class  " round type="warning" color="#ffffff"
                        size="small"><span class=" text-lg tracking-widest  text-[#EC6853]">&nbsp;查 看</span>
                    </van-button>
                    <!-- <van-button class="custom-class w-32 	" round type="warning" color="#ffffff" style="color: aqua;"
            size="small"><span class=" text-lg py-2 px-5 text-[#EC6853]">查 看</span>
        </van-button> -->
                    <van-button @click="tomycourse" class="custom-class ml-2	" round type="warning" color="#ffffff"
                        size="small"><span class="tracking-widest text-lg w-20 text-[#EC6853]">&nbsp;打 卡</span>
                    </van-button>

                </div>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'uni-mini-router';
const router = useRouter();
const tomycourse = () => {
    router.push(
        { name: 'mycourse' }
    );
}
</script>