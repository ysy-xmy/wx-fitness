<template>
  <div class="min-h-screen relative">
    <div class="flex py-5 items-center">
      <button
        class="flex items-center justify-center p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        open-type="chooseAvatar"
        @chooseavatar="chooseAvatar"
      >
        <img
          v-if="userInfo.Avatar"
          :src="userInfo.Avatar"
          class="w-20 h-20 rounded-full"
          alt="Avatar"
        />
        <span v-else class="material-icons md-36 w-20 h-20 rounded-full"
          >上传一张图片</span
        >
      </button>
    </div>

    <form>
      <view class="cu-form-group margin-top"> </view>
      <view class="cu-form-group margin-top">
        <view class="title">昵称</view>
        <input
          class="text-right"
          placeholder="微信用户"
          type="nickname"
          :value="username"
          @change="onInputChange"
        />
      </view>

      <view class="cu-form-group margin-top">
        <view class="title">性别</view>
        <picker @change="sexChange" :value="sexindex" :range="sexs">
          <view class="picker">
            {{ sexindex > -1 ? sexs[sexindex] : "请选择性别" }}
          </view>
        </picker>
      </view>

      <view class="cu-form-group margin-top">
        <view class="title">年龄</view>
        <picker @change="ageChange" :value="ageindex" :range="ageList">
          <view class="picker">
            {{ ageindex > -1 ? ageList[ageindex] : "请选择年龄" }}
          </view>
        </picker>
      </view>

      <view
        class="cu-form-group flex justify-space-between"
        v-if="user.RoleName === 'coach'"
      >
        <view class="title">上传企业微信</view>
        <view class="grid col-4 grid-square flex-sub">
          <view
            class="bg-img"
            v-for="(item, index) in wximg"
            :key="index"
            :data-url="wximg[index]"
          >
            <image
              :src="wximg[index]"
              mode="aspectFill"
              @click="preview(index, wximg)"
            ></image>
            <view
              class="cu-tag bg-red"
              @tap.stop="DeteleWXimg"
              :data-index="index"
            >
              <text class="cuIcon-close"></text>
            </view>
          </view>
          <view class="solids" @tap="handleUploadWXimg" v-if="wximg.length < 1">
            <text class="cuIcon-cameraadd"></text>
          </view>
        </view>
      </view>
      <view
        class="cu-form-group flex justify-space-between"
        v-if="user.RoleName === 'coach'"
      >
        <view class="title">上传教练资格证</view>
        <view class="grid col-4 grid-square flex-sub">
          <view
            class="bg-img"
            v-for="(item, index) in coachcert"
            :key="index"
            :data-url="coachcert[index]"
          >
            <image
              :src="coachcert[index]"
              mode="aspectFill"
              @click="preview(index, coachcert)"
            ></image>
            <view
              class="cu-tag bg-red"
              @tap.stop="Detelecoachcert"
              :data-index="index"
            >
              <text class="cuIcon-close"></text>
            </view>
          </view>
          <view
            class="solids"
            @tap="handleUploadcoachcert"
            v-if="coachcert.length < 1"
          >
            <text class="cuIcon-cameraadd"></text>
          </view>
        </view>
      </view>
      <view class="cu-form-group flex justify-space-between">
        <view class="title">上传体检表</view>
        <view class="grid col-4 grid-square flex-sub">
          <view
            class="bg-img"
            v-for="(item, index) in imgList"
            :key="index"
            :data-url="imgList[index]"
          >
            <image
              :src="imgList[index]"
              mode="aspectFill"
              @click="preview(index, imgList)"
            ></image>
            <view
              class="cu-tag bg-red"
              @tap.stop="DeteleBodyexamination"
              :data-index="index"
            >
              <text class="cuIcon-close"></text>
            </view>
          </view>
          <view class="solids" @tap="handleUploadimg" v-if="imgList.length < 9">
            <text class="cuIcon-cameraadd"></text>
          </view>
        </view>
      </view>
    </form>
    <view class="absolute cu-bar btn-group">
      <button @click="onSave" class="cu-btn bg-blue shadow-blur round lg">
        保存
      </button>
    </view>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "uni-mini-router";
import { uploadimg } from "../apis/api";
import { useAuthStore } from "@/state/modules/auth";
import { updateUserInfo, getUserInfo } from "@/api/user";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
onMounted(async () => {
  uni.showLoading();
  const res = await getUserInfo();
  username.value = res.data.data.Username;
  ageindex.value = Number(res.data.data.Age) - 14 || 0;
  avatarUrl.value = res.data.data.Avatar || "../../static/user.png";
  sexindex.value = res.data.data.Sex || 0;
  userId.value = res.data.data.ID;
  wximg.value = res.data.data.WeChatBusinessImg
    ? [res.data.data.WeChatBusinessImg]
    : [];
  coachcert.value = res.data.data.CoachCert ? [res.data.data.CoachCert] : [];
  imgList.value = res.data.data.BodyCheckTable || [];
  uni.hideLoading();
});
const preview = (index: number, list: string[]) => {
  uni.previewImage({
    current: index,
    urls: list,
    loop: true,
    indicator: "number",
  });
};
const username = ref("微信用户");
const coachcert = ref([]);
const ageindex = ref<number>(0);
const avatarUrl = ref("../../static/user.png");
const sexindex = ref<number>(0);
const userId = ref("");
const sexs = ref(["男", "女"]);
const imgList = ref([]);
const ageList = ref<number[]>([
  14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
  33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
  71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
  90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
]);
const wximg = ref([]);
//上传体检表
const handleUploadimg = () => {
  uni.chooseImage({
    count: 9, // 默认最多选择9张图片
    sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ["album"], // 从相册选择
    success: (res) => {
      // 在这个上下文中使用 await 之前，确保是 async 函数
      handleImageUpload(res.tempFilePaths);
    },
    fail: (err) => {
      console.error("选择图片失败:", err);
    },
  });
};

// 将上传逻辑提取到新的 async 函数中
const handleImageUpload = async (filePaths) => {
  try {
    const promises = filePaths.map((item) => uploadimg(item));
    const responses = await Promise.all(promises);
    console.log(responses, "上传结果");

    // 将上传结果加入到 imgList 中
    responses.forEach((uploadedImgUrl) => {
      console.log(imgList.value, "当前 imgList");
      imgList.value.push(uploadedImgUrl);
    });
  } catch (error) {
    console.error("上传图片时出错:", error);
  }
};

//上传教练资格证
const handleUploadcoachcert = () => {
  uni.chooseImage({
    count: 1, //默认9
    sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ["album"], //从相册选择
    success: (res) => {
      console.log(res.tempFilePaths);
      res.tempFilePaths.forEach((item) => {
        console.log(item);
        uploadimg(item).then((res) => {
          coachcert.value = [res];
        });
      });
    },
  });
};
const onInputChange = (e: any) => {
  username.value = e.detail.value;
};

const ageChange = (e: any) => {
  ageindex.value = e.detail.value;
};
const sexChange = (e: any) => {
  sexindex.value = parseInt(e.detail.value);
};

const DeteleBodyexamination = (e: any) => {
  uni.showModal({
    title: "删除",
    content: "确定要删除这张照片？",
    cancelText: "再看看",
    confirmText: "删除",
    success: (res) => {
      if (res.confirm) {
        imgList.value.splice(e.currentTarget.dataset.index, 1);
      }
    },
  });
};
const DeteleWXimg = (e: any) => {
  uni.showModal({
    title: "删除",
    content: "确定要删除这张照片？",
    cancelText: "再看看",
    confirmText: "删除",
    success: (res) => {
      if (res.confirm) {
        wximg.value = [];
      }
    },
  });
};
const Detelecoachcert = (e: any) => {
  uni.showModal({
    title: "删除",
    content: "确定要删除这张照片？",
    cancelText: "再看看",
    confirmText: "删除",
    success: (res) => {
      if (res.confirm) {
        coachcert.value = [];
      }
    },
  });
};

const userInfo = ref({
  ID: userId.value,
  Avatar: avatarUrl,
  Username: user.value.name,
  Sex: user.value.Sex,
  Age: user.value.Age,
});
console.log("userInfo", userInfo.value);

//换头像
const chooseAvatar = (e: any) => {
  //   console.log(e.detail.avatarUrl);
  uploadimg(e.detail.avatarUrl).then((res) => {
    userInfo.value = {
      ID: user.value.ID,
      Avatar: res,
      Username: user.value.name,
      Sex: user.value.Sex,
      Age: user.value.Age,
    };
  });
};
//这里废弃了，用自带的就行
const onChooseAvatar = async (e: any) => {
  uni.chooseImage({
    count: 1, //默认9
    sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ["album"], //从相册选择
    success: (res) => {
      console.log(res.tempFilePaths);
      res.tempFilePaths.forEach((item) => {
        console.log(item);
        uploadimg(item).then((res) => {
          userInfo.value = {
            ID: user.value.ID,
            Avatar: res,
            Username: user.value.name,
            Sex: user.value.Sex,
            Age: user.value.Age,
          };
        });
      });
    },
  });
};

const onSave = () => {
  const authStore = useAuthStore();
  const user = authStore.getUser;
  let data = {};
  if (user.RoleName === "coach")
    data = {
      ID: userId.value,
      Username: username.value,
      Sex: sexindex.value,
      Age: ageList.value[ageindex.value],
      Avatar: userInfo.value.Avatar,
      BodyCheckTable: imgList.value,
      CoachCert: coachcert.value[0] || "",
      WeChatBusinessImg: wximg.value[0] || "",
    };
  else
    data = {
      ID: userId.value,
      Username: username.value,
      Sex: sexindex.value,
      Age: ageList.value[ageindex.value],
      Avatar: userInfo.value.Avatar,
      BodyCheckTable: imgList.value,
    };
  uni.showLoading({ title: "修改中", mask: true });
  updateUserInfo(data)
    .then(() => {
      uni.hideLoading();
      uni.showToast({
        title: "保存成功",
        icon: "success",
      });
      authStore.setUser({
        name: username.value,
        id: userId.value,
        phone: user.phone,
        Sex: sexindex.value,
        img: userInfo.value.Avatar,
        RoleName: user.RoleName,
        Age: ageList.value[ageindex.value],
      });
      uni.$emit("changeUser", true);
      //   user.Username = userInfo.value.Username;
      //   user.Sex = userInfo.value.Sex;
      //   user.Age = userInfo.value.Age;
      //   user.Avatar = userInfo.value.Avatar;
      //   authStore.setUser(user);
      //   console.log("save user", user);
    })
    .catch(() => {
      uni.hideLoading();
      uni.showToast({
        title: "保存失败",
        icon: "error",
      });
    });
};
</script>
