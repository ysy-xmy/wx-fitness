<template>
    <div class="action-main">
        <div class="action-header">
            <div class="action-video">
                <view class="page">
                    <video v-if="actionInfo.Videos && actionInfo.Videos.length > 0" :src="actionInfo.Videos[0].URL"
                        id="myVideo"></video>
                </view>
            </div>
        </div>
        <div class="action-content">
            <div class="exercise-guide">
                <div class="intro-content w-full flex flex-nowrap">
                    <div class="intro-text w-1/2">
                        <h2 class="intro-title flex items-center mb-3"><span class="title-bar"></span>窄距俯卧撑</h2>
                        <p>红的俯卧撑是锻炼身体中最常见的力量训练动作之一，主要针对胸大肌、三角肌前束和肱三头肌。以下是红的俯卧撑的详细介绍</p>
                    </div>
                    <div class="intro-image w-1/2">
                        <swiper class="screen-swiper square-dot px-6 mt-4" :indicator-dots="true" :circular="true"
                            interval="5000" duration="500">
                            <template v-for="(item, index) in actionInfo.Imgs" :key="index">
                                <swiper-item @click="preview(index)">
                                    <image :src="item.URL" mode="aspectFill"></image>
                                </swiper-item>
                            </template>
                        </swiper>
                    </div>
                </div>
                <section class="card">
                    <div class="card-title">
                        <span class="title-bar"></span>
                        <h3>准备工作</h3>
                    </div>
                    <div class="card-body">
                        <li>选择合适重量的杠铃。</li>
                        <li>准备一张平稳的卧推凳。</li>
                    </div>
                </section>
                <section class="card">
                    <div class="card-title">
                        <span class="title-bar"></span>
                        <h3>动作步骤</h3>
                    </div>
                    <div class="card-body">
                        <li>身体平躺在卧推凳上，两脚分开，与肩同宽，脚掌平贴地面。</li>
                        <li>抓住杠铃，双手距离略宽于肩，掌心朝前，肘部��直。</li>
                        <li>将杠铃从杠架上取下，缓慢下降至胸部正上方。</li>
                        <li>吸气，慢慢将杠铃下降至胸部，肘部靠近身体。</li>
                        <li>
                            当杠铃触及胸部时，停留一下，然后用力，肩膀和手臂的力量将杠铃推起，直到手臂伸直。
                        </li>
                        <li>重复上述动作，完成设定的次数。</li>
                    </div>
                </section>
                <section class="card">
                    <div class="card-title">
                        <span class="title-bar"></span>
                        <h3>注意事项</h3>
                    </div>
                    <div class="card-body">
                        <li>动作过程中，背部始终紧贴卧推凳，避免腰部悬空。</li>
                        <li>推举和下降过程中，肘部始终紧贴身体侧面，避免肘部过分外展。</li>
                        <li>推举过程中时刻不要憋气或屏住呼吸，以免造成不适的感觉。</li>
                        <li>
                            控制杠铃的下降速度，避免过快下降，下降过程控制2-3秒，推起过程控制1-2秒。
                        </li>
                        <li>保持呼吸均匀，下降时吸气，推起时呼气。</li>
                        <li>
                            锻炼前充分热身，锻炼后进行适当的放松和拉伸，以达到更好的锻炼效果。
                        </li>
                    </div>
                </section>
            </div>

        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "uni-mini-router";
import { getActionById } from "@/api/action/action";

interface ImageInfo {
    URL: string;
    // 其他可能的属性...
}

const router = useRouter();
const actionInfo = ref<{
    CreatedAt: string;
    ID: string;
    Name: string;
    Imgs: ImageInfo[];
    OrderNum: number;
    Description: string;
    Videos: any[];
}>({
    CreatedAt: "",
    ID: "",
    Name: "健身动作",
    Imgs: [],
    OrderNum: 0,
    Description: "健身动作描述",
    Videos: [],
});

//假数据定义

// let actionImgs = [
//     {
//         id: 0,
//         type: 'image',
//         url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
//     },
//     {
//         id: 1,
//         type: 'image',
//         url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
//     },
//     {
//         id: 2,
//         type: 'image',
//         url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
//     },
//     {
//         id: 3,
//         type: 'image',
//         url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
//     }]

const preview = (index: number) => {
    uni.previewImage({
        current: index,
        urls: actionInfo.value.Imgs.map((item) => item.URL),
        loop: false,
    });
};

// actionInfo.value.Imgs = actionImgs

actionInfo.value.Videos = [];
const init = () => {
    //从后端获取数据
};

onMounted(() => {
    init();
    if (router.route.value.query) {
        const query = router.route.value.query;
        console.log(query);
        if (query.itemid) {
            uni.showLoading({ title: "加载中...", mask: true });
            getActionById(query.itemid).then((res) => {
                console.log(res.data.data);
                let response = res.data.data;
                actionInfo.value.ID = response.ActionInfos.ID;
                actionInfo.value.Name = response.ActionInfos.Name;
                actionInfo.value.Description = response.ActionInfos.Description;
                actionInfo.value.Imgs = response.ActionImgInfos;
                actionInfo.value.Videos = response.ActionVideoInfos;
                uni.hideLoading();
            });
        }
    }
});
</script>
<style scoped>
.page video {
    width: 750rpx;
}

.content-item {
    margin-top: 10px;
    margin-bottom: 10px;
}

.exercise-guide {
    font-family: "Arial", sans-serif;
    padding: 20px;
    background-color: #f9f9f9;
}

.title {
    text-align: center;
    margin-bottom: 20px;
}

.title h2 {
    font-size: 24px;
    color: #333;
    background-color: #e0e7ff;
    padding: 10px;
    border-radius: 5px;
    display: inline-block;
}

.title p {
    font-size: 14px;
    color: #666;
    margin: 10px 0;
}

.title img {
    width: 100%;
    max-width: 300px;
    margin: 20px 0;
}

.card-body {
    background-color: #f0f4ff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
}

.card-title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 18px;
}

.intro-title {
    font-weight: bold;
    font-size: 18px;
}

.card-title h3 {
    font-size: 18px;
    color: #333;
    margin: 0;
}

.title-bar {
    display: inline-block;
    width: 5px;
    height: 20px;
    background-color: #00bcd4;
    margin-right: 10px;
}


.card div {
    padding-left: 20px;
}

.card div li {
    margin-bottom: 10px;
    font-size: 14px;
    color: #555;
}
</style>
