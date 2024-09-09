<template>
    <div class="mine-page w-screen relative min-h-screen bg-[#fafafa] ">
        <div class="mine-header w-full h-64   relative">
            <img class="w-screen z-0  absolute top-0 " src="../../static/wave-bg.png" />

            <div class="user-info z-10 p-5 w-full h-32 flex  items-center">
                <view class="cu-avatar  round lg"
                    style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Taric.png);">
                </view>
                <div class="flex flex-wrap z-10">
                    <div class="text-xl w-full z-10 text-white pl-4">
                        小木鱼



                        <text style="font-size: 25px; color:#a54aff ;"
                            class="cuIcon-female w-10 h-10 text-2xl text-red  margin-right-xs"></text>

                        <text style="font-size: 25px; color:#16a9fa ;"
                            class="cuIcon-male w-10 h-10 text-2xl text-red  margin-right-xs"></text>


                    </div>
                    <p class="text-sm z-10 text-white pl-4">
                        20岁
                    </p>

                </div>




            </div>




        </div>


        <div style="top: 100px" class="mine-indicators    absolute  w-full h-40  flex justify-center items-center">
            <div style="width: 90%;" class=" shadow-md rounded-lg px-10 bg-white flex justify-around flex-row py-5">

                <div class="mine-indicator bg-white ">
                    <div class="indicator-left flex flex-col ">
                        <span class="title text-gray-500 tracking-wider mb-3">授课次数</span>
                        <span class="num text-2xl text-black font-bold tracking-wider">10次</span>
                    </div>


                    <div class="indicator-right"></div>

                </div>
                <div class="mine-indicator bg-white ">
                    <div class="indicator-left flex flex-col ">
                        <span class="title text-gray-500 tracking-wider mb-3 ">学员总数</span>
                        <span class="num text-2xl text-black font-bold tracking-wider">74人</span>
                    </div>
                </div>


            </div>

        </div>

        <div class="mine-content">
            <view style="display: flex; justify-content: center;" class="flex-wrap cu-list menu text-left">
                <view @click="exitinfo" class="cu-item  my-3  w-11/12 shadow-sm p-3 py-5 rounded-xl arrow">
                    <view class="content py-3 flex flex-row items-center">
                        <text style="font-size: 25px; color: #ff5e3a;" class=" cuIcon-circlefill text-grey"></text>

                        <div class="flex flex-col ml-3">
                            <text class="text-[#042c5c] text-xl font-bold">设置个人信息</text>
                            <text class="text-gray-500">设置头像和昵称</text>

                        </div>
                    </view>
                </view>
                <view @click="orderinfo" class="cu-item my-3 w-11/12 shadow-sm p-3 py-5 rounded-xl arrow">
                    <view class="content py-3 flex flex-row items-center">
                        <text style="font-size: 25px; color: #ff5e3a;" class=" cuIcon-circlefill text-grey"></text>

                        <div class="flex flex-col ml-3">
                            <text class="text-[#042c5c] text-xl font-bold">我的订单</text>
                            <text class="text-gray-500">查看订单状态 </text>

                        </div>
                    </view>
                </view>

                <view @click="bodyinfo" class="cu-item my-3 w-11/12 shadow-sm p-3 py-5 rounded-xl arrow">
                    <view class="content py-3 flex flex-row items-center">
                        <text style="font-size: 25px; color: #ff5e3a;" class=" cuIcon-circlefill text-grey"></text>
                        <div class="flex flex-col ml-3">
                            <text class="text-[#042c5c] text-xl font-bold">身体指标</text>
                            <text class="text-gray-500">查看我的身体指标</text>
                        </div>
                    </view>
                </view>
            </view>
        </div>
    </div>

</template>
<script lang="ts" setup>
import { useRouter } from 'uni-mini-router';
const router = useRouter();
const exitinfo = () => {
    router.push(
        { name: 'info' }
    );
}

const orderinfo = () => {
    router.push(
        { name: 'orderRecord' }
    );
}

const bodyinfo = () => {
    router.push(
        { name: 'indicators' }
    );

}
</script>

<style scoped></style>