<template>
    <div class="main-container">
        <div class="top">
            <div class="bg-img ">
                <img class="w-full h-56" src="https://img95.699pic.com/photo/50195/4017.jpg_wh860.jpg" alt="">
            </div>
        </div>
        <div class="info-card w-full flex justify-center p-4">
            <div class="card w-full bg-[#f9fafb] p-3">
                <div class="card-top">
                    <div class="title w-full flex justify-between items-center">
                        <h2 class="text-xl font-bold">健身课程</h2>
                        <van-circle stroke-width="8" size="60" layer-color="#ebedf0" color="#ec6853" value="60"
                            text="20%" />

                    </div>
                </div>
                <div class="card-body mt-2 flex w-full justify-between flex-nowrap">
                    <div class="body-content w-2/3 text-lg  flex items-center ">
                        <h1>主要以肌肉训练为主</h1>



                    </div>
                    <div class="body-btn w-1/3 flex-1 flex flex-col items-center  justify-end ">
                        <span class="text-[#0c96f2] text-xs w-full text-center pb-2"> 授权教练打卡 </span>
                        <div class="btn ml-2">
                            <van-switch :checked="checked" @change="handleswitch" />

                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="mycourse-tabs">
            <van-tabs swipeable animated>
                <van-tab title="已完成">
                    <finishedtask></finishedtask>
                </van-tab>
                <van-tab title="计划表">
                    <plan></plan>

                </van-tab>
                <van-tab title="线上任务">
                    <onlinetask></onlinetask>
                </van-tab>


            </van-tabs>
        </div>
    </div>

</template>
<script lang="ts" setup name="mycourse">
import { ref } from 'vue';
//@ts-ignore
import finishedtask from '@/components/mycourse/finishedtask.vue';
//@ts-ignore
import plan from '@/components/mycourse/plan.vue';
//@ts-ignore
import onlinetask from '@/components/mycourse/onlinetask.vue';
const value = ref('');
const checked = ref(false);
const handleswitch = (newValue) => {
    if (!checked.value) {
        uni.showModal({
            title: '授权教练打卡',
            content: '是否授权教练打卡？', // 注意：在uni-app中，message属性应该改为content
            confirmText: '确定', // 注意：在uni-app中，confirmButtonText属性应该改为confirmText
            cancelText: '取消', // 注意：在uni-app中，cancelButtonText属性应该改为cancelText
            success: (res) => {
                if (res.confirm) {
                    console.log('用户点击确定');
                    // 在这里执行用户点击确定的操作
                    checked.value = true;
                    console.log(checked.value);

                } else if (res.cancel) {
                    console.log('用户点击取消');
                    // 在这里执行用户点击取消的操作
                    checked.value = false;
                }
            },
            fail: (err) => {
                console.error('showModal 调用失败', err);
            }
        });
    } else {
        checked.value = false;
    }
};



</script>
<style scoped></style>
