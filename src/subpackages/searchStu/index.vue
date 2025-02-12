<template>
  <div>
    <view class="cu-bar search bg-white">
      <view class="search-form round">
        <text class="cuIcon-search"></text>

        <input
          :value="searchText"
          :adjust-position="false"
          type="text"
          placeholder="搜索我的学员"
          confirm-type="search"
          @change="(e) => (searchText = e.detail.value)"
        />
      </view>
      <view class="action">
        <button class="cu-btn bg-green" @click="search">搜索</button>
      </view>
    </view>
  </div>
  <div class="bg-white coachlist p-2">
    <div
      class="nodata-card flex flex-col justify-center items-center w-full"
      v-if="list.length === 0"
    >
      <van-empty description="暂无学员" />
    </div>
    <div
      class="lists-item flex flex-nowrap items-start justify-between p-1"
      v-else
      v-for="(item, index) in list"
      :key="item.ID"
    >
      <div class="w-14 h-14 mr-2">
        <img
          class="w-14 h-14 rounded-full"
          :src="
            item.Avatar
              ? item.Avatar
              : 'https://img.yzcdn.cn/vant/user-inactive.png'
          "
          alt=""
        />
      </div>
      <div class="flex-1 flex pl-2 flex-row items-start justify-between">
        <div class="text-box">
          <div class="title">
            <h1 class="w-full flex text-lg font-bold pt-2">
              <span
                class="max-w-[180px] mr-1 whitespace-nowrap text-ellipsis overflow-hidden"
              >
                {{ item.CoachID !== 0 ? item.Username : "自我训练" }}
              </span>
              <span
                v-if="item.StudentRemark"
                class="max-w-[180px] mr-1 whitespace-nowrap text-ellipsis overflow-hidden text-[#ff6b6b]"
                >({{ item.StudentRemark }})</span
              >
            </h1>

            <p
              v-if="item.CoachID !== 0"
              class="text-[#6b7280] text-[14px] w-max-[180px] break-all"
            >
              {{ item.Name }} {{ handleCourseType(item.CourseType) }}
              {{ item.LessonCount ? item.LessonCount + "节" : "" }}
              <span v-if="item.remark" class="text-[#ff6b6b]"
                >({{ item.remark }})</span
              >
            </p>
            <p
              v-else
              class="text-[#6b7280] text-[14px] w-max-[180px] break-all"
            >
              为自己安排训练计划
            </p>
          </div>
        </div>

        <div class="btn h-full mt-[17px] flex flex-row items-center gap-2">
          <van-button
            @click="
              todetail(
                item.UserID,
                item.ID,
                item.CoachPunchInAuth,
                item.Name,
                item.StudentRemark
              )
            "
            color="#5ccee0"
            size="small"
            round
            type="primary"
            class="tracking-wide"
            ><span>查看</span></van-button
          >
          <van-button
            v-if="item.CoachID !== 0"
            @click="showTagDialog(item)"
            color="#8e44ad"
            size="small"
            round
            type="primary"
            class="tracking-wide"
            ><span>备注</span></van-button
          >
        </div>
      </div>
    </div>
  </div>
  <van-dialog
    use-slot
    title="添加备注"
    :show="showDialogAddTags"
    show-cancel-button
    @confirm="addTags"
    @close="
      () => {
        addTagVal = '';
        showDialogAddTags = false;
      }
    "
  >
    <van-field
      :value="addTagVal"
      placeholder="输入备注"
      @change="(e: any) => (addTagVal = e.detail)"
    />
  </van-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getCoachStudentinfo } from "@/api/coach";
import { changeCourseMes } from "@/api/course";
import { useRouter } from "uni-mini-router";
import { useActionsStore } from "@/state/modules/actions";
const router = useRouter();
onMounted(() => {
  getData();
});
const list = ref<any[]>([]);
const showDialogAddTags = ref(false);
const totalList = ref<any[]>([]);
const tempval = ref<any>({});
const addTagVal = ref("");
const getData = async () => {
  const res = await getCoachStudentinfo();
  if (res.data.code === 200) totalList.value = res.data.data;
  console.log("教练学生列表", res, totalList.value);
  list.value = totalList.value;
};
const showTagDialog = (item: any) => {
  addTagVal.value = item.StudentRemark || "";
  tempval.value = item;
  showDialogAddTags.value = true;
};
const handleCourseType = (type: any) => {
  switch (type) {
    case "month":
      return "包月";
    case "quarter":
      return "包季";
    case "year":
      return "包年";
    case "lesson":
      return "";
    default:
      return "";
  }
};
const searchText = ref("");
const search = () => {
  list.value = totalList.value.filter((i) => {
    return (
      i.Username.indexOf(searchText.value) !== -1 ||
      i.StudentRemark.indexOf(searchText.value) !== -1
    );
  });
};
const clearSearch = () => {
  searchText.value = "";
  list.value = totalList.value;
};

const addTags = async () => {
  const current = addTagVal.value;
  const res = await changeCourseMes({
    ID: tempval.value.ID,
    UserID: tempval.value.UserID,
    CourseID: tempval.value.CourseID,
    StudentRemark: addTagVal.value,
  });

  if (res.data.code == 200) {
    uni.showToast({
      title: "备注成功",
      icon: "success",
    });
    const val = list.value.find((i) => i.ID === tempval.value.ID);
    if (val) {
      val.StudentRemark = current;
    }
    const totalVal = totalList.value.find((i) => i.ID === tempval.value.ID);
    if (totalVal) {
      totalVal.StudentRemark = current;
    }
    addTagVal.value = "";
    showDialogAddTags.value = false;
  } else {
    uni.showToast({
      title: "备注失败",
      icon: "error",
    });
  }
};
const todetail = (
  stuid: any,
  courseId: any,
  CoachPunchInAuth: any,
  name: any,
  remark: any
) => {
  console.log("查看");
  useActionsStore().setClassID(courseId);
  useActionsStore().setClassname(name);
  useActionsStore().setRemark(remark);
  router.push({
    name: "studentDetail",
    params: {
      studentId: stuid,
      courseId: courseId,
      CoachPunchInAuth: CoachPunchInAuth,
    },
  });
};
</script>
<style scoped>
.lists-item {
  margin-bottom: 10px;
}
</style>
