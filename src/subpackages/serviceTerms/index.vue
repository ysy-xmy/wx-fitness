<template>
  <view class="service-terms-container">
    <web-view 
      :src="currentWebUrl" 
      class="webview-content"
    ></web-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'uni-mini-router'

const route = useRoute()
const contentType = ref<'terms' | 'privacy'>('terms')
const currentWebUrl = ref('')

// 配置服务条款和隐私政策的网页地址
const webUrls = {
  terms: 'https://sit.2018ctjs.cn/serviceterm',
  privacy: 'https://sit.2018ctjs.cn/privacy'
}

onMounted(() => {
  // 从路由参数获取类型
  const params = route.params as { type?: 'terms' | 'privacy' }
  if (params.type && params.type in webUrls) {
    contentType.value = params.type
    currentWebUrl.value = webUrls[params.type]
  } else {
    // 默认加载服务条款
    currentWebUrl.value = webUrls.terms
  }
})
</script>

<style lang="scss" scoped>
.service-terms-container {
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
}

.webview-content {
  width: 100%;
  height: 100%;
}
</style> 