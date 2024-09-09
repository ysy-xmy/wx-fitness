<template>
    <div class="main-container  w-screen pb-24">
        <div class="course-img  w-full ">
            <img class="w-screen h-60" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="">
        </div>
        <div class=" p-5 course-info">
            <div class="tip text-[#6b7280]">
                <van-icon name="star" color="#ffdf6e" size="20" />
                （最近有<span class="text-red-500 ">100人</span>报名）
            </div>
            <div class="course-title tracking-wide py-3 text-2xl font-bold">私教课
            </div>
            <div class="course-tip text-[#545d6a]">
                <p>由李教练进行授课，授课时间购课后与教练沟通</p>
            </div>
            <van-divider style="height: 3px;" class="" />

            <div class="course-desc  tracking-wider font-semibold ">
                <p style="line-height: 27px;">私教课是指由教练带领的专业私人教练课程，适合于那些需要有针对性的训练，如减脂、塑形、瘦身、塑胶训练、健美、减肥等。</p>
                <p style="line-height: 27px;">私教课的特点是由专业的私人教练带领，教练会根据客户的个人情况，制定针对性的训练计划，并提供专业的指导，帮助客户达到目标。</p>
            </div>

        </div>
        <div class="pl-5 font-extrabold tracking-widest text-lg  feature-text">
            课程特色
        </div>
        <div class="p-5 course-feature w-full flex flex-wrap justify-between ">
            <div class="feature-item flex flex-row ">
                <div class="feature-icon">
                    <van-icon name="medal" color="#ffdf6e" size="24" />
                </div>
                <div class="feature-title">专业教练</div>
            </div>
            <div class="feature-item ">

                <div class="feature-icon">
                    <van-icon name="medal" color="#ffdf6e" size="24" />

                </div>
                <div class="feature-title">场地免费wifi</div>


            </div>

            <div class="feature-item">
                <div class="feature-icon">
                    <van-icon name="medal" color="#ffdf6e" size="24" />

                </div>
                <div class="feature-title">无时间限制</div>

            </div>
            <div class="feature-item">
                <div class="feature-icon">
                    <van-icon name="medal" color="#ffdf6e" size="24" />

                </div>
                <div class="feature-title">空调</div>
            </div>
        </div>

        <div class="pl-5 font-extrabold tracking-widest text-lg course-content-title">
            课程主要内容
        </div>
        <div class="p-5 course-content ">
            <div class="content-item">
                杠铃卧推：平板、上斜、下斜杠铃卧推动作图解教程




            </div>
            <div class="content-item">
                杠铃卧推能增加胸大肌厚度。平板、上斜、下斜三种形式的杠铃卧推，分别重点锻炼胸大肌不同部位，其他还涉及肱三头肌、三角肌。



            </div>
            <div class="content-item">

                杠铃卧推（barbell press）是锻炼胸肌的经典动作，属于自由重量卧推，比固定器械的效果更好，因此胸大肌和上臂力量达到一定水平后最好用杠铃或哑铃进行卧推，这样才能得到完美的胸肌。


            </div>

            <div class="content-item flex justify-center">
                <img class="w-2/3 h-40" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="">
            </div>
            <div class="content-item flex justify-center">
                <img class="w-2/3 h-40" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="">
            </div>
        </div>
        <div class="p-5 course-warning">

            <div class="warning-title font-extrabold tracking-widest text-lg "><van-icon name="warning" /> 注意事项 </div>
            <div class="warning-content">
                <div class="warning-item">
                    <van-icon name="checked" color="#666f7a" />
                    <p class="item-text">请准时参加课程，迟到者请按时退费。</p>
                </div>
                <div class="warning-item">
                    <van-icon name="checked" color="#666f7a" />
                    <p class="item-text">请遵守教练指导，勿私自外出，保持身体健康。</p>
                </div>
                <div class="warning-item">
                    <van-icon name="checked" color="#666f7a" />
                    <p class="item-text">请注意休息，避免长时间坐姿不端。</p>

                </div>

                <div class="warning-item">
                    <van-icon name="checked" color="#666f7a" />
                    <p class="item-text">请配合教练进行锻炼，避免出现不适。</p>

                </div>


            </div>
        </div>
        <div class="fixed bg-white bottom-0 w-full p-5 course-btn flex flex-nowrap justify-between">
            <div @click="contact" class="btn-item flex flex-col px-5">
                <van-icon name="friends" size="24" />
                <span class="btn-text">联系教练</span>
            </div>
            <div class="btn-item flex-1">
                <van-button square class="w-full rounded-lg" size="large" type="primary" color="#fd7d46">报名</van-button>

            </div>


        </div>


    </div>


</template>
<script lang="ts" setup name="course">
import { useRouter } from 'uni-mini-router';
const router = useRouter();

const contact = () => {
    router.push(
        { name: 'contact' }
    );
}
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