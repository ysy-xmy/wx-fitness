<template>
    <div class="finished-tast w-full min-h-screen flex justify-center mt-5">
        <div class="w-full lists-item mt-3   px-5">
            <div class="card rounded-lg bg-white flex flex-wrap justify-between items-center py-8 p-5 shadow-lg ">
                <div class="card-left w-3/4">
                    <div class="card-title mb-2s">
                        <h1 class="font-bold text-lg tracking-wide">28kg杠铃</h1>
                    </div>

                    <div class="card-desc text-sm text-gray-600 py-1">这里写一些备注</div>
                </div>
                <div class="card-right  w-1/4">
                    <div class="card-btn w-full flex flex-wrap content-center items-center  justify-center">
                        <div class="btn-item w-full mb-1"><van-button @click="handlefinish()" round type="warning"><span
                                    class="text-white text-lg ">打 卡</span></van-button>
                        </div>


                    </div>

                </div>
                <div class="card-line w-full flex-nowrap flex mt-2 justify-end">
                    <div class="w-3/4  justify-start flex flex-nowrap">
                        <div class="dec-item">
                            <div class="icon">
                                <van-icon name="todo-list-o" size="25" />
                            </div>
                            <div class="line-title text-sm text-gray-600">2022-01-01</div>

                        </div>
                        <div class="dec-item">
                            <div class="icon">
                                <van-icon name="clock-o" size="25" />
                            </div>
                            <div class="line-title text-sm text-gray-600">2022-01-01</div>

                        </div>

                    </div>
                    <div class="line-item justify-center flex w-1/4  ">
                        <span class="text-[#0c96f2] text-xs w-full text-center pb-2 underline text-center ">
                            查看教程
                        </span>
                    </div>
                </div>
            </div>

            <div class="card rounded-lg bg-white flex flex-wrap justify-between items-center py-8 p-5 shadow-lg ">
                <div class="card-left w-3/4">
                    <div class="card-title mb-2s">
                        <h1 class="font-bold text-lg tracking-wide">28kg杠铃</h1>
                    </div>

                    <div class="card-desc text-sm text-gray-600 py-1">这里写一些备注</div>
                </div>
                <div class="card-right  w-1/4">
                    <div class="card-btn w-full flex flex-wrap content-center items-center  justify-center">
                        <div class="btn-item w-full mb-1"><van-button @click="handlefinish()" round type="warning"><span
                                    class="text-white text-lg ">打 卡</span></van-button>
                        </div>


                    </div>

                </div>
                <div class="card-line w-full flex-nowrap flex mt-2 justify-end">
                    <div class="w-3/4  justify-start flex flex-nowrap">
                        <div class="dec-item">
                            <div class="icon">
                                <van-icon name="todo-list-o" size="25" />
                            </div>
                            <div class="line-title text-sm text-gray-600">2022-01-01</div>

                        </div>
                        <div class="dec-item">
                            <div class="icon">
                                <van-icon name="clock-o" size="25" />
                            </div>
                            <div class="line-title text-sm text-gray-600">2022-01-01</div>

                        </div>

                    </div>
                    <div class="line-item justify-center flex w-1/4  ">
                        <span class="text-[#0c96f2] text-xs w-full text-center pb-2 underline text-center ">
                            查看教程
                        </span>
                    </div>
                </div>
            </div>

            <div class="card rounded-lg bg-white flex flex-wrap justify-between items-center py-8 p-5 shadow-lg ">
                <div class="card-left w-3/4">
                    <div class="card-title mb-2s">
                        <h1 class="font-bold text-lg tracking-wide">28kg杠铃</h1>
                    </div>

                    <div class="card-desc text-sm text-gray-600 py-1">这里写一些备注</div>
                </div>
                <div class="card-right  w-1/4">
                    <div class="card-btn w-full flex flex-wrap content-center items-center  justify-center">
                        <div class="btn-item w-full mb-1"><van-button @click="handlefinish()" round type="warning"><span
                                    class="text-white text-lg ">打 卡</span></van-button>
                        </div>


                    </div>

                </div>
                <div class="card-line w-full flex-nowrap flex mt-2 justify-end">
                    <div class="w-3/4  justify-start flex flex-nowrap">
                        <div class="dec-item">
                            <div class="icon">
                                <van-icon name="todo-list-o" size="25" />
                            </div>
                            <div class="line-title text-sm text-gray-600">2022-01-01</div>

                        </div>
                        <div class="dec-item">
                            <div class="icon">
                                <van-icon name="clock-o" size="25" />
                            </div>
                            <div class="line-title text-sm text-gray-600">2022-01-01</div>

                        </div>

                    </div>
                    <div class="line-item justify-center flex w-1/4  ">
                        <span class="text-[#0c96f2] text-xs w-full text-center pb-2 underline text-center ">
                            查看教程
                        </span>
                    </div>
                </div>
            </div>




        </div>


    </div>

</template>
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false);


const handlefinish = () => {
    console.log('finish')
    uni.showModal({
        title: '日常打卡',
        content: '是否进行打卡？', // 注意：在uni-app中，message属性应该改为content
        confirmText: '确定', // 注意：在uni-app中，confirmButtonText属性应该改为confirmText
        cancelText: '取消', // 注意：在uni-app中，cancelButtonText属性应该改为cancelText
        success: (res) => {
            if (res.confirm) {
                // 在这里执行用户点击确定的操作
                wx.showToast({
                    title: '打卡成功', // 提示的内容
                    icon: 'success', // 图标类型，可选值有success、loading、none
                    duration: 2000, // 提示框停留时间，单位毫秒
                    mask: false, // 是否显示透明蒙层，防止触摸穿透，默认：false

                });

            } else if (res.cancel) {
                // 在这里执行用户点击取消的操作
                wx.showToast({
                    title: '取消打卡', // 提示的内容
                    icon: 'none', // 图标类型，可选值有success、loading、none
                    duration: 2000, // 提示框停留时间，单位毫秒
                    mask: false, // 是否显示透明蒙层，防止触摸穿透，默认：false
                });
            }
        },
        fail: (err) => {
            console.error('showModal 调用失败', err);
        }
    });
}
</script>
<style scoped>
.btn-item {
    display: flex;

    justify-content: center;
}

.dec-item {
    display: flex;
    flex-wrap: nowrap;
    margin-right: 5px;
    align-items: center;
    align-content: center;
}

.icon {
    padding-right: 2px;
}

.card {
    margin-bottom: 10px;
}
</style>