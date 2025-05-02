<template>
  <div class="search">
    <van-search
      style="width: 100%"
      v-model="mesState.searchVal"
      placeholder="请输入关键词"
      @search="changeMesList"
      @cancel="clearVal"
    />
  </div>
  <div class="secCheck">
    <van-checkbox v-model="mesState.checked" @change="changeMesList">
      仅显示未读
    </van-checkbox>
    <div class="allRead" @click="clickAllRead">
      <van-icon name="success" />
      一键已读
    </div>
  </div>
  <div class="right" ref="mesListRef" @scroll="handleScroll">
    <van-collapse :value="mesState.activeKey" accordion @change="showDetail">
      <div
        class="card"
        v-for="(item, index) in mesStore.mesList"
        :key="item.id"
      >
        <van-collapse-item :name="item.id" class="collapse-item">
          <view slot="title">
            <view class="dot" v-if="!item.readed"></view>
            {{ item.title }}</view
          >
          <div class="detailContent" v-html="item.content"></div>
        </van-collapse-item>
      </div>
      <div
        class="bottom_text"
        v-if="mesStore.mesList.length >= mesStore.total - 1"
      >
        已经到底了
      </div>
      <div
        class="bottom_text"
        v-else-if="mesStore.length < mesStore.total - 1 && mesState.loading"
      >
        <van-loading />
        <div>加载中...</div>
      </div>
    </van-collapse>
    <div v-if="mesStore.mesList.length === 0" class="emptystatus">
      <div class="emptyText">暂无信息</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getNotifyList, readNotify } from "@/api/notify/index";
// import router from "@/router";
// import {
//   QuestionCircleOutlined,
//   ExclamationCircleFilled,
//   SettingOutlined,
//   DownOutlined,
//   UpOutlined,
//   LoadingOutlined,
//   CheckOutlined,
// } from "@ant-design/icons-vue";

// <van-icon name="arrow-down" />
import {
  nextTick,
  onMounted,
  reactive,
  ref,
  type ComponentPublicInstance,
} from "vue";
// import { useNotifyStore } from "@/stores/notifyMes";
import { usemesStore } from "@/state/modules/mes";
import { useAuthStore } from "@/state/modules/auth";
const mesStore = usemesStore();
const mesState = reactive<{
  mesType: "official" | "persional" | "total";
  checked: boolean;
  searchVal: string;
  activeKey: string[];
  page_size: number;
  page_index: number;
  loading: boolean;
}>({
  mesType: "total",
  checked: false,
  searchVal: "",
  activeKey: [] as string[],
  page_size: 10,
  page_index: 1,
  loading: true,
});
onMounted(() => {
  changeMesList();
  mesListRefHeight.value = mesListRef.value?.offsetHeight
    ? mesListRef.value?.offsetHeight
    : 0;
});
const mesListRefHeight = ref(0);
const clearVal = () => {
  mesState.searchVal = "";
  changeMesList();
};
const clickAllRead = async () => {
  if (mesStore.hadNew == 0)
    uni.showToast({
      title: "没有新消息",
      icon: "none",
    });
  else {
    const res = await readNotify(-1);
    if (res.code == 20000) {
      mesStore.setClear(true);
      mesStore.sethadNew(0);

      mesList.value.forEach((item) => {
        item.readed = true;
      });
    } else {
      uni.showToast({
        title: "全部已读失败",
        icon: "error",
      });
    }
  }
};
const showDetail = (e: any) => {
  if (!e) return; // 如果没有选中项，直接返回
  console.log(e.detail);
  mesState.activeKey = e.detail;
  nextTick(() => {
    let temp: HTMLElement | null = null;
    const index = mesList.value.findIndex((item) => item.id === e);
    // notifyStore.sethadNew(false);
    temp = refList.value[index];

    if (typeof index !== "number") return;
    if (!temp) return;
    console.log(index, temp, 123);
    const { width, height } = temp.getBoundingClientRect();
    let lastHeight = height;
    const getHeight = () => {
      const { height: heightNew } = (
        temp as HTMLElement
      ).getBoundingClientRect();
      if (heightNew !== lastHeight || heightNew === height) {
        console.log("heightNew", heightNew);
        lastHeight = heightNew;
        requestAnimationFrame(getHeight);
      } else {
        const topHeight = (temp as HTMLElement).offsetTop; //子元素相对于父元素的高度
        if (heightNew >= mesListRefHeight.value) {
          (mesListRef.value as HTMLElement).scrollTo({
            top: topHeight, //滚动到的位置
            behavior: "smooth",
          });
        } else {
          (mesListRef.value as HTMLElement).scrollTo({
            top: topHeight - (mesListRefHeight.value - heightNew) / 2, //滚动到的位置
            behavior: "smooth",
          });
        }
      }
    };
    if (!mesList.value[index].readed)
      readNotify(mesList.value[index].id).then((res) => {
        if (res.code == 20000) {
          console.log(mesList.value[index]);
          mesList.value[index].readed = true;
          mesStore.sethadNew(false);
        }
      });
    // 不再需要单独获取详情，直接使用item.content
    // getNotifyDeatil(mesList.value[index].id).then((res) => {
    //   if (res.code == 20000) {
    //     detailContent.value = res.data.content
    //       ? res.data.content
    //       : res.data.title;
    //   } else {
    //     uni.showToast({
    //       title: "获取详情失败",
    //       icon: "error",
    //     });
    //   }
    // });
    getHeight();
  });
};
const changeMesList = async () => {
  mesState.activeKey = [];
  mesState.page_size = 10;
  mesState.page_index = 1;
  mesList.value = [];
  refList.value = [];
  let data = {
    userId: useAuthStore().user.id,
    page: mesState.page_index,
    size: mesState.page_size,
  };
  getMesList(data);
};
const mesListRef = ref<HTMLElement | null>(null);
const refList = ref<HTMLElement[]>([]);
const customStyle =
  "background:rgba(46, 49, 51, 0.30);border-radius: 4px;margin-bottom: 10px;border: 0;overflow: hidden;";
const setMesRef = (el: HTMLElement, index: number) => {
  refList.value[index] = el;
};
const detailContent = ref("");
const mesList = ref<any>([
  {
    id: "1",
    title: "系统通知：平台更新公告",
    content:
      "<p>尊敬的用户，我们的平台将于本周六进行系统升级，届时服务将暂停2小时。</p>",
    readed: true,
  },
  {
    id: "2",
    title: "账户安全提醒",
    content: "<p>您的账户近期有异常登录，请及时修改密码并开启双重验证。</p>",
    readed: false,
  },
  {
    id: "3",
    title: "新功能上线通知",
    content:
      "<p>我们新增了数据分析功能，现在您可以查看更详细的统计报表。</p><ul><li>数据可视化</li><li>自定义报表</li><li>导出功能</li></ul>",
    readed: false,
  },
  {
    id: "4",
    title: "活动邀请：技术分享会",
    content: "<p>诚邀您参加下周三的技术分享会，主题为'前端框架发展趋势'。</p>",
    readed: true,
  },
  {
    id: "5",
    title: "账单提醒",
    content: "<p>您本月的服务费用已生成，请在本月25日前完成支付。</p>",
    readed: false,
  },
]);
const getMesList = (data) => {
  mesState.loading = true;
  mesStore
    .addMesList(data)
    .then(() => {
      mesState.loading = false;
    })
    .catch(() => {
      uni.showToast({
        title: "获取消息失败",
        icon: "error",
      });
    });
};
const handleScroll = (e: Event) => {
  let el = e.target as HTMLElement;
  //判断是否到达div容器底部
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
    if (mesList.value.length >= mesState.total) return;
    mesState.loading = false;
    mesState.page_index++;
    let data = {
      userId: useAuthStore().user.id,
      page: mesState.page_index,
      size: mesState.page_size,
    };
    getMesList(data);
  }
};
</script>
<style scoped lang="scss">
.card {
  margin-top: 10px;
  background: white;
  border-radius: 10px;
  box-shadow:
    4px 4px 10px rgba(0, 0, 0, 0.1),
    -4px -4px 10px rgba(255, 255, 255, 0.6);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
}
.dot {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 75%;
  display: inline-block;
}
.detailContent {
  :deep(ul) {
    list-style: disc !important;
    margin-left: 20px !important;
    li {
      list-style: disc !important;
    }
  }

  :deep(ol) {
    list-style: decimal !important;
    margin-left: 20px !important;
    li {
      list-style: decimal !important;
    }
  }

  text-align: left;
  padding: 10px;
}

:deep(.van-collapse-item__title) {
  text-align: left !important;
  justify-content: flex-start !important;
}

:deep(.van-collapse-item__title-text) {
  text-align: left !important;
  width: 100%;
}

.collapse-item {
  margin-bottom: 10px;
}

:deep(.ant-select) {
  margin: 0 !important;
  .ant-select-selector {
    width: 172px;
    height: 48px !important;
    line-height: 48px;
    .ant-select-selection-item {
      display: flex;
      align-items: center;
    }
  }
}
:deep(.ant-collapse-header) {
  flex-direction: column;
  .extra {
    position: absolute;
    right: 10px;
    .downBtn {
      span {
        display: flex !important;
      }
    }
  }
  .ant-collapse-header-text {
    width: 100%;
  }
}
:deep(.ant-form-item) {
  margin: 0 !important;
}
:deep(.ant-input-wrapper) {
  input {
    height: 48px;
    border: 0;
  }
  .ant-input-group-addon {
    button {
      height: 48px;
      border: 0;
    }
  }
}
:deep(.ant-radio-wrapper),
:deep(.ant-checkbox-wrapper) {
  &:not(:first-child) {
    margin-left: 40px;
  }
  span {
    font-weight: 400;
    font-size: 14px;

    color: #ffffff;
    line-height: 24px;
    text-shadow: 1px 2px 8px rgba(0, 0, 0, 0.5);
    font-style: normal;
  }

  .ant-radio-checked {
    .ant-radio-inner {
      background-color: #90a4ff;
      &::after {
        background-color: white;
      }
    }
  }
}
.header {
  width: 100%;
  height: 4.375rem;
  padding: 0 1.25rem;
  // display: flex;
  align-items: center;
  // justify-content: space-between;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  img {
    width: 20px;
    height: 20px;
    margin-left: 3px;
  }
  h2 {
    font-weight: 600;
    font-size: 18px;
    color: #ffffff;
    line-height: 25px;
    text-align: center;
    font-style: normal;
    // position: absolute;
    // left: 50%;
    // transform: translateX(-50%);
  }
  .btn {
    width: 66px;
    height: 17px;
    font-weight: 500;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    line-height: 17px;
    text-align: left;
    font-style: normal;
  }
}
.search {
  width: 100vw;
  padding: 0 1.25rem;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-top: 10px;
}
.secCheck {
  margin-top: 20px;
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  .allRead {
    margin-left: 30px;
    font-weight: 500;
    font-size: 12px;
    color: #90a4ff;
    line-height: 17px;
    text-align: left;
    font-style: normal;
  }
}
.right {
  overflow-y: auto;
  width: 100%;
  height: 102%;
  text-align: center;
  // background-color: rgba(0, 0, 0, 1);
  padding: 25px 24px;
  .header {
    position: relative;
    display: block;
    margin-top: 20px;
    .newTip {
      position: absolute;
      width: 6px;
      height: 6px;
      background: #ff002d;
      border-radius: 75%;
    }
    .title {
      width: 100%;
      white-space: nowrap; /* 禁止换行 */
      overflow: hidden; /* 超出隐藏 */
      text-overflow: ellipsis;
      //   display: flex;
      margin-bottom: 5px;
      font-weight: 500;
      font-size: 18px;
      color: #ffffff;
      line-height: 25px;
      text-align: left;
      font-style: normal;
    }
    .time {
      font-weight: 500;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      line-height: 17px;
      text-align: left;
      font-style: normal;
    }
  }
  .extra {
    height: 47px;
    display: flex;
    align-items: center;
    .downBtn {
      width: 100px;
      height: 36px;
      border-radius: 18px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      font-weight: 500;
      font-size: 13px;
      color: #ffffff;
      line-height: 22px;
      text-align: center;
      font-style: normal;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        display: inline-block;
        height: 18px;
      }
    }
  }
}
.emptystatus {
  width: 100%;
  display: flex;
  justify-content: center;
  .emptyImg {
    width: 100%;
    height: 6.25rem;
    margin-bottom: 1rem;
  }
  .emptyText {
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
    font-style: normal;
  }
}
.bottom_text {
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}
</style>
