<template>
    <div class="main-container relative h-screen">

        <scroll-view scroll-x class="bg-white nav">
            <view class="flex text-center">
                <view class="cu-item flex-sub " :class="index == TabCur ? 'text-[#FF5E3A] cur' : ''"
                    v-for="(item, index) in TabList" :key="index" @tap="tabSelect" :data-id="index">
                    {{ item.title }}
                </view>
            </view>
        </scroll-view>
        <div class="add-card bg-[#f2f6ff] h-52 absolute w-screen pt-8 z-10 bottom-0 ">
            <div class="flex card-top">
                <span class="text-[#6D819C] text-[14px] px-[20px] ">更新于: 7 月 1, 2024</span>
            </div>

            <div class="flex card-content px-[20px] py-[10px] items-center">
                <span class="text-[#6D819C] text-[14px] mr-5 ">体重</span><span
                    class="text-[#282C37] text-[36px] tracking-wide font-bold ">70kg</span>
            </div>

            <div class="flex card-bottom px-[20px] py-[10px]">
                <div class="left-box flex-col flex ">
                    <span class="text-[#6D819C] text-[14px] mr-5 mb-1">初始体重 3 月 1 ，2024</span>
                    <span class="text-[#282C37] text-[24px] tracking-wide  ">70kg</span>
                </div>
                <div class="right-box flex-col flex items-center">
                    <span class="text-[#6D819C] text-[14px] mr-5 mb-1">变化</span>
                    <span class="text-[#FF8D1A] text-[36px] tracking-wide  ">-70kg</span>
                </div>
            </div>

            <van-button @click="showModal" size="large" type="primary" round
                class="btn-gradient  absolute top-10 right-10 w-[100px] h-[40px]"
                color="linear-gradient(90deg, #FF6243 0%, #FF0072 100%)">
                <span>添 加</span>
            </van-button>
        </div>
        <echart />
    </div>

    <view class="cu-modal bottom-modal" :class="show ? 'show' : ''">
        <view class="cu-dialog">
            <view class="cu-bar px-4 bg-white flex justify-between">


                <div class="text-[14px] text-[#282C37]">添加记录</div>
                <view style="font-size: 25px;" class="action cuIcon-close text-[#ff5e3a] text-[20px]" @tap="hideModal">
                </view>

            </view>

            <view class="pb-8">
                <van-cell-group class="w-screen" inset>
                    <view class="cu-form-group margin-top">
                        <view class="title">体重</view>
                        <input class="text-right" v-model="weight" placeholder="请输入体重(kg)" name="input" />
                        <span>kg</span>
                    </view>
                    <div class="mt-4"></div>
                    <view class="cu-form-group">
                        <view class="title">日期</view>
                        <picker mode="date" :value="date" @change="DateChange">
                            <view class="picker">
                                {{ date }}
                            </view>
                        </picker>
                    </view>
                    <div class="mt-4"></div>
                    <van-button @click="showModal" size="large" type="primary" round class="btn-gradient mt-5 "
                        color="linear-gradient(90deg, #FF6243 0%, #FF0072 100%)">
                        <span>添 加</span>
                    </van-button>
                </van-cell-group>

            </view>
        </view>
    </view>



</template>
<script setup lang="ts">
// 引入echarts
import { ref } from 'vue'
import { useAppStore } from '../../state/app'
import echart from '@/components/echart/try.vue'
const show = ref(true)
const TabCur = ref(0)
const weight = ref('')
// const date = ref('2024-09-01')
const appStore = useAppStore()
const date = ref(appStore.getCurrentDate)
const DateChange = (e: any) => {
    date.value = e.detail.value
}
const TabList = [
    {
        title: '体重',
        content: 'Content1'
    },
    {
        title: '三围',
        content: 'Content2'
    },
    {
        title: '体脂率',
        content: 'Content3'
    },
    {
        title: 'BMI',
        content: 'Content4'
    },
    {
        title: '基础代谢',
        content: 'Content5'
    },
    {
        title: '三视图   ',
        content: 'Content6'
    },
]
function tabSelect(e: any) {
    const id = e.currentTarget.dataset.id
    TabCur.value = parseInt(id)
}
function showModal() {
    show.value = true
}
function hideModal() {
    show.value = false
}
</script>