<template>
  <div class="main-container w-screen pb-24">
    <div class="course-img w-full">
      <img
        class="w-screen h-60"
        :src="courseData.picurl"
        alt=""
      />
    </div>
    <div class="p-5 course-info pb-1 items-center">
      <span class="course-title tracking-wide py-3 text-2xl font-bold">
        {{ courseData.title }}
      </span>
      <span class="tip text-[#6b7280]">
        （<span class="text-red-500">火热</span>{{ courseData.status }}）
      </span>
      <div class="course-tip text-[#545d6a] mt-2">
        <p>{{ courseData.description }}</p>
      </div>
      <van-divider style="height: 1px" class="p-0 m-0" />

    </div>
    <div class="pl-5 font-extrabold tracking-widest text-lg feature-text">
      {{ courseData.featureTitle }}
    </div>
    <div class="p-5 course-feature w-full flex flex-wrap justify-between">
      <div 
        v-for="feature in courseData.features" 
        :key="feature.id"
        class="feature-item flex flex-row"
      >
        <div class="feature-icon">
          <van-icon name="medal" color="#ffdf6e" size="24" />
        </div>
        <div class="feature-title">{{ feature.title }}</div>
      </div>
    </div>

    <div
      class="pl-5 font-extrabold tracking-widest text-lg course-content-title"
    >
      {{ courseData.contentTitle }}
    </div>
    <div class="p-5 pt-2 course-content">
      <div class="content-item">
        {{ courseData.content.intro }}
      </div>
      <div class="content-item">
        &nbsp;
        <br />

        {{ courseData.content.suitableTitle }}：
        <br />
        <span v-for="(person, index) in courseData.content.suitablePeople" :key="index">
          ● {{ person }}<br />
        </span>
      </div>

      <!-- <div class="content-item flex justify-center">
        <img
          class="w-5/6 h-44"
          src="https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20250729/1753798666231.png"
          alt=""
        />
      </div> -->
    
    </div>
    <div class="p-5 course-warning">
      <div class="warning-title font-extrabold tracking-widest text-lg">
        <van-icon name="warning" /> {{ courseData.warningTitle }}
      </div>
      <div class="warning-content">
        <div 
          v-for="warning in courseData.warnings" 
          :key="warning.id"
          class="warning-item"
        >
          <van-icon name="checked" color="#666f7a" />
          <p class="item-text">{{ warning.text }}</p>
        </div>
      </div>
    </div>
    <div
      class="fixed bg-white bottom-0 w-full p-5 course-btn flex flex-nowrap justify-between"
    >
      <div @click="contact" class="btn-item flex flex-col px-5">
        <van-icon name="friends" size="24" />
        <span class="btn-text">{{ courseData.buttons.contact }}</span>
      </div>
      <div class="btn-item flex-1">
        <van-button
          @click="buyCourse"
          square
          class="w-full rounded-lg"
          size="large"
          type="primary"
          color="#3bd5dd"
          >{{ courseData.buttons.buy }}</van-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="course">
import { useRouter } from "uni-mini-router";
import { ref, onMounted } from "vue";

const router = useRouter();

// 课程数据配置
const courseConfigs = {
  remote: {
    picurl:'https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20250902/1756778445072.png',
    title: "远程私教课",
    status: "报名中",
    description: "购课后请与教练协调上课时间，主动告知既往病史以及身体不适，并在教练协助下进行锻炼。",
    featureTitle: "课程特色",
    features: [
      { id: 1, title: "减脂塑形" },
      { id: 2, title: "增肌强化" },
      { id: 3, title: "提升心肺功能" },
      { id: 4, title: "专项运动表现" },
      { id: 5, title: "健康与功能改善" },
      { id: 6, title: "特殊需求与康复" }
    ],
    contentTitle: "课程主要内容",
    content: {
      intro: "远程私教课简介：\n由专业教练提供一对一指导，量身定制专属运动计划。课程采用线上实体授课形式，教练全程陪伴指导，确保动作标准与训练安全高效。",
      suitableTitle: "适合人群",
      suitablePeople: [
        "希望获得个性化训练的人群",
        "运动新手或经验不足者，需要专业指导",
        "追求快速、安全、显著健身效果者",
        "需要持续动力与监督以保持训练积极性等"
      ]
    },
    warningTitle: "注意事项",
    warnings: [
      { id: 1, text: "请准时参加课程，迟到者请按时退费。" },
      { id: 2, text: "请遵守教练指导，勿私自外出，保持身体健康。" },
      { id: 3, text: "请注意休息，避免长时间坐姿不端。" },
      { id: 4, text: "请配合教练进行锻炼，避免出现不适。" }
    ],
    buttons: {
      contact: "联系教练",
      buy: "报名"
    }
  },
  offline: {
    picurl:'https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20250729/1753798686313.jpg',
    title: "私教课",
    status: "报名中",
    description: "购课后请与教练协调上课时间，主动告知既往病史以及身体不适，并在教练协助下进行锻炼。",
    featureTitle: "课程特色",
    features: [
      { id: 1, title: "减脂塑形" },
      { id: 2, title: "增肌强化" },
      { id: 3, title: "提升心肺功能" },
      { id: 4, title: "专项运动表现" },
      { id: 5, title: "健康与功能改善" },
      { id: 6, title: "特殊需求与康复" }
    ],
    contentTitle: "课程主要内容",
    content: {
      intro: "实体私教课简介：\n由专业教练提供一对一指导，量身定制专属运动计划。课程采用线下实体授课形式，教练全程陪伴指导，确保动作标准与训练安全高效。",
      suitableTitle: "适合人群",
      suitablePeople: [
        "希望获得个性化训练的人群",
        "运动新手或经验不足者，需要专业指导",
        "追求快速、安全、显著健身效果者",
        "需要持续动力与监督以保持训练积极性等"
      ]
    },
    warningTitle: "注意事项",
    warnings: [
      { id: 1, text: "请准时参加课程，迟到者请按时退费。" },
      { id: 2, text: "请遵守教练指导，勿私自外出，保持身体健康。" },
      { id: 3, text: "请注意休息，避免长时间坐姿不端。" },
      { id: 4, text: "请配合教练进行锻炼，避免出现不适。" }
    ],
    buttons: {
      contact: "联系教练",
      buy: "报名"
    }
  }
};

// 当前课程数据
const courseData = ref(courseConfigs.offline);

// 获取路由参数并设置课程数据
onMounted(() => {
  // 使用 router 对象获取路由参数
  if (router.route.value.query?.type === 'remote') {
    courseData.value = courseConfigs.remote;
  } else {
    courseData.value = courseConfigs.offline;
  }
  // ifChoose.value = router.route.value.query.ifChoose;  // const query = currentRoute.query || {};
  console.log('路由参数:', router.route.value.query);
  
  // 根据路由参数判断课程类型
  // if (query.type === 'remote') {
  //   courseData.value = courseConfigs.remote;
  // } else {
  //   courseData.value = courseConfigs.offline;
  // }
});

const contact = () => {
  router.push({ path: "/subpackages/coachcontact/index?ifChoose=false" });
};

const buyCourse = () => {
  router.push(
    // { name: 'buyCourse' }
    `/subpackages/coursePurchase/index?ifDiy=false`
  );
};
</script>
<style scoped>
.feature-item {
  width: 45%;
  background-color: #f9fafbf4;
  margin-bottom: 15px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: start;
  border-radius: 5px;
  padding: 5px;
  padding-top: 15px;
  padding-bottom: 15px;

  letter-spacing: 1.5px;
}

.content-item {
  letter-spacing: 0.5px;
  line-height: 30px;
  margin-bottom: 10px;
}

.warning-item {
  display: flex;
  flex-wrap: nowrap;
  padding-top: 5px;

  padding-bottom: 5px;
}

.item-text {
  margin-left: 10px;
  letter-spacing: 1.2px;
}

.feature-icon {
  margin-right: 10px;
}
</style>
