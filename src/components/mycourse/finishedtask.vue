<template>
  <div class="finished-task container pb-20 w-full h-full">
    <div
      class="nodata-card flex flex-col justify-center items-center w-full"
      v-if="Object.keys(props.list).length == 0"
    >
      <van-empty description="暂无完成" />
    </div>

    <view class="cu-timeline" v-else>
      <view class="cu-item text-green" v-for="key in Object.keys(props.list)">
        <view
          style="box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.1)"
          class="content bg-white"
        >
          <div
            class="content-item flex flex-nowrap pl-5 justify-between items-center"
            v-for="item in props.list[key]"
          >
            <view class="flex flex-col">
              <div class="title w-full text-black font-bold">
                {{ item.name }}   每组{{ item.timesNum }}次  X {{ item.groupNum }}组
              </div>

              <div class="desc w-full text-xs text-gray-600">
                {{ item.time }}
              </div>
            </view>
            <view
              style="font-size: 25px"
              class="w-10 h-10 cuIcon-roundcheckfill text-[#ff5e3a]"
            ></view>
          </div>

          <!-- <div
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
          </div> -->
        </view>
      </view>
    </view>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted, reactive } from "vue";

const props = defineProps<{
  list: any;
}>();
</script>
<style scoped>
.content-item {
  margin-bottom: 12px;
}
</style>
