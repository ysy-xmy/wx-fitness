<template>
  <div style="width: 100vw; padding: 20px 10px">
    <div
      class="card"
      style="width: 100%; display: flex; justify-content: center"
      v-for="(item, index) in img"
      v-if="img.length > 0"
    >
      <image
        style="margin-bottom: 10px"
        :src="item"
        mode="widthFix"
        @click="preview(index)"
      ></image>
    </div>
    <van-empty description="对方暂未上传体检报告~" v-else />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "uni-mini-router";
import { onMounted, ref } from "vue";
const route = useRouter();
const img = ref([]);
onMounted(() => {
  const decodedImgData = decodeURIComponent(route.route.value.query.img);
  const name = decodeURIComponent(route.route.value.query.name);
  uni.setNavigationBarTitle({
    title: name + "的体检表",
  });
  img.value = JSON.parse(decodedImgData); // 对解码后的字符串进行解析
});
const preview = (index: number) => {
  uni.previewImage({
    current: index,
    urls: img.value,
    loop: true,
    indicator: "number",
  });
};
</script>
<style lang="less" scoped></style>
