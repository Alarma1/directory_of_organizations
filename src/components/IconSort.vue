<template>
    <svg v-if="orderDigit !== 2"
         xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24"
         stroke-width="1.5" stroke="grey" class="box__icon-svg"
         :class="{'box__icon-svg-rotate':orderDigit === 1}">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"/>
    </svg>
</template>

<script setup>
    const props = defineProps({
        orderDigit: Number,
    })
</script>

<style scoped lang="scss">
    .box__icon-svg {
        width: 100%;
        height: 100%;
        margin-left: 5px;
        transition: transform 0.5s;

        &-rotate {
            transition: transform 0.5s;
            transform: rotate(180deg);
        }
    }


</style>
