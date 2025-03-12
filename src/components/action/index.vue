<template>
  <view class="relative flex flex-col h-full">
    <view class="cu-bar relative search bg-white">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input
          v-model="searchValue"
          :adjust-position="false"
          type="text"
          placeholder="搜索二级类目、动作"
          confirm-type="search" />
        <text 
          v-if="searchValue"
          class="cuIcon-close"
          style="padding: 0 10px;"
          @tap="clearSearch">
        </text>
      </view>
    </view>

    <view
      v-if="props.ifChoose"
      style="
        width: 100vw;
        height: 30px;
        margin: 5px 0;
        display: flex;
        justify-content: space-between;
        padding-right: 20px;
      ">
      <div
        style="
          height: 30px;
          line-height: 30px;
          margin-left: 30px;
          margin-left: 30px;
        ">
        正在为{{ props.name }}的课程选课
      </div>
      <view class="cu-item" @click="showPopup = true">
        <div
          class="cuIcon-apps"
          style="
            position: relative;
            width: 30px;
            font-size: 30px;
            height: 30px;
          ">
          <view class="cu-tag badge">{{ chooseList.length }}</view>
        </div>
      </view>
    </view>

    <view class="fixed">
      <cu-custom :isBack="false" bgColor="bg-shadeTop text-white"> </cu-custom>
    </view>

    <view
      style="overflow: hidden; flex: 1; height: 0"
      class="VerticalBox bg-[#f7f8fc]">
      <scroll-view
        class="mx-1 rounded-md VerticalNav nav"
        scroll-y
        scroll-with-animation
        :scroll-top="verticalNavTop"
        style="height: calc(100vh - 375upx)">
        <view
          class="cu-item truncate"
          :style="{
            backgroundColor: index == tabCur ? '#5adade' : '#f7f8fc',
            color: index == tabCur ? '#ffffff' : '',
            fontWeight: index == tabCur ? 'bold' : '',
            borderRadius: index == tabCur ? '5px' : '',
          }"
          v-for="(item, index) in actionrouterList"
          :key="index"
          @tap="TabSelect"
          :data-id="index">
          {{ item.name }}
        </view>
      </scroll-view>
      <scroll-view
        scroll-y
        scroll-with-animation
        style="background-color: white"
        :scroll-into-view="'main-' + mainCur"
        @scroll="VerticalMain">
        <div v-if="secMenu.length > 0">
          <view
            class="padding-top"
            v-for="(item1, index1) in secMenu"
            :key="index1"
            :id="'main-' + index1">
            <view
              @click="secMenuSelect(item1, index1)"
              class="cu-bar text-black font-extrabold solid-bottom bg-white">
              <view
                style="font-size: 45rpx"
                class="text-2xl action truncate ...">
                <text class="cuIcon-title"></text> {{ item1.name }}
              </view>
              <div class="curight-icon mr-5">
                <van-icon
                  v-show="actionrouterList[mainCur].children[index1].active"
                  name="arrow-down" />
                <van-icon
                  v-show="!actionrouterList[mainCur].children[index1].active"
                  name="arrow-up" />
              </div>
            </view>
            <view
              v-if="actionrouterList[mainCur].children[index1].active"
              class="cu-list menu-avatar flex flex-wrap bg-white pt-3">
              <template
                v-for="(item2, index2) in actionrouterList[mainCur].children[
                  index1
                ].children"
                :key="index2">
                <view
                  class="felx flex-wrap w-full items-center justify-center content-center px-2 mb-3"
                  style="position: relative">
                  <van-checkbox
                    v-if="ifChoose"
                    :value="item2.ifcheck"
                    @change="
                      (e: any) => chooseAction(e, item2, mainCur, index1)
                    "
                    checked-color="#f60422"
                    style="
                      position: absolute;
                      right: 1px;
                      top: 1px;
                      z-index: 5;
                    " />
                  <view
                    @click="
                      toggleActive(
                        item2,
                        actionrouterList[mainCur].children[index1].children
                      )
                    "
                    class="content pb-1 w-full">
                    <view
                      class="text-black tracking-wider pr-2 font-bold text-right text-lg opacity-100"
                      >{{ item2.name }}
                    </view>
                  </view>
                  <transition name="fade">
                    <div
                      v-if="item2.active"
                      class="flex flex-row w-full justify-center gap-3 flex-nowrap items-center bg-[#f4f5f5] rounded-xl p-2 shadow-lg"
                      @click="toDetail(item2)">
                      <div
                        class="w-24 h-24 overflow-hidden rounded-md flex-shrink-0">
                        <image
                          class="w-full h-full"
                          mode="aspectFill"
                          :src="getImageUrl(item2.Imgs, 0)" />
                      </div>
                      <div
                        class="w-24 h-24 overflow-hidden rounded-md flex-shrink-0">
                        <image
                          class="w-full h-full"
                          mode="aspectFill"
                          :src="getImageUrl(item2.Imgs, 1)" />
                      </div>
                    </div>
                  </transition>
                </view>
              </template>
              <div
                v-if="
                  actionrouterList[mainCur].children[index1].children.length ==
                  0
                "
                class="w-full flex justify-center">
                <text class="text-gray-500">该目录暂无具体动作</text>
              </div>
            </view>
          </view>
        </div>
        <div v-else>
          <div class="w-full flex justify-center">
            <van-empty class="text-white" description="没有数据" />
          </div>
        </div>
      </scroll-view>
    </view>

    <van-index-bar
      v-if="searchResult.length > 0"
      class="w-screen fixed z-1000 top-10 bg-[#f2f2f2] shadow-sm"
      :index-list="indexList">
      <scroll-view
        scroll-y
        style="height: 90vh"
        class="cu-list menu sm-border">
        <view
          v-for="(item, index) in searchResult"
          :key="index"
          class="mx-4 my-2">
          <view
            @click="handlelocation(item.isAction ? item.id : (item.children && item.children.length > 0 ? item.children[0].id : item.id))"
            :class="{
              'search-card': true,
              'first-level': item.isFirstLevel,
              'second-level': item.isSecondLevel,
              'action-level': item.isAction
            }">
            <!-- 图标区域 -->
            <view class="card-icon">
              <text
                v-if="item.isFirstLevel"
                class="cuIcon-folder text-2xl">
              </text>
              <text
                v-else-if="item.isSecondLevel"
                class="cuIcon-file text-2xl">
              </text>
              <text
                v-else
                class="cuIcon-roundright text-2xl">
              </text>
            </view>

            <!-- 内容区域 -->
            <view class="card-content">
              <!-- 类型标签 -->
              <view class="type-tag" :class="{
                'first-tag': item.isFirstLevel,
                'second-tag': item.isSecondLevel,
                'action-tag': item.isAction
              }">
                {{ item.isFirstLevel ? '一级目录' : item.isSecondLevel ? '二级目录' : '动作' }}
              </view>

              <!-- 标题 -->
              <view class="card-title">
                {{ item.name }}
              </view>

              <!-- 路径信息 -->
              <view v-if="!item.isFirstLevel" class="card-path">
                <text class="path-icon cuIcon-right"></text>
                {{ item.isAction 
                  ? `${item.firstCategory} > ${item.secondCategory}` 
                  : item.firstCategory }}
              </view>
            </view>

            <!-- 右侧箭头 -->
            <view class="card-arrow">
              <text class="cuIcon-right"></text>
            </view>
          </view>
        </view>
      </scroll-view>
    </van-index-bar>
    <van-popup
      custom-style="max-height: 500px;"
      :show="showPopup"
      position="bottom"
      overlay="false"
      @close="onCloseopup">
      <div
        style="
          margin-top: 5px;
          width: 100vw;
          display: flex;
          justify-content: flex-end;
          padding-right: 10px;
        ">
        <van-icon name="close" size="30px" @click="onCloseopup" />
      </div>
      <div style="max-height: 460px; margin: 15px auto; overflow-y: auto">
        <div
          class="nodata-card flex flex-col justify-center items-center w-full"
          v-if="chooseList.length == 0">
          <van-empty description="暂未选择动作" />
        </div>
        <div v-for="item in chooseList">
          <div style="width: 100vw; padding: 0 20px">
            <div
              class="card"
              style="
                height: 50px;
                line-height: 50px;
                display: flex;
                justify-content: space-between;
                padding: 0 20px;
                align-items: center;
                background-color: rgba(255, 255, 255, 0.4);
                border-bottom: 1px solid gray;
                border-radius: 5px;
              ">
              <div class="title">{{ item.name }}</div>
              <van-stepper
                :value="item.num"
                integer
                min="0"
                step="1"
                @change="(e) => changeNum(item, e)" />
            </div>
          </div>
        </div>
      </div>
      <div
        style="
          margin-top: 5px;
          width: 100vw;
          display: flex;
          justify-content: flex-end;
          padding-right: 30px;
        ">
        <van-button type="info" size="normal" round @click="subitClass"
          >提交</van-button
        >
      </div>
    </van-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch, defineProps, reactive } from "vue";
import {
  getFirstmenulist,
  getSecByFirst,
  getActionAll,
  getActionsBySec,
} from "@/api/action/action";
import { useAuthStore } from "@/state/modules/auth";
import { postPlan } from "@/api/course/index";
import { useRouter } from "uni-mini-router";
import type {
  SourceCategory,
  TargetCategory,
  ActionItem,
  ListItem,
} from "@/components/action/types";
import dayjs from "dayjs";

const props = defineProps<{
  stuid?: number;
  courid?: number;
  type?: string;
  ifChoose?: boolean;
  name?: string;
}>();

const showPopup = ref(false);
const AuthStore = useAuthStore();

const router = useRouter();
const firstmenu = ref<ListItem[]>([
  { name: "A", id: 0, OrderNum: 1, children: [] },
]);
const indexList = ref();
const searchValue = ref("");
const searchResult = ref<ListItem[]>([]);

//排序
firstmenu.value = sortByOrderNumDescending(firstmenu.value);

//定义总目录
const actionrouterList = ref<ListItem[]>([]);

//定义二级类目menu
const secMenu = ref<ListItem[]>([]);

//排序后的数据
const tabCur = ref(0);
const mainCur = ref(0);
const verticalNavTop = ref(0);

type TreeNode = {
  name: string;
  id: number;
  OrderNum: number;
  children: TreeNode[];
};

const changeNum = (item: any, e: any) => {
  if (chooseList.value) {
    const selectedItem = chooseList.value.find((it: any) => it.id == item.id);
    if (selectedItem) {
      Reflect.set(selectedItem, "num", e.detail);
    }
  }
};

const toggleActive = (item: any, Array: any) => {
  Array.forEach((action: any) => {
    if (action !== item) {
      action.active = false;
    }
  });
  item.active = !item.active;
};

const subitClass = () => {
  //发布课程
  let temp = chooseList.value;
  temp = temp.filter((item: any) => item.num != 0);
  if (temp.length == 0) {
    uni.showToast({
      title: "当前没有动作",
      icon: "error",
    });
  } else {
    let classes: any = [];
    chooseList.value.forEach((item: any) => {
      classes.push({
        ExerciseActionID: item.id,
        ActionName: item.name,
        GroupNum: item.num,
      });
    });
    let data = {
      UserID: Number(props.stuid),
      UserCourseID: Number(AuthStore.getClass),
      Type: props.type,
      PlanTime: dayjs(getCurrentDateTime()).format("YYYY-MM-DD"),
      Actions: classes,
    };
    postPlan(data)
      .then((res) => {
        uni.showToast({
          title: "添加成功！",
        });
        uni.$emit("getNew", true);
        router.back();
      })
      .catch((err) => {
        uni.showToast({
          title: "添加失败！",
          icon: "error",
        });
      });
  }
};

function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 月份是从0开始的
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const getImageUrl = (images: any[], index: number) => {
  const defaultUrl =
    "https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20241007/1728284282969.png";
  return images && images[index] ? images[index].URL : defaultUrl;
};

const onCloseopup = () => {
  showPopup.value = false;
};

// 递归搜索函数
function findItemAndChildren(items: TreeNode[], id: number | string) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      // 如果找到匹配的项，返回该项及其子项
      return items[i];
    }
    // 如果当前项有子项，则递归搜索
    if (items[i].children && items[i].children.length > 0) {
      const result: any = findItemAndChildren(items[i].children, id);
      if (result) {
        return result; // 如果在子项中找到匹配项，返回结果
      }
    }
  }
  return null; // 如果没有找到，返回null
}

// 查找id的索引
function findIndexById(data: TreeNode[], id: number | string) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return i; // 找到id，返回索引
    }
    // 如果当前项有子项，递归地在子项中查找
    if (data[i].children && data[i].children.length > 0) {
      const childIndex: number = findIndexById(data[i].children, id);
      if (childIndex !== -1) {
        return childIndex; // 在子项中找到id，返回索引
      }
    }
  }
  return -1; // 未找到id，返回-1
}

// 节流函数
function throttle(func: any, limit: any) {
  let inThrottle = false;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
//接口数据转换
function transformCategories(source: SourceCategory[]): TargetCategory[] {
  const target: TargetCategory[] = [];

  source.forEach((item) => {
    const firstCategory = item.FirstCategory;
    const targetItem: TargetCategory = {
      name: firstCategory.Name,
      id: firstCategory.ID,
      OrderNum: firstCategory.OrderNum,
      children: [],
    };

    if (item.SecondCategoryInfos) {
      item.SecondCategoryInfos.forEach((secondCatInfo) => {
        const secondCategory = secondCatInfo.SecondCategory;
        const targetSecondCat: TargetCategory = {
          name: secondCategory.Name,
          id: secondCategory.ID,
          OrderNum: secondCategory.OrderNum,
          children: [],
        };
        if (secondCatInfo.ActionInfos) {
          secondCatInfo.ActionInfos.forEach((actionInfo) => {
            const actionItem: ActionItem = {
              CreatedAt: actionInfo.ActionInfos.CreatedAt,
              Description: actionInfo.ActionInfos.Description,
              id: actionInfo.ActionInfos.ID,
              name: actionInfo.ActionInfos.Name,
              OrderNum: actionInfo.ActionInfos.OrderNum,
              SecondCategoryID: actionInfo.ActionInfos.SecondCategoryID,
            };
            targetSecondCat.children.push(actionItem);
          });
          // secondCatInfo.ActionInfos.ActionInfos.forEach(actionInfo => {
          //     const actionItem: ActionItem = {
          //         CreatedAt: actionInfo.CreatedAt,
          //         Description: actionInfo.Description,
          //         ID: actionInfo.ID,
          //         Name: actionInfo.Name,
          //         OrderNum: actionInfo.OrderNum,
          //         SecondCategoryID: actionInfo.SecondCategoryID,
          //     };
          //     targetSecondCat.children.push(actionItem);
          // });
        }

        targetItem.children.push(targetSecondCat);
      });
    }

    target.push(targetItem);
  });

  return target;
}

function findCategoryIds(menuItems: TreeNode[], actionId: number) {
  for (let i = 0; i < menuItems.length; i++) {
    const firstCategory = menuItems[i];
    if (firstCategory.children && firstCategory.children.length > 0) {
      for (let j = 0; j < firstCategory.children.length; j++) {
        const secondCategory = firstCategory.children[j];
        if (secondCategory.children && secondCategory.children.length > 0) {
          for (let k = 0; k < secondCategory.children.length; k++) {
            const action = secondCategory.children[k];
            if (action.id === actionId) {
              return {
                firstCategoryId: firstCategory.id,
                secondCategoryId: secondCategory.id,
              };
            }
          }
        }
      }
    }
  }
  return { firstCategoryId: null, secondCategoryId: null };
}
//总目录排序函数
function sortByOrderNumDescending(routers: ListItem[]) {
  const sortByOrderIdAndIdDesc = (a: ListItem, b: ListItem): number => {
    if (a.OrderNum !== b.OrderNum) {
      return b.OrderNum - a.OrderNum;
    }
    // 如果orderid相同，则比较id
    return b.id - a.id;
  };

  // 递归排序每个路由及其子项
  const sortChildren = (items: ListItem[]): ListItem[] => {
    if (!items) return [];
    return items
      .map((item) => ({
        ...item,
        ifcheck: chooseList.value.find((it) => it.id == item.id) ? true : false,
        children: sortChildren(item.children), // 递归排序子项
      }))
      .sort(sortByOrderIdAndIdDesc);
  };

  // 对顶级路由进行排序，并对每个路由的子项进行排序
  return routers
    .map((router) => ({
      ...router,
      children: sortChildren(router.children), // 对每个路由的子项进行排序
    }))
    .sort(sortByOrderIdAndIdDesc);
}

const toDetail = (item: ActionItem) => {
  if (!props.ifChoose)
    router.push({
      name: "actionDetail",
      params: {
        itemid: String(item.id),
      },
    });
};

//处理搜索点击事件
const handlelocation = (actionid: number) => {
  const { firstCategoryId, secondCategoryId } = findCategoryIds(
    actionrouterList.value,
    actionid
  );

  // 找到一级类目索引
  const firstIndex = actionrouterList.value.findIndex(
    (item) => item.id === firstCategoryId
  );

  // 找到二级类目在其父级中的索引
  const secondIndex = actionrouterList.value[firstIndex].children.findIndex(
    (item) => item.id === secondCategoryId
  );

  if (firstIndex !== -1 && secondIndex !== -1) {
    tabCur.value = firstIndex;
    mainCur.value = firstIndex;
    verticalNavTop.value = (firstIndex - 1) * 50;

    // 展开对应的二级菜单
    actionrouterList.value[firstIndex].children.forEach(
      (child) => (child.active = false)
    );
    const targetSecondCategory =
      actionrouterList.value[firstIndex].children[secondIndex];
    targetSecondCategory.active = true;

    // 更新二级菜单显示
    toSecmenu(actionrouterList.value[firstIndex]);

    // 添加滚动定位
    nextTick(() => {
      const selector = `#main-${secondIndex}`;
      const query = uni.createSelectorQuery().in(this);
      query.select(selector).boundingClientRect();
      query.exec((res) => {
        if (res[0]) {
          uni.pageScrollTo({
            scrollTop: res[0].top,
            duration: 300,
          });
        }
      });
    });

    // 自动展开目标动作（新增部分）
    nextTick(() => {
      const actionIndex = targetSecondCategory.children.findIndex(
        (action: any) => action.id === actionid
      );
      if (actionIndex !== -1) {
        toggleActive(
          targetSecondCategory.children[actionIndex],
          targetSecondCategory.children
        );
      }
    });
  }

  searchValue.value = "";
  fuzzySearch(actionrouterList.value, searchValue.value);
};

//处理二级目录被选中事件
//需要传入二级及其子项
const secMenuSelect = (item: ListItem, index: number) => {
  actionrouterList.value[mainCur.value].children[index].active =
    !actionrouterList.value[mainCur.value].children[index].active;
  if (actionrouterList.value[mainCur.value].children[index].children[0].Imgs)
    return;

  getActionsBySec(String(item.id)).then((res) => {
    //更新对应的二级目录
    actionrouterList.value[mainCur.value].children[index].children =
      res.data.data.map((item) => {
        return {
          id: item.ID,
          name: item.Name,
          OrderNum: item.OrderNum,
          children: [],
          Imgs: item.Imgs,
          Videos: item.Videos,
          Description: item.Description,
          CreatedAt: item.CreatedAt,
        };
      });
    actionrouterList.value = sortByOrderNumDescending(actionrouterList.value);
  });
};

//定义搜索方法：
const fuzzySearch = (data: TreeNode[], searchQuery: string): TreeNode[] => {
  if (!searchQuery) {
    searchResult.value = [];
    return [];
  }
  const searchResults: TreeNode[] = [];

  const searchNode = (node: TreeNode, parentPath: { first?: string, second?: string } = {}) => {
    // 如果当前节点名称匹配搜索条件
    if (typeof node.name === "string" && 
        node.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      // 添加层级信息到节点
      const resultNode = { 
        ...node,
        firstCategory: parentPath.first || node.name,
        secondCategory: parentPath.second,
        isFirstLevel: !parentPath.first,
        isSecondLevel: !!parentPath.first && !parentPath.second,
        isAction: !!parentPath.first && !!parentPath.second
      };
      searchResults.push(resultNode);
    }

    // 递归搜索子节点
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        if (!parentPath.first) {
          // 当前是一级目录
          searchNode(child, { first: node.name });
        } else if (!parentPath.second) {
          // 当前是二级目录
          searchNode(child, { first: parentPath.first, second: node.name });
        } else {
          // 当前是动作
          searchNode(child, parentPath);
        }
      });
    }
  };

  // 对每个顶层节点调用递归搜索函数
  data.forEach((node) => searchNode(node));

  // 分类排序：一级目录 -> 二级目录 -> 动作
  searchResults.sort((a, b) => {
    if (a.isFirstLevel && !b.isFirstLevel) return -1;
    if (!a.isFirstLevel && b.isFirstLevel) return 1;
    if (a.isSecondLevel && !b.isSecondLevel) return -1;
    if (!a.isSecondLevel && b.isSecondLevel) return 1;
    return 0;
  });

  indexList.value = searchResults.map((item) => item.name);
  searchResult.value = searchResults;
  return searchResults;
};

watch(
  searchValue,
  throttle(function (newQuery: any) {
    fuzzySearch(actionrouterList.value, newQuery);
  }, 50)
);

const state = reactive({
  stuId: -1,
  courseId: -1,
  type: "",
});

onMounted(async () => {
  try {
    uni.showLoading({ title: "加载中...", mask: true });

    // 获取全部完整的信息
    const actionAllResponse = await getActionAll();
    const transformedData = transformCategories(actionAllResponse.data.data);
    actionrouterList.value = sortByOrderNumDescending(transformedData);

    // 自动选择第一个一级目录
    if (actionrouterList.value.length > 0) {
      tabCur.value = 0;
      mainCur.value = 0;
      verticalNavTop.value = 0;

      // 获取并设置第一个一级目录的二级目录
      const firstItem = actionrouterList.value[0];
      await getSelection(firstItem);
    }

    uni.hideLoading();
  } catch (error) {
    uni.hideLoading();
    uni.showToast({ title: "加载失败", icon: "error" });
    console.error("初始化数据失败:", error);
  }
});

// 修改 getSelection 函数，返回 Promise
const getSelection = async (item: ListItem) => {
  const firstmenuid = item.id;
  if (item.children.length > 0) {
    toSecmenu(item);
    return;
  }

  try {
    uni.showLoading({
      title: "加载中...",
      mask: true,
    });

    const res = await getSecByFirst(firstmenuid);
    if (res.data.data.length > 0) {
      actionrouterList.value.find((item) => item.id === firstmenuid)!.children =
        res.data.data.map((item) => ({
          id: item.ID,
          name: item.Name,
          OrderNum: item.OrderNum,
          children: [],
          active: false,
        }));
    }

    toSecmenu(item);
    actionrouterList.value = sortByOrderNumDescending(actionrouterList.value);
  } finally {
    uni.hideLoading();
  }
};

const chooseList = ref([]); //被选中课程的列表

const chooseAction = (
  e: any,
  item: { id: any },
  mainCur: string | number,
  index1: string | number
) => {
  const temp = actionrouterList.value[mainCur].children[index1].children.find(
    (it: any) => it == item
  );
  if (temp) {
    if (!temp.ifcheck) chooseList.value.push({ ...item, num: 0 });
    else {
      chooseList.value = chooseList.value.filter((it) => it.id != item.id);
    }
    actionrouterList.value[mainCur].children[index1].children.find(
      (it: any) => it == item
    ).ifcheck = !temp.ifcheck;
  }
};

//更新对应的二级目录secMenu，需要传入一级目录
const toSecmenu = (item: ListItem) => {
  let list: any[] = [];
  if (item.children) {
    if (item.children.length > 0) {
      item.children.forEach((element) => {
        let data = {
          name: element.name,
          id: element.id,
          OrderNum: element.OrderNum,
          children: [],
        };
        list.push(data);
      });
      secMenu.value = sortByOrderNumDescending(list);
    } else {
      list = [];
      secMenu.value = list;
    }
  }
};

const TabSelect = async (e: any) => {
  const id = e.currentTarget.dataset.id;
  tabCur.value = id;
  mainCur.value = id;
  verticalNavTop.value = (id - 1) * 50;
  getSelection(actionrouterList.value[id]);
};

const VerticalMain = (e: any) => {
  // #ifdef MP-ALIPAY
  return false; // 支付宝小程序暂时不支持双向联动
  // #endif
};

// 动态导入 PlanCard 组件
const PlanCard = () => import("@/components/plan-card/index.vue");

function findCategoryName(actionId: number): string {
  for (const firstCategory of actionrouterList.value) {
    for (const secondCategory of firstCategory.children) {
      for (const action of secondCategory.children) {
        if (action.id === actionId) {
          return secondCategory.name;
        }
      }
    }
  }
  return "";
}

const clearSearch = () => {
  searchValue.value = '';
  searchResult.value = [];
};
</script>

<style>
.fixed {
  position: fixed;
  z-index: 99;
}

.VerticalNav.nav {
  width: 200upx;
  white-space: initial;
}

.VerticalNav.nav .cu-item {
  width: 100%;
  text-align: center;
  background-color: #fff;
  margin: 0;
  border: none;
  height: 50px;
  position: relative;
}

.VerticalNav.nav .cu-item.cur {
  background-color: #f1f1f1;
}

.VerticalNav.nav .cu-item.cur::after {
  content: "";
  width: 8upx;
  height: 30upx;
  border-radius: 10upx 0 0 10upx;
  position: absolute;
  background-color: currentColor;
  top: 0;
  right: 0upx;
  bottom: 0;
  margin: auto;
}

.VerticalBox {
  display: flex;
}

.VerticalMain {
  background-color: #f1f1f1;
  flex: 1;
}

.cuIcon-title::before {
  color: white;
  display: none;
}

.fade-enter-from {
  opacity: 0;
}

/* 进入过渡的结束状态 */
.fade-enter-to {
  opacity: 1;
}

/* 离开过渡的开始状态 */
.fade-leave-from {
  opacity: 1;
}

/* 离开过渡的结束状态 */
.fade-leave-to {
  opacity: 0;
}

/* 定义进入和离开过渡的时间曲线 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.search-result-item {
  font-size: 20px;
  margin: 10px 0; /* 减少上下间距 */
  color: #444;
  font-weight: bold;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  background-color: #f9f9f9; /* 统一背景颜色 */
}

.search-result-item:hover {
  background-color: #e0e0e0; /* 悬停时背景色 */
}

.directory-item {
  background-color: #e3f2fd; /* 更柔和的背景色 */
  border-left: 4px solid #0288d1; /* 调整边框宽度和颜色 */
  padding: 12px; /* 减少内边距 */
  font-size: 20px; /* 调整字体大小 */
  color: #0288d1;
  border-radius: 6px;
  margin-bottom: 8px; /* 减少下间距 */
  transition: transform 0.3s ease;
}

.directory-item:hover {
  transform: scale(1.01); /* 轻微放大 */
}

.action-item {
  background-color: #fff8e1; /* 更柔和的背景色 */
  border-left: 4px solid #f57c00;
  padding: 12px;
  font-size: 20px;
  color: #f57c00;
  border-radius: 6px;
  margin-bottom: 8px;
  transition: transform 0.3s ease;
}

.action-item:hover {
  transform: scale(1.01);
}

.directory-item-first {
  background-color: #e8f5e9;
  border-left: 4px solid #2e7d32;
  padding: 12px;
  font-size: 20px;
  color: #2e7d32;
  border-radius: 6px;
  margin-bottom: 8px;
  transition: transform 0.3s ease;
}

.directory-item-first:hover {
  transform: scale(1.01);
}

/* 搜索结果卡片基础样式 */
.search-card {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.search-card:active {
  transform: scale(0.98);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
}

/* 不同层级的卡片样式 */
.first-level {
  border-left: 6px solid #2196F3;
}

.second-level {
  border-left: 6px solid #FF9800;
}

.action-level {
  border-left: 6px solid #4CAF50;
}

/* 图标区域 */
.card-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-right: 16px;
}

.first-level .card-icon {
  color: #2196F3;
  background: rgba(33, 150, 243, 0.1);
}

.second-level .card-icon {
  color: #FF9800;
  background: rgba(255, 152, 0, 0.1);
}

.action-level .card-icon {
  color: #4CAF50;
  background: rgba(76, 175, 80, 0.1);
}

/* 内容区域 */
.card-content {
  flex: 1;
}

/* 类型标签 */
.type-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 4px;
}

.first-tag {
  background: rgba(33, 150, 243, 0.1);
  color: #2196F3;
}

.second-tag {
  background: rgba(255, 152, 0, 0.1);
  color: #FF9800;
}

.action-tag {
  background: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
}

/* 标题 */
.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 4px 0;
}

/* 路径信息 */
.card-path {
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
}

.path-icon {
  font-size: 12px;
  margin-right: 4px;
}

/* 右侧箭头 */
.card-arrow {
  color: #999;
  font-size: 20px;
  margin-left: 12px;
}

.search-form {
  position: relative;
  display: flex;
  align-items: center;
}

.cuIcon-close {
  color: #999;
  font-size: 32rpx;
  padding: 0 20rpx;
  cursor: pointer;
}

.cuIcon-close:active {
  opacity: 0.7;
}
</style>
