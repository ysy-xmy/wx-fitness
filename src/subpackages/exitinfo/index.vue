<template>
    <!-- <div class="exitinfo">个人资料</div>
    <button class="bg-white border-none" @cancel="onAvatarCancel" open-type="chooseAvatar"
        @chooseavatar="bindchooseavatar">
        <image class="rounded-full w-24 h-24" :src="avatarUrl"></image>
    </button> -->
    <div class="min-h-screen relative">
        <div class="flex py-5 items-center">
            <button
                class="flex items-center justify-center p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" class="w-20 h-20 rounded-full" alt="Avatar">
                <span v-else class="material-icons md-36">add_a_photo</span>
            </button>
        </div>

        <form>

            <view class="cu-form-group margin-top">

                <!-- <van-field type="nickname" autocomplete="off" v-model="value" label="昵称" placeholder="微信用户" /> -->

            </view>
            <view class="cu-form-group margin-top">
                <view class="title">昵称</view>
                <input placeholder="微信用户" type="nickname" name="input" />
            </view>


            <view class="cu-form-group margin-top">
                <view class="title">性别</view>
                <picker @change="sexChange" :value="sexindex" :range="sexs">
                    <view class="picker">
                        {{ sexindex > -1 ? sexs[sexindex] : '请选择性别' }}
                    </view>
                </picker>
            </view>
            <view class="cu-form-group">
                <view class="title">出生日期</view>
                <picker mode="date" :value="birthdate" start="2000-01-01" end="2024-09-20" @change="DateChange">
                    <view class="picker">
                        {{ birthdate ? birthdate : '请选择出生日期' }}
                    </view>
                </picker>
            </view>


        </form>
        <view class="absolute  cu-bar btn-group">
            <button @click="onSave" class="cu-btn bg-blue  shadow-blur round lg">保存</button>
        </view>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'uni-mini-router';
const router = useRouter();
const avatarUrl = ref('../../static/user.png');
const sexindex = ref();
const date = ref('2022-01-01');
const birthdate = ref()
const sexs = ref(['男', '女'])


const sexChange = (e: any) => {
    sexindex.value = e.detail.value;
}

const userInfo = ref({
    avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    nickName: '微信用户',
    gender: 1,
    birthdate: '2022-01-01'
})
const onChooseAvatar = (e: any) => {
    console.log(e.detail.avatarUrl)
    userInfo.value.avatarUrl = e.detail.avatarUrl
}



const DateChange = (e: any) => {
    birthdate.value = e.detail.value
}

const onSave = () => {
    console.log(userInfo.value)
    uni.showLoading({ title: '加载中...', mask: true });
    setTimeout(() => {
        uni.hideLoading()
        uni.showToast({ title: '保存成功', icon: 'success' });
        router.back();
    }, 1000);


}




</script>