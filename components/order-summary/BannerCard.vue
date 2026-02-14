<template>
    <div class="flex flex-col p-6 linear-gradient rounded-xl shadow-xs justify-between h-[276px] mb-9">
        <div class="flex flex-col gap-4">
            <h2 class="text-[#FFF] text-2xl font-semibold leading-9">Banner Title</h2>
            <p class="text-[#FFF] text-sm font-normal leading-6">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                from 45 BC, making it over 2000 years old.
            </p>
        </div>
        <div class="flex flex-row justify-center">
            <button class="px-6 bg-[#007FFF] rounded-lg">
                <div class="my-2 ml-2">
                    <span class="text-[#FFF] text-base font-medium leading-7">View more</span>
                </div>
            </button>
        </div>
    </div>
</template>
<script lang="ts">
export default defineComponent({
    name: 'BannerCard',
});
</script>
<style scoped lang="scss">
.linear-gradient {
    background: linear-gradient(#5669d2, #5746bbeb, #7f2c9c);
}
</style>
