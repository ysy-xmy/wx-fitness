<template>
  <div class="main-container w-screen pb-24">
    <!-- 线上课程需要显示两个部分 -->
    <div v-if="courseData.type === 'remote'">
      <!-- 自主式线上私教课 -->
      <div class="course-section">
        <div class="course-img w-full">
          <img
            class="w-screen h-60"
            :src="courseData.selfService.picurl"
            alt="" />
        </div>
        <div class="p-5 course-info pb-1 items-center">
          <span class="course-title tracking-wide py-3 text-2xl font-bold">
            {{ courseData.selfService.title }}
          </span>
          <div>{{ courseData.selfService.subtitle }}</div>
          <div class="course-tip text-[#545d6a] mt-2">
            <p>{{ courseData.selfService.description }}</p>
          </div>
          <van-divider style="height: 1px" class="p-0 m-0" />
        </div>
        <div class="pl-5 font-extrabold tracking-widest text-lg feature-text">
          {{ courseData.selfService.featureTitle }}
        </div>
        <div class="p-5 course-feature w-full flex flex-wrap justify-between">
          <div
            v-for="feature in courseData.selfService.features"
            :key="feature.id"
            class="feature-item flex flex-row">
            <div class="feature-icon">
              <van-icon name="medal" color="#ffdf6e" size="24" />
            </div>
            <div class="feature-title">{{ feature.title }}</div>
          </div>
        </div>

        <div
          class="pl-5 font-extrabold tracking-widest text-lg course-content-title">
          {{ courseData.selfService.contentTitle }}
        </div>
        <div class="p-5 pt-2 course-content">
          <div class="content-item content-intro">
            {{ courseData.selfService.content.intro }}
          </div>
          <div class="content-item">
            &nbsp;
            <br />
            {{ courseData.selfService.content.suitableTitle }}：
            <br />
            <span
              v-for="(person, index) in courseData.selfService.content
                .suitablePeople"
              :key="index">
              ● {{ person }}<br />
            </span>
          </div>
        </div>
        <div class="p-5 course-warning">
          <div class="warning-title font-extrabold tracking-widest text-lg">
            <van-icon name="warning" />
            {{ courseData.selfService.warningTitle }}
          </div>
          <div class="warning-content">
            <div
              v-for="warning in courseData.selfService.warnings"
              :key="warning.id"
              class="warning-item">
              <van-icon name="checked" color="#666f7a" />
              <p class="item-text">{{ warning.text }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 实时视频线上私教课 -->
      <div class="course-section">
        <div class="p-5 course-info pb-1 items-center">
          <span class="course-title tracking-wide py-3 text-2xl font-bold">
            {{ courseData.videoService.title }}
          </span>
          <div>{{ courseData.videoService.subtitle }}</div>
          <div class="course-tip text-[#545d6a] mt-2">
            <p>{{ courseData.videoService.description }}</p>
          </div>
          <van-divider style="height: 1px" class="p-0 m-0" />
        </div>
        <div class="pl-5 font-extrabold tracking-widest text-lg feature-text">
          {{ courseData.videoService.featureTitle }}
        </div>
        <div class="p-5 course-feature w-full flex flex-wrap justify-between">
          <div
            v-for="feature in courseData.videoService.features"
            :key="feature.id"
            class="feature-item flex flex-row">
            <div class="feature-icon">
              <van-icon name="medal" color="#ffdf6e" size="24" />
            </div>
            <div class="feature-title">{{ feature.title }}</div>
          </div>
        </div>

        <div
          class="pl-5 font-extrabold tracking-widest text-lg course-content-title">
          {{ courseData.videoService.contentTitle }}
        </div>
        <div class="p-5 pt-2 course-content">
          <div class="content-item content-intro">
            {{ courseData.videoService.content.intro }}
          </div>
          <div class="content-item">
            &nbsp;
            <br />
            {{ courseData.videoService.content.suitableTitle }}：
            <br />
            <span
              v-for="(person, index) in courseData.videoService.content
                .suitablePeople"
              :key="index">
              ● {{ person }}<br />
            </span>
          </div>
        </div>
        <div class="p-5 course-warning">
          <div class="warning-title font-extrabold tracking-widest text-lg">
            <van-icon name="warning" />
            {{ courseData.videoService.warningTitle }}
          </div>
          <div class="warning-content">
            <div
              v-for="warning in courseData.videoService.warnings"
              :key="warning.id"
              class="warning-item">
              <van-icon name="checked" color="#666f7a" />
              <p class="item-text">{{ warning.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 线下课程保持原有结构 -->
    <div v-else>
      <div class="course-img w-full">
        <img class="w-screen h-60" :src="courseData.picurl" alt="" />
      </div>
      <div class="p-5 course-info pb-1 items-center">
        <span class="course-title tracking-wide py-3 text-2xl font-bold">
          {{ courseData.title }}
        </span>
        <div>{{ courseData.subtitle }}</div>
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
          class="feature-item flex flex-row">
          <div class="feature-icon">
            <van-icon name="medal" color="#ffdf6e" size="24" />
          </div>
          <div class="feature-title">{{ feature.title }}</div>
        </div>
      </div>

      <div
        class="pl-5 font-extrabold tracking-widest text-lg course-content-title">
        {{ courseData.contentTitle }}
      </div>
      <div class="p-5 pt-2 course-content">
        <div class="content-item content-intro">
          {{ courseData.content.intro }}
        </div>
        <div class="content-item">
          &nbsp;
          <br />
          {{ courseData.content.suitableTitle }}：
          <br />
          <span
            v-for="(person, index) in courseData.content.suitablePeople"
            :key="index">
            ● {{ person }}<br />
          </span>
        </div>
      </div>
      <div class="p-5 course-warning">
        <div class="warning-title font-extrabold tracking-widest text-lg">
          <van-icon name="warning" /> {{ courseData.warningTitle }}
        </div>
        <div class="warning-content">
          <div
            v-for="warning in courseData.warnings"
            :key="warning.id"
            class="warning-item">
            <van-icon name="checked" color="#666f7a" />
            <p class="item-text">{{ warning.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="fixed bg-white bottom-0 w-full p-5 course-btn flex flex-nowrap justify-between">
      <div @click="contact" class="btn-item flex flex-col px-5">
        <van-icon name="friends" size="24" />
        <span class="btn-text">{{
          courseData.buttons?.contact || "联系教练"
        }}</span>
      </div>
      <div class="btn-item flex-1">
        <van-button
          @click="buyCourse"
          square
          class="w-full rounded-lg"
          size="large"
          type="primary"
          color="#3bd5dd"
          >{{ courseData.buttons?.buy || "报名" }}</van-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="course">
import { useRouter } from "uni-mini-router";
import { ref, onMounted } from "vue";

const router = useRouter();

// 定义类型
interface CourseService {
  picurl: string;
  title: string;
  subtitle: string;
  status: string;
  description: string;
  featureTitle: string;
  features: Array<{ id: number; title: string }>;
  contentTitle: string;
  content: {
    intro: string;
    suitableTitle: string;
    suitablePeople: string[];
  };
  warningTitle: string;
  warnings: Array<{ id: number; text: string }>;
}

interface RemoteCourse {
  type: 'remote';
  selfService: CourseService;
  videoService: CourseService;
  buttons: {
    contact: string;
    buy: string;
  };
}

interface OfflineCourse {
  type: 'offline';
  picurl: string;
  title: string;
  subtitle: string;
  status: string;
  description: string;
  featureTitle: string;
  features: Array<{ id: number; title: string }>;
  contentTitle: string;
  content: {
    intro: string;
    suitableTitle: string;
    suitablePeople: string[];
  };
  warningTitle: string;
  warnings: Array<{ id: number; text: string }>;
  buttons: {
    contact: string;
    buy: string;
  };
}

type CourseData = RemoteCourse | OfflineCourse;

// 课程数据配置
const courseConfigs = {
  remote: {
    type: "remote" as const,
    selfService: {
      picurl: "https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20250902/1756778445072.png",
      title: "自主式线上私教课",
      subtitle: "（灵活自主·高效执行）",
      status: "报名中",
      description: "购课后请与教练沟通训练目标与可用时间，主动告知既往病史，教练将为您制定个性化训练计划。学员自主安排时间完成训练，并通过打卡系统提交反馈。",
      featureTitle: "课程特色",
      features: [
        { id: 1, title: "个性化训练计划" },
        { id: 2, title: "灵活安排训练时间" },
        { id: 3, title: "动作视频示范与讲解" },
        { id: 4, title: "训练记录与进度跟踪" },
        { id: 5, title: "饮食建议与健康指导" },
      ],
      contentTitle: "课程主要内容",
      content: {
        intro: "自主式线上私教课简介：\n教练根据您的身体状况与目标定制每周训练计划，提供清晰的动作视频与文字说明。您可随时在合适的时间完成训练，并通过平台提交训练反馈，教练将定期调整计划并给予指导。",
        suitableTitle: "适合人群",
        suitablePeople: [
          "时间不固定但希望系统训练的人群",
          "具备一定运动基础，能独立完成动作",
          "喜欢自由安排训练节奏的学员",
          "希望通过记录与反馈持续进步的健身爱好者",
        ],
      },
      warningTitle: "注意事项",
      warnings: [
        { id: 1, text: "请按时完成每周训练计划，保持运动连续性。" },
        { id: 2, text: "训练中如有不适，请立即停止并联系教练。" },
        { id: 3, text: "请保证训练环境安全，避免独自进行高风险动作。" },
        { id: 4, text: "建议配合健康饮食与充足休息，提升训练效果。" },
      ],
    },
    videoService: {
      picurl: "https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20250902/1756778445072.png",
      title: "实时视频线上私教课",
      subtitle: "（一对一指导·全程陪伴）",
      status: "报名中",
      description: "购课后请与教练预约上课时间，主动告知既往病史，通过视频连线进行实时训练。教练全程示范、纠正动作，确保训练安全与效果。",
      featureTitle: "课程特色",
      features: [
        { id: 1, title: "一对一实时视频指导" },
        { id: 2, title: "动作实时纠正与保护" },
        { id: 3, title: "训练节奏由教练掌控" },
        { id: 4, title: "即时互动与动力激励" },
        { id: 5, title: "适合康复与进阶训练" },
      ],
      contentTitle: "课程主要内容",
      content: {
        intro: "实时视频线上私教课简介：\n教练通过视频连线方式与您同步训练，全程语音与视觉指导，确保每个动作标准、安全、高效。课程强度与内容根据您的实时状态动态调整，达到最佳训练效果。",
        suitableTitle: "适合人群",
        suitablePeople: [
          "运动新手需要动作指导与保护",
          "希望有陪伴与监督保持动力的学员",
          "特殊需求（如康复、孕产、体能提升）人群",
          "追求高效、精准训练的健身爱好者",
        ],
      },
      warningTitle: "注意事项",
      warnings: [
        { id: 1, text: "请提前测试网络与设备，确保视频畅通。" },
        { id: 2, text: "课程开始前10分钟进入线上教室做准备。" },
        { id: 3, text: "训练中请保持镜头可见，便于教练指导。" },
        { id: 4, text: "如有身体不适或病史请提前告知教练。" },
      ],
    },
    buttons: {
      contact: "联系教练",
      buy: "报名",
    },
  } as RemoteCourse,
  offline: {
    type: "offline" as const,
    picurl: "https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com/20250729/1753798686313.jpg",
    title: "私教课",
    subtitle: "（一对一指导·全程陪伴）",
    status: "报名中",
    description: "购课后请与教练预约上课时间，主动告知既往病史，通过视频连线进行实时训练。教练全程示范、纠正动作，确保训练安全与效果。",
    featureTitle: "课程特色",
    features: [
      { id: 1, title: "减脂塑形" },
      { id: 2, title: "增肌强化" },
      { id: 3, title: "提升心肺功能" },
      { id: 4, title: "专项运动表现" },
      { id: 5, title: "健康与功能改善" },
      { id: 6, title: "特殊需求与康复" },
    ],
    contentTitle: "课程主要内容",
    content: {
      intro: "实体私教课简介：\n由专业教练提供一对一指导，量身定制专属运动计划。课程采用线下实体授课形式，教练全程陪伴指导，确保动作标准与训练安全高效。",
      suitableTitle: "适合人群",
      suitablePeople: [
        "希望获得个性化训练的人群",
        "运动新手或经验不足者，需要专业指导",
        "追求快速、安全、显著健身效果者",
        "需要持续动力与监督以保持训练积极性等",
      ],
    },
    warningTitle: "注意事项",
    warnings: [
      { id: 1, text: "请准时参加课程，迟到者请按时退费。" },
      { id: 2, text: "请遵守教练指导，勿私自外出，保持身体健康。" },
      { id: 3, text: "请注意休息，避免长时间坐姿不端。" },
      { id: 4, text: "请配合教练进行锻炼，避免出现不适。" },
    ],
    buttons: {
      contact: "联系教练",
      buy: "报名",
    },
  } as OfflineCourse,
};

// 当前课程数据
const courseData = ref<CourseData>(courseConfigs.offline);

// 获取路由参数并设置课程数据
onMounted(() => {
  if (router.route.value.query?.type === "remote") {
    courseData.value = courseConfigs.remote;
  } else {
    courseData.value = courseConfigs.offline;
  }
  console.log("路由参数:", router.route.value.query);
});

const contact = () => {
  router.push({ path: "/subpackages/coachcontact/index?ifChoose=false" });
};

const buyCourse = () => {
  router.push(`/subpackages/coursePurchase/index?ifDiy=false`);
};
</script>

<style scoped>
.course-section {
  margin-bottom: 20px;
}

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

.course-title {
  white-space: pre-line;
}

.content-item {
  letter-spacing: 0.5px;
  line-height: 30px;
  margin-bottom: 10px;
}

.content-intro {
  white-space: pre-line;
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
