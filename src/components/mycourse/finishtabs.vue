<template>
  <div class="course-container">
    <div class="course-item">
      <div class="icon online-icon"></div>
      <span class="flex-1 text-center text-xl">线上课程</span>
      <div class="icon opacity-100"></div>
    </div>
    <div class="course-item">
      <div class="icon opacity-100"></div>
      <span class="flex-1 text-center text-xl">线下课程</span>
      <div class="icon offline-icon"></div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.course-container {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.course-item {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 10px;
}

.icon {
  width: 50px;
  height: 50px;
  background-size: cover;
}

.online-icon {
  background-image: url("https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20250102/1735755534827.png"); /* 替换为实际的线上课程图标路径 */
}

.offline-icon {
  background-image: url("https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20250102/1735755483460.png"); /* 替换为实际的线下课程图标路径 */
}
</style>
