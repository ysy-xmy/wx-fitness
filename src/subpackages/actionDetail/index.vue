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
                <div class="intro-content gap-4 w-full flex flex-nowrap mb-10">
                    <div class="intro-text w-1/2">
                        <h2 class="intro-title flex items-center mb-3"><span class="title-bar"></span>{{ actionInfo.Name }}</h2>
                        <p class="intro-description text-ellipsis">{{ actionInfo.Description }}</p>
                    </div>
                    <div class="intro-image w-1/2">
                        <template v-if="actionInfo.Imgs && actionInfo.Imgs.length > 0">
                            <swiper class="screen-swiper" :indicator-dots="true" :circular="true"
                                interval="5000" duration="500">
                                <template v-for="(item, index) in actionInfo.Imgs" :key="index">
                                    <swiper-item @click="preview(index)">
                                        <image :src="item.URL" mode="aspectFill"></image>
                                    </swiper-item>
                                </template>
                            </swiper>
                        </template>
                        <template v-else>
                            <van-empty
                                class="custom-empty"
                                description="暂无图片"
                                image-size="200"
                            />
                        </template>
                    </div>
                </div>
                <section class="card">
                    <div class="card-title">
                        <span class="title-bar"></span>
                        <h3>准备工作</h3>
                    </div>
                    <div class="card-body">
                        <p v-html="actionInfo.ReadyWorkContent"></p>
                    </div>
                </section>
                <section class="card">
                    <div class="card-title">
                        <span class="title-bar"></span>
                        <h3>动作步骤</h3>
                    </div>
                    <div class="card-body">
                        <p v-html="actionInfo.Step"></p>
                    </div>
                </section>
                <section class="card">
                    <div class="card-title">
                        <span class="title-bar"></span>
                        <h3>注意事项</h3>
                    </div>
                    <div class="card-body">
                        <p v-html="actionInfo.Attention"></p>
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
    Attention: string;
    Imgs: ImageInfo[];
    ReadyWorkContent: string;
    Step: string;
    OrderNum: number;
    Description: string;
    Videos: any[];
}>({
    CreatedAt: "",
    ID: "",
    Name: "健身动作",
    Imgs: [],
    OrderNum: 0,
    Description: "",
    Videos: [],
    Attention: "",
    ReadyWorkContent: "",
    Step: "",
});

const preview = (index: number) => {
    uni.previewImage({
        current: index,
        urls: actionInfo.value.Imgs.map((item) => item.URL),
        loop: false,
    });
};

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
                actionInfo.value.Description = response.ActionInfos.Description || "暂无描述";
                actionInfo.value.Attention = response.ActionInfos.Attention || "暂无";
                actionInfo.value.ReadyWorkContent = response.ActionInfos.ReadyWorkContent || "暂无";
                actionInfo.value.Step = response.ActionInfos.Step || "暂无";
                // actionInfo.value.Imgs =  [{ URL: "https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20241229/1735406600865.png" }];
                actionInfo.value.Videos = response.ActionVideoInfos || [];
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

.screen-swiper {
    width: 100%;
    height: 300rpx;
    border-radius: 16rpx;
    overflow: hidden;

}

.screen-swiper image {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;

}

.intro-text {
    padding: 20rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.intro-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 7;
    line-clamp: 7;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
    font-size: 28rpx;
    color: #666;
}

.intro-image {
    border-radius: 16rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);

}

.swiper-item:hover image {
    transform: scale(1.02);
}

.custom-empty {
    height: 300rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f8f8;
    border-radius: 16rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

:deep(.van-empty) {
    padding: 0;
}

:deep(.van-empty__image) {
    width: 120rpx;
    height: 120rpx;
}

:deep(.van-empty__description) {
    margin-top: 10rpx;
    padding: 0;
    color: #999;
    font-size: 28rpx;
}
</style>
