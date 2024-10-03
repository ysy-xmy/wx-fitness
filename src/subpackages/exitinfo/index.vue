<template>
    <div class="min-h-screen relative">
        <div class="flex py-5 items-center">
            <button
                class="flex items-center justify-center p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                <img v-if="userInfo.Avatar" :src="userInfo.Avatar" class="w-20 h-20 rounded-full" alt="Avatar">
                <span v-else class="material-icons md-36">add_a_photo</span>
            </button>
        </div>

        <form>

            <view class="cu-form-group margin-top">
            </view>
            <view class="cu-form-group margin-top">
                <view class="title">昵称</view>
                <input class="text-right" placeholder="微信用户" type="nickname" :value="username"
                    @change="onInputChange" />
            </view>


            <view class="cu-form-group margin-top">
                <view class="title">性别</view>
                <picker @change="sexChange" :value="sexindex" :range="sexs">
                    <view class="picker">
                        {{ sexindex > -1 ? sexs[sexindex] : '请选择性别' }}
                    </view>
                </picker>
            </view>

            <view class="cu-form-group margin-top">
                <view class="title">年龄</view>
                <picker @change="ageChange" :value="ageindex" :range="ageList">
                    <view class="picker">
                        {{ ageindex > -1 ? ageList[ageindex] : '请选择年龄' }}
                    </view>
                </picker>
            </view>

            <view class="cu-form-group flex justify-space-between">
                <view class="title">上传企业微信</view>
                <view class="grid col-4 grid-square flex-sub">
                    <view class="bg-img" :data-url="wximg">
                        <image :src="wximg" mode="aspectFill"></image>
                        <view class="cu-tag bg-red" @tap.stop="DeteleWXimg" :data-index="0">
                            <text class='cuIcon-close'></text>
                        </view>
                    </view>
                    <view class="solids" @tap="handleUploadWXimg" v-if="wximg !== ''">
                        <text class='cuIcon-cameraadd'></text>
                    </view>
                </view>
            </view>

            <view class="cu-form-group flex justify-space-between">
                <view class="title">上传体检表</view>
                <view class="grid col-4 grid-square flex-sub">
                    <view class="bg-img" v-for="(item, index) in imgList" :key="index" :data-url="imgList[index]">
                        <image :src="imgList[index]" mode="aspectFill"></image>
                        <view class="cu-tag bg-red" @tap.stop="DeteleBodyexamination" :data-index="index">
                            <text class='cuIcon-close'></text>
                        </view>
                    </view>
                    <view class="solids" @tap="handleUploadimg" v-if="imgList.length < 9">
                        <text class='cuIcon-cameraadd'></text>
                    </view>
                </view>
            </view>
        </form>
        <view class="absolute  cu-bar btn-group">
            <button @click="onSave" class="cu-btn bg-blue  shadow-blur round lg">保存</button>
        </view>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'uni-mini-router';
import { uploadToOSS } from '@/api/oss/ali-oss';
import http from '@/utils/request';
import { useAuthStore } from '@/state/modules/auth';
import { updateUserInfo } from '@/api/user';


const authStore = useAuthStore();
const user = computed(() => authStore.getUser);
const router = useRouter();

const username = ref(user.value.name ? user.value.name : '微信用户');
const ageindex = ref<number>(user.Age ? user.Age - 14 : -1);
const avatarUrl = ref(user.Avatar ? user.Avatar : '../../static/user.png');
const sexindex = ref<number>(user.Sex ? user.Sex : 0);

const sexs = ref(['男', '女'])
const imgList = ref([])
const ageList = ref<number[]>([14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100])
const wximg = ref('')

const handleUploadimg = () => {
    uni.chooseImage({
        count: 9, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
            console.log(res)
            if (imgList.value.length != 0) {
                imgList.value = imgList.value.concat(res.tempFilePaths)
            } else {
                imgList.value = res.tempFilePaths
            }
        }
    });
}
const handleUploadWXimg = () => {
    uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: async (res) => {
            console.log(res)
            wximg.value = res.tempFilePaths[0]

            const tempFilePath = wximg.value;
            try {
                const res = await http.get('/api/user/oss')
                uploadToOSS(res.data.data, tempFilePath).then((url) => {
                    console.log("handleUploadWXimg", url);
                    wximg.value = url;
                });
            } catch (error) {
                console.error("发生错误:", error);
            }
        }
    });
}

const onInputChange = (e: any) => {
    username.value = e.detail.value;
}

const ageChange = (e: any) => {
    ageindex.value = e.detail.value;
}
const sexChange = (e: any) => {
    sexindex.value = parseInt(e.detail.value);
}

const DeteleBodyexamination = (e: any) => {
    uni.showModal({
        title: '删除',
        content: '确定要删除这张照片？',
        cancelText: '再看看',
        confirmText: '删除',
        success: res => {
            if (res.confirm) {
                imgList.value.splice(e.currentTarget.dataset.index, 1)
            }
        }
    })
}
const DeteleWXimg = (e: any) => {
    uni.showModal({
        title: '删除',
        content: '确定要删除这张照片？',
        cancelText: '再看看',
        confirmText: '删除',
        success: res => {
            if (res.confirm) {
                wximg.value = ''
            }
        }
    })
}

console.log("user", user);
const userInfo = ref({
    ID: user.ID ? user.ID : 0,
    Avatar: user.Avatar ? user.Avatar : 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    Username: user.Username ? user.Username : '微信用户',
    Sex: user.Sex ? user.Sex : 0,
    Age: user.Age ? user.Age : 18,
})
console.log("userInfo", userInfo.value);

const onChooseAvatar = async (e: any) => {
    console.log("onChooseAvatar", e.detail);

    const tempFilePath = e.detail.avatarUrl;
    try {
        const res = await http.get('/api/user/oss')
        console.log("onChooseAvatar", res.data.data);
        uploadToOSS(res.data.data, tempFilePath).then((url) => {
            console.log("onChooseAvatar", url);
            userInfo.value.Avatar = url;
        });
    } catch (error) {
        console.error("发生错误:", error);
    }
};

const onSave = () => {
    const authStore = useAuthStore();
    const user = authStore.getUser;
    console.log("onSave", user);
    userInfo.value.ID = user.id;
    userInfo.value.Username = username.value;
    userInfo.value.Sex = sexindex.value;
    userInfo.value.Age = ageList.value[ageindex.value];
    userInfo.value.Avatar = userInfo.value.Avatar;


    updateUserInfo(userInfo.value).then(() => {
        console.log("保存成功");
        user.Username = userInfo.value.Username;
        user.Sex = userInfo.value.Sex;
        user.Age = userInfo.value.Age;
        user.Avatar = userInfo.value.Avatar;
        authStore.setUser(user);
        console.log("save user", user);

    }).catch(() => {
        console.log("保存失败");
    });

    uni.showLoading({ title: '加载中...', mask: true });
    setTimeout(() => {
        uni.hideLoading()
        uni.showToast({ title: '保存成功', icon: 'success' });
        router.back();
    }, 1000);
}
</script>