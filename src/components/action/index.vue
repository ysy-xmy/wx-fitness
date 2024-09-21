<template>
    <view>
        <view class="cu-bar search bg-white">
            <view class="search-form round">
                <text class="cuIcon-search"></text>
                <input :adjust-position="false" type="text" placeholder="搜索二级类目、动作" confirm-type="search" />
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
                            class="cu-list  pt-3  menu-avatar flex bg-white ">
                            <view class=" felx flex-col w-1/2  p-2 px-3  h-36  bg-[#f9fafb]">
                                <img class="w-full h-24 rounded-md  lg"
                                    src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg" />
                                <view class="content">
                                    <view class="text-black text-center text-lg font-extrabold">凯尔</view>

                                </view>

                            </view>
                            <view class=" felx flex-col  p-2 w-1/2 px-3  h-36  bg-[#f9fafb]">
                                <img class="w-full h-24 rounded-md  lg"
                                    src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg" />
                                <view class="content">
                                    <view class="text-black text-center text-lg font-extrabold">凯尔</view>

                                </view>

                            </view>


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
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { getFirstmenulist, getSecByFirst, getActionAll } from '@/api/action/action';
//@ts-ignore
import type { SourceCategory, TargetCategory, ActionItem, ListItem } from './types.ts'

//排序函数
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


                targetItem.children.push(targetSecondCat);
            });
        }

        target.push(targetItem);
    });

    return target;
}

const secMenuSelect = (item: ListItem, index: number) => {

    actionrouterList.value[mainCur.value].children[index].active = !actionrouterList.value[mainCur.value].children[index].active

    console.log(actionrouterList.value[mainCur.value].children[index].active)
}

const firstmenu = ref<ListItem[]>([
    { name: "A", id: 0, OrderNum: 1, children: [] },
    { name: "B", id: 1, OrderNum: 2, children: [] },
    { name: "C", id: 2, OrderNum: 3, children: [] },
    { name: "D", id: 3, OrderNum: 4, children: [] }
]);

firstmenu.value = sortByOrderNumDescending(firstmenu.value)

const actionrouterList = ref<ListItem[]>([]);

//定义二级类目menu
const secMenu = ref<ListItem[]>([
]);
//定义三级类目menu
const thirdMenu = ref<ListItem[]>([]);


//排序后的数据
const tabCur = ref(0);
const mainCur = ref(0);
const verticalNavTop = ref(0);
const load = ref(true);
const listCur = ref(firstmenu.value[0]);
onMounted(() => {
    uni.showLoading({ title: '加载中...', mask: true });
    const newList: ListItem[] = [];
    getFirstmenulist().then((res) => {
        for (let item of res.data.data) {
            let data: ListItem = {
                name: item.Name,
                id: item.ID,
                OrderNum: item.OrderNum,
                children: [],
                // hadactive: false
            }
            actionrouterList.value.push(data)
        }
        const sortedItems = sortByOrderNumDescending(actionrouterList.value);
        actionrouterList.value = sortedItems;
        getSelection(actionrouterList.value[0])

    })

    // getActionAll().then((res) => {
    //     console.log(res.data.data)
    //     const transformedData = transformCategories(res.data.data);
    //     actionrouterList.value = sortByOrderNumDescending(transformedData);
    // })

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
