<!-- <template>
  <div class="search">
    <a-select
      ref="select"
      v-model:value="mesState.mesType"
      style="width: 172px"
      @change="changeMesList"
    >
      <a-select-option value="official">官方通知</a-select-option>
      <a-select-option value="personal">我的通知</a-select-option>
      <a-select-option value="total">所有通知</a-select-option>
    </a-select>
    <a-input-search
      v-model:value="mesState.searchVal"
      placeholder="请输入关键词"
      style="width: 146px; height: 48px"
      @search="changeMesList"
    />
  </div>
  <div class="secCheck">
    <a-checkbox v-model:checked="mesState.checked" @change="changeMesList"
      >仅显示未读</a-checkbox
    >
    <div class="allRead" @click="clickAllRead">
      <CheckOutlined
        :style="{ color: '#90a4ff' }"
        style="margin-right: 5px"
      />一键已读
    </div>
  </div>
  <div class="right" ref="mesListRef" @scroll="handleScroll">
    <a-collapse
      v-model:activeKey="mesState.activeKey"
      :bordered="false"
      expand-icon-position="end"
      v-if="true"
      accordion
      @change="showDetail"
    >
      <template #expandIcon="{ isActive }">
        <div class="extra">
          <div class="downBtn">
            展开 <span v-if="!isActive"><DownOutlined /></span
            ><span v-else><UpOutlined /></span>
          </div>
        </div>
      </template>

      <a-collapse-panel
        :key="item.id"
        :style="customStyle"
        v-for="(item, index) in mesList"
        :ref="
          (_el: ComponentPublicInstance) =>
            setMesRef(_el ? _el.$el : null, index)
        "
      >
        <template #header>
          <div class="header">
            <div class="newTip" v-if="!item.readed"></div>
            <div class="title">&nbsp;&nbsp;{{ item.title }}</div>
            <div class="time">
              {{ dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss") }}
            </div>
          </div>
        </template>
        <div v-html="detailContent" class="detailContent"></div>
      </a-collapse-panel>
      <div class="bottom_text" v-if="mesList.length >= mesState.total - 1">
        o(&gt;^ω^&lt;)o &nbsp; ～已经到底了喵～
      </div>
      <div
        class="bottom_text"
        v-else-if="mesList.length < mesState.total - 1 && mesState.loading"
      >
        <loading-outlined />
        <div>加载中...</div>
      </div>
    </a-collapse>
    <div v-else class="emptystatus">
      <img src="@/assets/img/table-empty.png" alt="" class="emptyImg" />
      <div class="emptyText">暂无信息</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  getNotifyDeatil,
  getNotifyList,
  readNotify,
} from "@/subpackages/apis/notify/index";
import dayjs from "dayjs";
import router from "@/router";
import {
  QuestionCircleOutlined,
  ExclamationCircleFilled,
  SettingOutlined,
  DownOutlined,
  UpOutlined,
  LoadingOutlined,
  CheckOutlined,
} from "@ant-design/icons-vue";
import {
  nextTick,
  onMounted,
  reactive,
  ref,
  type ComponentPublicInstance,
} from "vue";
// import { message } from "ant-design-vue";
import { useNotifyStore } from "@/stores/notifyMes";
const mesState = reactive<{
  mesType: "official" | "persional" | "total";
  checked: boolean;
  searchVal: string;
  activeKey: string[];
  page_size: number;
  page_index: number;
  total: number;
  loading: boolean;
}>({
  mesType: "total",
  checked: false,
  searchVal: "",
  activeKey: [] as string[],
  page_size: 10,
  page_index: 1,
  total: 0,
  loading: true,
});
onMounted(() => {
  getMesList();
  mesListRefHeight.value = mesListRef.value?.offsetHeight
    ? mesListRef.value?.offsetHeight
    : 0;
});
const mesListRefHeight = ref(0);
const clickAllRead = async () => {
  if (useNotifyStore().hadNew == 0) message.warning("没有新消息");
  else {
    const res = await readNotify(-1);
    if (res.code == 20000) {
      useNotifyStore().setClear(true);
      useNotifyStore().sethadNew(0);

      mesList.value.forEach((item) => {
        item.readed = true;
      });
    } else {
      message.error("全部已读失败");
    }
  }
};
const showDetail = (e: string) => {
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
          useNotifyStore().sethadNew(false);
        }
      });
    getNotifyDeatil(mesList.value[index].id).then((res) => {
      if (res.code == 20000) {
        detailContent.value = res.data.content
          ? res.data.content
          : res.data.title;
      } else {
        message.error("获取详情失败");
      }
    });
    getHeight();
  });
  // console.log('id', mesList.value[index].id);

  // }, 0);
};
const changeMesList = async () => {
  mesState.activeKey = [];
  mesState.page_size = 10;
  mesState.page_index = 1;
  mesList.value = [];
  refList.value = [];
  getMesList();
};
const mesListRef = ref<HTMLElement | null>(null);
const refList = ref<HTMLElement[]>([]);
const customStyle =
  "background:rgba(46, 49, 51, 0.30);border-radius: 4px;margin-bottom: 10px;border: 0;overflow: hidden;";
const setMesRef = (el: HTMLElement, index: number) => {
  refList.value[index] = el;
};
const detailContent = ref("");
const mesList = ref<any[]>([]);
const getMesList = () => {
  mesState.loading = true;
  getNotifyList(
    mesState.page_index,
    mesState.page_size,
    mesState.mesType === "total" ? undefined : mesState.mesType,
    mesState.checked ? 2 : undefined,
    mesState.searchVal
  ).then((res) => {
    mesState.total = res.data.total;
    if (res.data.list) {
      res.data.list.forEach((item: any) => {
        mesList.value.push(item);
      });
      mesState.page_index++;
    }

    mesState.loading = false;
  });
};
const handleScroll = (e: Event) => {
  let el = e.target as HTMLElement;
  //判断是否到达div容器底部
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
    if (mesList.value.length >= mesState.total) return;
    mesState.loading = false;
    getMesList();
  }
};
</script>
<style scoped lang="less">
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
  width: 100%;
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
  background-color: rgba(0, 0, 0, 1);
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
    color: rgba(255, 255, 255, 0.5);
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
</style> -->
<template>123</template>
<script setup></script>
