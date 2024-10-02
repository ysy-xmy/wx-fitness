<template>
  <div class="finished-task container pb-20 w-full h-full">
    <div
      class="nodata-card flex flex-col justify-center items-center w-full"
      v-if="list.length == 0"
    >
      <van-empty description="暂无完成" />
    </div>
    <view class="cu-timeline" v-else>
      <text>
        <view class="cu-time">昨天</view>

        <view class="cu-item text-green">
          <view
            style="box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.1)"
            class="content bg-white"
          >
            <div
              class="content-item flex flex-nowrap pl-5 justify-between items-center"
            >
              <view class="flex flex-col">
                <div class="title w-full text-black font-bold">
                  28kg杠铃 10组
                </div>

                <div class="desc w-full text-xs text-gray-600">
                  完成了课程《健身教练必修课》
                </div>
              </view>
              <view
                style="font-size: 25px"
                class="w-10 h-10 cuIcon-roundcheckfill text-[#ff5e3a]"
              ></view>
            </div>

            <div
              class="content-item flex flex-nowrap pl-5 justify-between items-center"
            >
              <view class="flex flex-col">
                <div class="title w-full text-black font-bold">
                  28kg杠铃 10组
                </div>

                <div class="desc w-full text-xs text-gray-600">
                  完成了课程《健身教练必修课》
                </div>
              </view>
              <view
                style="font-size: 25px"
                class="w-10 h-10 cuIcon-roundcheckfill text-[#ff5e3a]"
              ></view>
            </div>
          </view>
        </view>
      </text>
      <!-- <view class="cu-time">06-17</view>

      <view class="cu-item text-green">
        <view
          style="box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.1)"
          class="content bg-white"
        >
          <div
            class="content-item flex flex-nowrap pl-5 justify-between items-center"
          >
            <view class="flex flex-col">
              <div class="title w-full text-black font-bold">28kg杠铃 10组</div>

              <div class="desc w-full text-xs text-gray-600">
                完成了课程《健身教练必修课》
              </div>
            </view>
            <view
              style="font-size: 25px"
              class="w-10 h-10 cuIcon-roundcheckfill text-[#ff5e3a]"
            ></view>
          </div>

          <div
            class="content-item flex flex-nowrap pl-5 justify-between items-center"
          >
            <view class="flex flex-col">
              <div class="title w-full text-black font-bold">28kg杠铃 10组</div>

              <div class="desc w-full text-xs text-gray-600">
                完成了课程《健身教练必修课》
              </div>
            </view>
            <view
              style="font-size: 25px"
              class="w-10 h-10 cuIcon-roundcheckfill text-[#ff5e3a]"
            ></view>
          </div>
        </view>
      </view>
      <view class="cu-time">08-17</view>

      <view class="cu-item text-green">
        <view
          style="box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.1)"
          class="content bg-white"
        >
          <div
            class="content-item flex flex-nowrap pl-5 justify-between items-center"
          >
            <view class="flex flex-col">
              <div class="title w-full text-black font-bold">28kg杠铃 10组</div>

              <div class="desc w-full text-xs text-gray-600">
                完成了课程《健身教练必修课》
              </div>
            </view>
            <view
              style="font-size: 25px"
              class="w-10 h-10 cuIcon-roundcheckfill text-[#ff5e3a]"
            ></view>
          </div>

          <div
            class="content-item flex flex-nowrap pl-5 justify-between items-center"
          >
            <view class="flex flex-col">
              <div class="title w-full text-black font-bold">28kg杠铃 10组</div>

              <div class="desc w-full text-xs text-gray-600">
                完成了课程《健身教练必修课》
              </div>
            </view>
            <view
              style="font-size: 25px"
              class="w-10 h-10 cuIcon-roundcheckfill text-[#ff5e3a]"
            ></view>
          </div>
        </view>
      </view> -->
    </view>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted, reactive } from "vue";
import { getplanlist } from "@/api/course";
const props = defineProps<{
  list: any;
}>();
const keyList = ref(Object.keys(props.list));
let list = reactive([]);
onMounted(() => {});
</script>
<style scoped>
.content-item {
  margin-bottom: 12px;
}
</style>
