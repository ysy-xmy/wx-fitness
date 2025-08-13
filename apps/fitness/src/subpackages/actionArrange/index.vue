<template>
  <view class="relative flex flex-col h-screen">
    <view class="cu-bar relative search bg-white">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input
          v-model="searchValue"
          :adjust-position="false"
          type="text"
          placeholder="搜索二级类目、动作"
          confirm-type="search"
        />
        <text
          v-if="searchValue"
          class="cuIcon-close"
          style="padding: 0 10px"
          @tap="clearSearch"
        >
        </text>
      </view>
    </view>

    <view
      style="
        width: 100vw;
        height: 30px;
        margin: 5px 0;
        display: flex;
        justify-content: space-between;
        padding-right: 20px;
      "
    >
      <div
        style="
          height: 30px;
          line-height: 30px;
          margin-left: 30px;
          margin-left: 30px;
        "
      >
        正在为动作组 "{{ props.name || "" }}" 选课
      </div>
      <div
        class="cu-item"
        @click="showPopup = true"
        style="width: 80px; text-align: center; background: #9e9e9e36"
      >
        <div style="position: relative; height: 30px; line-height: 30px">
          已选动作
          <view class="cu-tag badge" style="right: -10px">{{
            chooseList.length
          }}</view>
        </div>
      </div>
    </view>

    <view class="fixed">
      <cu-custom :isBack="false" bgColor="bg-shadeTop text-white"> </cu-custom>
    </view>

    <view
      style="overflow: hidden; flex: 1; height: 0"
      class="VerticalBox bg-[#f7f8fc]"
    >
      <scroll-view
        class="mx-1 rounded-md VerticalNav nav"
        scroll-y
        scroll-with-animation
        :scroll-top="verticalNavTop"
        style="height: calc(100vh - 375upx)"
      >
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
          :data-id="index"
        >
          {{ item.name }}
        </view>
      </scroll-view>
      <scroll-view
        scroll-y
        scroll-with-animation
        style="background-color: white"
        :scroll-into-view="'main-' + mainCur"
        @scroll="VerticalMain"
      >
        <div v-if="secMenu.length > 0">
          <view
            class="padding-top"
            v-for="(item1, index1) in secMenu"
            :key="index1"
            :id="'main-' + index1"
          >
            <view
              @click="secMenuSelect(item1, index1)"
              class="cu-bar text-black font-extrabold solid-bottom bg-white"
            >
              <view
                style="font-size: 45rpx"
                class="text-2xl action truncate ..."
              >
                <text class="cuIcon-title"></text> {{ item1.name }}
              </view>
              <div class="curight-icon mr-5">
                <van-icon
                  v-show="actionrouterList[mainCur].children[index1].active"
                  name="arrow-down"
                />
                <van-icon
                  v-show="!actionrouterList[mainCur].children[index1].active"
                  name="arrow-up"
                />
              </div>
            </view>
            <view
              v-if="actionrouterList[mainCur].children[index1].active"
              class="cu-list menu-avatar flex flex-wrap bg-white pt-3"
            >
              <template
                v-for="(item2, index2) in actionrouterList[mainCur].children[
                  index1
                ].children"
                :key="index2"
              >
                <view
                  class="flex flex-wrap w-full items-center justify-between content-center px-4 mb-3"
                  style="position: relative"
                >
                  <view
                    @click="
                      toggleActive(
                        item2,
                        actionrouterList[mainCur].children[index1].children
                      )
                    "
                    class="content pb-1 flex-1"
                  >
                    <view
                      class="text-black tracking-wider font-bold text-lg opacity-100"
                    >
                      {{ item2.name }}
                    </view>
                  </view>
                  <van-checkbox
                    :value="item2.ifcheck"
                    @change="
                      (e: any) => chooseAction(e, item2, mainCur, index1)
                    "
                    checked-color="#f60422"
                    class="flex items-center ml-4"
                  />
                  <transition name="fade">
                    <div
                      v-if="item2.active"
                      class="flex flex-row w-full justify-center gap-3 flex-nowrap items-center bg-[#f4f5f5] rounded-xl p-2 shadow-lg"
                      @click="toDetail(item2)"
                    >
                      <div
                        class="w-24 h-24 overflow-hidden rounded-md flex-shrink-0"
                      >
                        <image
                          class="w-full h-full"
                          mode="aspectFill"
                          :src="getImageUrl(item2.Imgs, 0)"
                        />
                      </div>
                      <div
                        class="w-24 h-24 overflow-hidden rounded-md flex-shrink-0"
                      >
                        <image
                          class="w-full h-full"
                          mode="aspectFill"
                          :src="getImageUrl(item2.Imgs, 1)"
                        />
                      </div>
                    </div>
                  </transition>
                </view>
              </template>
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
      :index-list="indexList"
    >
      <!-- 遍历搜索结果 -->
      <view class="cu-list menu sm-border card-menu">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa' }">
          搜索结果
        </van-divider>
        <view
          v-for="(item, index) in searchResult"
          :key="index"
          class="w-screen flex flex-col items-start content-start"
        >
          <view
            @click="
              handlelocation(
                item.children.length > 0 ? item.children[0].id : item.id
              )
            "
            class="border-none padding-tb-sm w-full"
          >
            <view
              class="text-black w-full text-center flex-nowrap flex justify-between text-lg font-extrabold"
            >
              <text class="text-black"> 索引至： {{ item.name }}</text>
              <text class="cuIcon-right text-lg text-blue mr-10"></text>
            </view>
            <view
              v-if="item.children && item.children.length > 0"
              v-for="(item1, index1) in item.children"
            >
              <view class="cu-item pl-16">
                <view class="content">
                  <view>{{ item1.name }}</view>
                </view>
              </view>
            </view>
          </view>
          <div style="height: 2px; width: 90%; background-color: #f7f8fc"></div>
        </view>
      </view>
    </van-index-bar>
    <van-popup
      custom-style="max-height: 500px;"
      :show="showPopup"
      position="bottom"
      overlay="false"
      @close="onCloseopup"
    >
      <div
        style="
          margin-top: 5px;
          width: 100vw;
          display: flex;
          justify-content: flex-end;
          padding-right: 10px;
        "
      >
        <van-icon name="close" size="30px" @click="onCloseopup" />
      </div>
      <div
        style="
          width: 100%;
          text-align: center;
          padding: 0 20px;
          margin-bottom: 15px;
          font-size: 18px;
          font-weight: bold;
          color: #333;
        "
      >
        {{ props.type === "stretch" ? "放松训练" : "力量训练" }}
      </div>
      <div style="max-height: 460px; margin: 15px auto; overflow-y: auto">
        <div
          class="nodata-card flex flex-col justify-center items-center w-full"
          v-if="chooseList.length == 0"
        >
          <van-empty description="暂未选择动作" />
        </div>
        <div v-for="item in chooseList">
          <div style="width: 100%; padding: 0 15px">
            <div
              class="card"
              style="
                min-height: 70px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #ffffff;
                border-radius: 10px;
                margin-bottom: 12px;
                padding: 15px 20px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
              "
            >
              <div
                class="title"
                style="
                  font-size: 16px;
                  font-weight: 500;
                  color: #333;
                  line-height: 1.4;
                "
              >
                {{ item.name }}
              </div>
              <van-icon
                name="minus"
                size="20px"
                color="#ee0a24"
                @click="removeItem(item)"
                style="padding: 8px"
              />
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
        "
      >
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
  addActionToGroupAction,
  addGroupAction,
} from "@/api/action/action";
import { useAuthStore } from "@/state/modules/auth";
import { useRouter } from "uni-mini-router";
import { useActionsStore } from "@/state/modules/actions";
import type {
  SourceCategory,
  TargetCategory,
  ActionItem,
  ListItem,
} from "@/components/action/types";
const actionsStore = useActionsStore();
const props = ref(actionsStore.getChooseActions);
const showPopup = ref(false);
const AuthStore = useAuthStore();
const changeNum = (item: any, e: any, type: string) => {
  if (chooseList.value) {
    const selectedItem = chooseList.value.find((it: any) => it.id == item.id);
    if (selectedItem) {
      if (type == "num") Reflect.set(selectedItem, "num", e.detail);
      if (type == "second") Reflect.set(selectedItem, "second", e.detail);
      if (type == "weight") Reflect.set(selectedItem, "weight", e.detail);
    }
  }
};

const toggleActive = (item: any, Array: any) => {
  Array.map((item: any) => {
    item.active = false;
  });
  item.active = !item.active;
};

const subitClass = () => {
  //发布课程
  let temp = chooseList.value;
  // temp = temp.filter(
  //   (item: any) => (item.weight != 0 && item.num != 0) || item.second != 0
  // );
  if (temp.length == 0) {
    uni.showToast({
      title: "当前没有动作",
      icon: "error",
    });
  } else {
    const PlantId = actionsStore.getChooseActionId;
    let classes: any = [];
    chooseList.value.forEach((item: any) => {
      let temp = {
        PlanID: PlantId,
        ActionGroupTitle: props.value.name,
        ExerciseActionID: item.id,
        ActionName: item.name,
      };
      if (props.value.type == "stretch") {
        // temp["Second"] = item.second;
        temp["ContentType"] = "stretch";
      } else {
        // temp["Weight"] = item.weight;
        // temp["GroupNum"] = item.num;
        temp["ContentType"] = "weight";
      }
      temp["OrderNum"] = 0;
      temp["PlanActionDetail"] = [];
      classes.push(temp);
    });
    console.log(classes, "classes");
    addActionToGroupAction(classes)
      // addGroupAction(classes)
      .then((res) => {
        if (res.data.code == 200) {
          uni.showToast({
            title: "添加成功",
            icon: "success",
          });
          uni.$emit("reload");
          setTimeout(() => {
            router.back();
          }, 1000);
        } else {
          uni.showToast({
            title: "添加失败",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        uni.showToast({
          title: "添加失败",
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

    // 自动展开目标动作
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

  const searchNode = (node: TreeNode, isTopLevel: boolean = true) => {
    // 如果是顶层节点，则跳过搜索
    if (isTopLevel) {
      // 但仍需递归搜索子节点
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => searchNode(child, false));
      }
    } else {
      // 确保node.name存在并且是一个字符串
      if (
        typeof node.name === "string" &&
        node.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        searchResults.push(node);
      }
      // 如果有子节点，递归搜索每个子节点
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => searchNode(child, false));
      }
    }
  };

  // 对每个顶层节点调用递归搜索函数
  data.forEach((node) => searchNode(node));
  indexList.value = searchResults.map((item) => item.name);
  searchResult.value = searchResults;
  return searchResults;
};

watch(
  searchValue,
  throttle(function (newQuery: any) {
    fuzzySearch(actionrouterList.value, newQuery);
  }, 200)
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
    if (!temp.ifcheck)
      chooseList.value.push({ ...item, num: 0, second: 0, weight: 0 });
    else {
      chooseList.value = chooseList.value.filter((it) => it.id != item.id);
    }
    actionrouterList.value[mainCur].children[index1].children.find(
      (it: any) => it == item
    ).ifcheck = !temp.ifcheck;
  }
};

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

const removeItem = (item) => {
  const index = chooseList.value.indexOf(item);
  if (index > -1) {
    chooseList.value.splice(index, 1);

    // 遍历所有动作，找到对应的动作并更新其选中状态
    actionrouterList.value.forEach((firstLevel) => {
      firstLevel.children.forEach((secondLevel) => {
        if (secondLevel.children) {
          const targetAction = secondLevel.children.find(
            (action) => action.id === item.id
          );
          if (targetAction) {
            targetAction.ifcheck = false;
          }
        }
      });
    });
  }
};

const clearSearch = () => {
  searchValue.value = "";
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
</style>
