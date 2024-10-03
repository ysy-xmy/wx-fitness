<template>
    <view class="relative">
        <view class="cu-bar relative search bg-white">
            <view class="search-form round">
                <text class="cuIcon-search"></text>
                <input v-model="searchValue" :adjust-position="false" type="text" placeholder="搜索二级类目、动作"
                    confirm-type="search" />
            </view>


        </view>

        <view class="fixed">
            <cu-custom :isBack="false" bgColor="bg-shadeTop text-white">

            </cu-custom>
        </view>

        <view class="VerticalBox  bg-white ">
            <scroll-view class="bg-[#f7f8fc] rounded-md VerticalNav nav" scroll-y scroll-with-animation
                :scroll-top="verticalNavTop" style="height:calc(100vh - 375upx)">
                <view style="background-color: #f7f8fc;" class="cu-item bg-[#f7f8fc] truncate ..."
                    :class="index == tabCur ? 'text-[#ec6853] cur' : ''" v-for="(item, index) in actionrouterList"
                    :key="index" @tap="TabSelect" :data-id="index">
                    {{ item.name }}
                </view>
            </scroll-view>
            <scroll-view scroll-y scroll-with-animation style="height:calc(100vh - 375upx);background-color: white;"
                :scroll-into-view="'main-' + mainCur" @scroll="VerticalMain">
                <div v-if="secMenu.length > 0">
                    <view class="padding-top " v-for="(item1, index1) in secMenu" :key="index1" :id="'main-' + index1">
                        <view @click="secMenuSelect(item1, index1)"
                            class="cu-bar text-black  font-extrabold solid-bottom bg-white">
                            <view style="font-size: 45rpx;" class="text-2xl action truncate ...">
                                <text class="cuIcon-title "></text> {{ item1.name }}
                            </view>
                            <div class="curight-icon mr-5">
                                <van-icon v-show="actionrouterList[mainCur].children[index1].active"
                                    name="arrow-down" />
                                <van-icon v-show="!actionrouterList[mainCur].children[index1].active" name="arrow-up" />
                            </div>
                        </view>
                        <view v-if="actionrouterList[mainCur].children[index1].active"
                            class="cu-list  pt-3  menu-avatar flex flex-wrap bg-white ">
                            <template v-for="(item2, index2) in actionrouterList[mainCur].children[index1].children"
                                :key="index2">
                                <view class=" felx flex-col w-1/2  p-2 px-3  h-36  bg-[#f9fafb]">
                                    <img class="w-full h-24 rounded-md  lg"
                                        :src="item2.Imgs ? item2.Imgs[0].Url : 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'" />
                                    <view class="content">
                                        <view class="text-black text-center text-lg font-extrabold">{{ item2.name }}
                                        </view>
                                    </view>
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

        <van-index-bar v-if="searchResult.length > 0" class=" w-screen absolute  z-1000 top-10 bg-[#f2f2f2] shadow-sm"
            :index-list="indexList">
            <!-- 遍历搜索结果 -->
            <view class="cu-list menu  sm-border card-menu ">
                <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa' }">
                    搜索结果
                </van-divider>
                <view v-for="(item, index) in searchResult" :key="index"
                    class=" w-screen flex flex-col items-start content-start">
                    <view @click="handlelocation(item.children.length > 0 ? item.children[0].id : item.id)"
                        class=" border-none  padding-tb-sm w-full">
                        <view
                            class="text-black w-full text-center flex-nowrap flex justify-between text-lg font-extrabold">

                            <text class="text-black "> 动作： {{ item.name }}</text>
                            <text class="cuIcon-right text-lg text-blue mr-10"></text>
                        </view>
                        <view v-if="item.children && item.children.length > 0" v-for="(item1, index1) in item.children">
                            <view class="cu-item pl-16">
                                <view class="content">
                                    <view>{{ item1.name }}</view>
                                </view>
                            </view>
                        </view>

                    </view>
                    <div style="height: 2px;width: 90%;background-color: #f7f8fc;"></div>


                </view>
            </view>
        </van-index-bar>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { getFirstmenulist, getSecByFirst, getActionAll, getActionsBySec } from '@/api/action/action';
//@ts-ignore
import type { SourceCategory, TargetCategory, ActionItem, ListItem } from './types.ts'
const firstmenu = ref<ListItem[]>([
    { name: "A", id: 0, OrderNum: 1, children: [] },
]);
const indexList = ref()
const searchValue = ref('');
const searchResult = ref<ListItem[]>([]);
//排序
firstmenu.value = sortByOrderNumDescending(firstmenu.value)
//定义总目录
const actionrouterList = ref<ListItem[]>([]);

//定义二级类目menu
const secMenu = ref<ListItem[]>([
]);

//排序后的数据
const tabCur = ref(0);
const mainCur = ref(0);
const verticalNavTop = ref(0);
const load = ref(true);
type TreeNode = {
    name: string;
    id: number;
    OrderNum: number;
    children: TreeNode[];
};
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
        return items.map(item => ({
            ...item,
            children: sortChildren(item.children) // 递归排序子项
        })).sort(sortByOrderIdAndIdDesc);
    };

    // 对顶级路由进行排序，并对每个路由的子项进行排序
    return routers.map(router => ({
        ...router,
        children: sortChildren(router.children) // 对每个路由的子项进行排序
    })).sort(sortByOrderIdAndIdDesc);
}

//处理搜索点击事件
const handlelocation = (actionid: number | string) => {
    console.log(actionid)
    const { firstCategoryId, secondCategoryId } = findCategoryIds(actionrouterList.value, actionid)
    console.log(firstCategoryId, secondCategoryId)
    if (firstCategoryId && secondCategoryId) {
        mainCur.value = firstCategoryId
        secMenuSelect(secMenu.value[secondCategoryId - 1], secondCategoryId - 1)
    } else if (firstCategoryId) {
        mainCur.value = firstCategoryId
        secMenuSelect(secMenu.value[0], 0)
    }
    searchValue.value = ''
    fuzzySearch(actionrouterList.value, searchValue.value)
}

//接口数据转换
function transformCategories(source: SourceCategory[]): TargetCategory[] {
    const target: TargetCategory[] = [];

    source.forEach(item => {
        const firstCategory = item.FirstCategory;
        const targetItem: TargetCategory = {
            name: firstCategory.Name,
            id: firstCategory.ID,
            OrderNum: firstCategory.OrderNum,
            children: []
        };

        if (item.SecondCategoryInfos) {
            item.SecondCategoryInfos.forEach(secondCatInfo => {
                const secondCategory = secondCatInfo.SecondCategory;
                const targetSecondCat: TargetCategory = {
                    name: secondCategory.Name,
                    id: secondCategory.ID,
                    OrderNum: secondCategory.OrderNum,
                    children: []
                };
                if (secondCatInfo.ActionInfos) {
                    secondCatInfo.ActionInfos.forEach(actionInfo => {
                        const actionItem: ActionItem = {
                            CreatedAt: actionInfo.ActionInfos.CreatedAt,
                            Description: actionInfo.ActionInfos.Description,
                            id: actionInfo.ActionInfos.ID,
                            name: actionInfo.ActionInfos.Name,
                            OrderNum: actionInfo.ActionInfos.OrderNum,
                            SecondCategoryID: actionInfo.ActionInfos.SecondCategoryID,
                        };
                        targetSecondCat.children.push(actionItem);
                    })
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
function findCategoryIds(menuItems, deepestId) {
    let firstCategoryId = null;
    let secondCategoryId = null;

    function searchCategory(items) {
        for (const item of items) {
            // 检查当前项的 id 是否与最深层的 id 匹配
            if (item.id === deepestId) {
                // 如果匹配，则设置二级菜单 id
                secondCategoryId = item.SecondCategoryID;
                return true; // 找到匹配项，返回 true
            }
            // 如果有子项，则递归搜索
            if (item.children && item.children.length > 0) {
                const found = searchCategory(item.children);
                if (found) {
                    // 如果已经找到最深层的 id，则检查一级菜单 id
                    if (secondCategoryId !== null && firstCategoryId === null) {
                        firstCategoryId = item.id;
                    }
                    return true; // 找到匹配项，返回 true
                }
            }
        }
        return false; // 未找到匹配项，返回 false
    }

    // 开始搜索
    searchCategory(menuItems);
    const result = searchCategory(menuItems);
    if (result) {
        return { firstCategoryId, secondCategoryId }; // 如果 searchCategory 返回了结果，则返回这个结果
    }
    return { firstCategoryId, secondCategoryId }; // 如果没有找到，返回当前的类目ID
}

//处理二级目录被选中事件
//需要传入二级及其子项
const secMenuSelect = (item: ListItem, index: number) => {
    if (item.children.Imgs) return
    actionrouterList.value[mainCur.value].children[index].active = !actionrouterList.value[mainCur.value].children[index].active
    getActionsBySec(item.id).then(res => {
        //更新对应的二级目录
        actionrouterList.value[mainCur.value].children[index].children = res.data.data.map(item => {
            return {
                id: item.ID,
                name: item.Name,
                OrderNum: item.OrderNum,
                children: [],
                Imgs: item.Imgs,
                Videos: item.Videos,
                Description: item.Description,
                CreatedAt: item.CreatedAt,
            }
        })
        actionrouterList.value = sortByOrderNumDescending(actionrouterList.value)
    })
}
//定义搜索方法：
const fuzzySearch = (data: TreeNode[], searchQuery: string): TreeNode[] => {
    if (!searchQuery) {
        searchResult.value = [];
        return [];
    }
    const searchResults: TreeNode[] = [];

    const searchNode = (node: TreeNode) => {
        // 确保node.name存在并且是一个字符串
        if (typeof node.name === 'string' && node.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            searchResults.push(node);
        }
        // 如果有子节点，递归搜索每个子节点
        if (node.children && node.children.length > 0) {
            node.children.forEach(child => searchNode(child));
        }
    };

    // 对每个顶层节点调用递归搜索函数
    data.forEach(node => searchNode(node));
    indexList.value = searchResults.map(item => item.name);
    searchResult.value = searchResults;
    return searchResults;
};


// 节流函数
function throttle(func: any, limit: any) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

watch(searchValue, throttle(function (newQuery: any) {
    fuzzySearch(actionrouterList.value, newQuery);
}, 500));


onMounted(() => {
    uni.showLoading({ title: '加载中...', mask: true });
    const newList: ListItem[] = [];
    //先获取一级目录
    getFirstmenulist().then((res) => {
        //遍历存到总数组中
        for (let item of res.data.data) {
            let data: ListItem = {
                name: item.Name,
                id: item.ID,
                OrderNum: item.OrderNum,
                children: [],
            }
            actionrouterList.value.push(data)
        }
        //排序
        const sortedItems = sortByOrderNumDescending(actionrouterList.value);
        actionrouterList.value = sortedItems;
        //获取二级目录信息，传入一个一级目录的
        getSelection(actionrouterList.value[0])

    })
    //另一个进程获取全部完整的信息
    getActionAll().then((res) => {
        const transformedData = transformCategories(res.data.data);
        actionrouterList.value = sortByOrderNumDescending(transformedData);
        console.log(res.data.data)
        console.log(actionrouterList.value)

    })
    nextTick(() => {
        uni.hideLoading();
    });
});




const getSelection = (item: ListItem) => {
    var firstmenuid = item.id
    if (item.children.length > 0) {
        toSecmenu(item)
    } else {
        uni.showLoading({
            title: '加载中...',
            mask: true
        });
        getSecByFirst(firstmenuid).then(res => {
            if (res.data.data.length > 0) {
                actionrouterList.value.find(item => item.id === firstmenuid)!.children = res.data.data.map(item => {
                    return {
                        id: item.ID,
                        name: item.Name,
                        OrderNum: item.OrderNum,
                        children: [],
                        active: false
                        // hadactive: true
                    }
                })
            }
            toSecmenu(item)
            actionrouterList.value = sortByOrderNumDescending(actionrouterList.value)
            uni.hideLoading();
        }).finally(() => {
            uni.hideLoading();
        })
    }
}

//更新对应的二级目录secMenu，需要传入一级目录
const toSecmenu = (item: ListItem) => {
    let list: any[] = []
    if (item.children) {
        if (item.children.length > 0) {
            item.children.forEach(element => {
                let data = {
                    name: element.name,
                    id: element.id,
                    OrderNum: element.OrderNum,
                    children: []
                }
                list.push(data)
            });
            secMenu.value = sortByOrderNumDescending(list)
        } else {
            list = []
            secMenu.value = list
        }
    }
}

const TabSelect = async (e: any) => {
    const id = e.currentTarget.dataset.id;
    tabCur.value = id;
    mainCur.value = id;
    verticalNavTop.value = (id - 1) * 50;
    getSelection(actionrouterList.value[id])
};

const VerticalMain = (e: any) => {
    // #ifdef MP-ALIPAY
    return false; // 支付宝小程序暂时不支持双向联动
    // #endif
    if (load.value) {
        let tabHeight = 0;
        firstmenu.value.forEach((item, index) => {
            const view = uni.createSelectorQuery().select(`#main-${item.id}`);
            view.fields({ size: true }, (data) => {
                firstmenu.value[index].top = tabHeight;
                tabHeight += data.height;
                firstmenu.value[index].bottom = tabHeight;
            }).exec();
        });
        load.value = false;
    }
    const scrollTop = e.detail.scrollTop + 10;
    firstmenu.value.forEach((item) => {
        if (scrollTop > item.top! && scrollTop < item.bottom!) {
            verticalNavTop.value = (item.id - 1) * 50;
            tabCur.value = item.id;
            console.log(scrollTop);
            return false;
        }
    });
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
    display: none
}
</style>
