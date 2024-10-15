<template>
    <div class="action-main">
        <div class="action-header">
            <div class="action-video">
                <view class="page">
                    <video :src="actionInfo.Videos[0].URL" id="myVideo"></video>

                </view>

            </div>
        </div>
        <div class="action-content">
            <div class="action-title text-2xl font-extrabold px-5 py-2 border-l-8 border-[#fd7d46]">{{ actionInfo.Name
                }}</div>
            <div v-if="actionInfo.Imgs.length > 0" class="action-imgs flex justify-center">
                <swiper class="screen-swiper square-dot w-full px-6 mt-4" :indicator-dots="true" :circular="true"
                    interval="5000" duration="500">
                    <swiper-item v-for="(item, index) in actionInfo.Imgs" :key="index">
                        <image :src="item.URL" mode="aspectFill"></image>
                    </swiper-item>
                </swiper>

            </div>
            <div class="action-desc">
                <div
                    class="pl-5 px-5 py-2 border-l-8 border-[#fd7d46]  font-extrabold tracking-widest text-lg course-content-title">
                    详细介绍
                </div>
                <div class="p-5 course-content ">
                    <div class="content-item">
                        {{ actionInfo.Description }}
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'uni-mini-router';
import { getActionById } from '@/api/action/action'
const router = useRouter();
const actionInfo = ref({
    CreatedAt: '',
    ID: '',
    Name: '健身动作',
    Imgs: [],
    OrderNum: 0,
    Description: '健身动作描述',
    Videos: []
})

//假数据定义

let actionImgs = [
    {
        id: 0,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    },
    {
        id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
    },
    {
        id: 2,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    },
    {
        id: 3,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }]

actionInfo.value.Imgs = actionImgs

actionInfo.value.Videos = [

]
const init = () => {
    //从后端获取数据
}
onMounted(() => {
    init()
    if (router.route.value.query) {
        const query = router.route.value.query;
        console.log(query)
        if (query.itemid) {
            getActionById(query.itemid).then(res => {
                console.log(res.data.data)
                let response = res.data.data
                actionInfo.value.ID = response.ActionInfos.ID
                actionInfo.value.Name = response.ActionInfos.Name
                actionInfo.value.Description = response.ActionInfos.Description
                actionInfo.value.Imgs = response.ActionImgInfos
                actionInfo.value.Videos = response.ActionVideoInfos
                console.log(actionInfo.value)
            })
        }
    }
})

</script>
<style scoped>
.page video {
    width: 750rpx;
}

.content-item {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>