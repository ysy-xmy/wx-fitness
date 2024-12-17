<template>
  <div class="course-container">
    <div class="course-item">
      <div class="icon online-icon"></div>
      <span>线上课程</span>
    </div>
    <div class="course-item">
      <div class="icon offline-icon"></div>
      <span>线下课程</span>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.course-container {
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.course-item {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
}

.icon {
  width: 40px;
  height: 40px;
  background-size: cover;
  margin-right: 10px;
}

.online-icon {
  background-image: url('@/static/icon/onlineCourse.png'); /* 替换为实际的线上课程图标路径 */
}

.offline-icon {
  background-image: url('@/static/icon/offlineCourse.png'); /* 替换为实际的线下课程图标路径 */
}
</style>
