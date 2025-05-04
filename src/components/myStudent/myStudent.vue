<template>
  <div class="h-full flex flex-col overflow-y-auto pb-5">
    <template v-if="list.length > 0">
      <template v-for="(item, index) in list" :key="item.ID">
        <div class="bg-white coachlist p-1">
          <div
            class="lists-item flex flex-nowrap items-start justify-between p-1">
            <div class="w-12 h-12 mr-2">
              <img
                class="w-12 h-12 rounded-full"
                :src="
                  item.Avatar
                    ? item.Avatar
                    : 'https://img.yzcdn.cn/vant/user-inactive.png'
                "
                alt="" />
            </div>
            <div
              class="flex-1 flex pl-1 w-0 flex-row items-start justify-between">
              <div class="text-box">
                <div class="title">
                  <h1 class="w-full flex text-lg font-bold pt-2 items-center">
                    <span
                      class="max-w-[180px] mr-1 whitespace-nowrap text-ellipsis overflow-hidden">
                      {{ item.CoachID !== 0 ? item.Username : "自我训练" }}
                    </span>
                    <span
                      v-if="item.StudentRemark"
                      class="max-w-[180px] mr-1 whitespace-nowrap text-ellipsis overflow-hidden text-[#fd72729d] text-xs"
                      >({{ item.StudentRemark }})</span
                    >
                    <!-- <text
                      v-if="item.Sex && item.CoachID !== 0"
                      style="font-size: 25px; color: #a54aff"
                      class="cuIcon-female w-10 h-10 text-2xl text-red margin-right-xs"
                    ></text>

                    <text
                      v-if="item.CoachID !== 0"
                      style="font-size: 25px; color: #16a9fa"
                      class="cuIcon-male w-10 h-10 text-2xl text-red margin-right-xs"
                    ></text> -->
                  </h1>

                  <p
                    v-if="item.CoachID !== 0"
                    class="text-[#6b7280] text-[12px] w-max-[180px] break-all">
                    {{ item.Name }} {{ handleCourseType(item.CourseType) }}
                    {{ item.LessonCount ? item.LessonCount + "节" : "" }}
                    <span v-if="item.remark" class="text-[#ff6b6b]"
                      >({{ item.remark }})</span
                    >
                  </p>
                  <p
                    v-else
                    class="text-[#6b7280] text-[12px] w-max-[180px] break-all">
                    为自己安排训练计划
                  </p>
                </div>
              </div>

              <div
                class="btn h-full mt-[17px] flex flex-row items-center gap-2">
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
                  size="mini"
                  round
                  type="primary"
                  class="tracking-wide"
                  ><span>查看</span></van-button
                >
                <van-button
                  v-if="item.CoachID !== 0"
                  @click="showTagDialog(item)"
                  color="#8e44ad"
                  size="mini"
                  round
                  type="primary"
                  class="tracking-wide"
                  ><span>备注</span></van-button
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="nodata-card flex flex-col justify-center items-center w-full">
        <van-empty description="暂无学员" />
      </div>
    </template>
  <!-- 添加备注弹窗 -->
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
    ">
    <van-field
      :value="addTagVal"
      placeholder="输入备注"
      maxlength="10"
      @change="(e) => (addTagVal = e.detail)" />
  </van-dialog>
</div>
</template>
<script lang="ts" setup>
import { useRouter } from "uni-mini-router";
import { ref, onMounted } from "vue";
import { getCoachStudentinfo } from "@/api/coach";
import { useActionsStore } from "@/state/modules/actions";
import { changeCourseMes } from "@/api/course";
const router = useRouter();
let list = ref<any[]>([]);
const showDialogAddTags = ref(false);
const currentRemark = ref("");
const currentIndex = ref(-1);
const addTagVal = ref("");
onMounted(() => {
  uni.showLoading({ title: "数据加载中" });
  getListData();
  setTimeout(() => {
    uni.hideLoading();
  }, 3000);
});
const getListData = async () => {
  const res = await getCoachStudentinfo();
  if (res && res.data && res.data.data) {
    list.value = res.data.data;
  } else {
    list.value = [];
  }
  uni.hideLoading();
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
    console.log(
      "备注成功",
      list.value,
      tempval.value,
      list.value.find((i) => i.ID === tempval.value.ID),
      current
    );
    const val = list.value.find((i) => i.ID === tempval.value.ID);
    if (val) {
      val.StudentRemark = current;
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
const tempval = ref({});
const showTagDialog = (item: any) => {
  addTagVal.value = item.StudentRemark || "";
  tempval.value = item;
  showDialogAddTags.value = true;
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

.text-box {
  width: 60%;
  overflow: hidden;
  flex: 1;
}
</style>
