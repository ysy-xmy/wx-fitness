<template>
    <div class="action-main">
        <div class="action-header">
            <div class="action-video">
                <view class="page">
                    <video
                        src="http://vodkgeyttp8.vod.126.net/cloudmusic/ISAxMDkgMGQhIDEiIDJkIA==/mv/10845037/63d93365e58c8c08bcbee69087afaf7b.mp4?wsSecret=1513998c95644263073b551d37ffdcb8&wsTime=1727943256"
                        id="myVideo"></video>

                </view>

            </div>
        </div>
        <div class="action-content">
            <div class="action-title text-2xl font-extrabold px-5 py-2 border-l-8 border-[#fd7d46]">{{ actionInfo.Name
                }}</div>
            <div class="action-imgs flex justify-center">
                <swiper class="screen-swiper square-dot w-full px-6 mt-4" :indicator-dots="true" :circular="true"
                    interval="5000" duration="500">
                    <swiper-item v-for="(item, index) in actionImgs" :key="index">
                        <image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
                        <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false"
                            objectFit="cover" v-if="item.type == 'video'"></video>
                    </swiper-item>
                </swiper>
            </div>
            <div class="action-desc">
                <div class="pl-5 font-extrabold tracking-widest text-lg course-content-title">
                    详细介绍
                </div>
                <div class="p-5 course-content ">
                    <div class="content-item">
                        杠铃卧推：平板、上斜、下斜杠铃卧推动作图解教程
                    </div>
                    <div class="content-item">
                        杠铃卧推能增加胸大肌厚度。平板、上斜、下斜三种形式的杠铃卧推，分别重点锻炼胸大肌不同部位，其他还涉及肱三头肌、三角肌。
                    </div>
                    <div class="content-item">
                        杠铃卧推（barbell press）是锻炼胸肌的经典动作，属于自由重量卧推，比固定器械的效果更好，因此胸大肌和上臂力量达到一定水平后最好用杠铃或哑铃进行卧推，这样才能得到完美的胸肌。
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'uni-mini-router';
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