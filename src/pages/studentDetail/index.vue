<template>
    <div class="main flex w-full justify-center flex-col items-center">
        <div class="info mt-5 flex  flex-col items-center">


            <div class="avatar ">

                <img class="w-28 h-28 rounded-full"
                    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.UjwT5Zhsxxr4S0wmFjSuMAAAAA?w=207&h=207&c=7&r=0&o=5&pid=1.7"
                    alt="">
            </div>
            <h1 class="my-3 text-2xl text-center font-bold">陈景盛</h1>
            <span class="text-gray-400 text-sm text-center">20岁</span>
        </div>

        <div class="info-card flex flex-row items-center mt-1 w-11/12 ">
            <div class="card p-5 w-1/3 flex justify-center flex-col items-center ">
                <h2 class="text-xl font-bold">65kg</h2>
                <span class="text-gray-400 text-sm">Weight</span>
            </div>
            <div class="card p-5 w-1/3 flex justify-center flex-col items-center">
                <h2 class="text-xl font-bold">165cm</h2>
                <span class="text-gray-400 text-sm">Height</span>
            </div>
            <div class="card p-5 w-1/3 flex justify-center flex-col items-center">
                <h2 class="text-md font-bold underline text-[#F65625]">体检表</h2>
            </div>
        </div>

        <div class="tab-title mt-2 bg-[#f8fafc] w-11/12 rounded-lg p-2">
            <div class="tab flex justify-center items-center bg-white">
                <div class="tab-item w-1/3 text-center py-3 cursor-pointer">
                    <span class=" text-[#F65625] tracking-widest">训 练 计 划</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>