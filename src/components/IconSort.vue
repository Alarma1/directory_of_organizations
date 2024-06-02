<template>
    <button @click="fff">fff</button>
    <div class="box__icon">
        <span class="box__icon-title">{{ titleText }}</span>
        <svg v-if="orderDigit !== 2 && checkName === 'name'"
             xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24"
             stroke-width="1.5" stroke="grey" class="box__icon-svg"
             :class="{'box__icon-svg-rotate':orderDigit === 1 && checkName === 'name'}">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"/>
        </svg>
    </div>
</template>

<script setup>
    const props = defineProps({
        titleText: String,
        checkName: String,
        orderDigit: Number,
    })
    const fff=() => {
        console.log(props.checkName)
    }
</script>

<style scoped lang="scss">
    .box__icon {
        display: flex;
        align-items: center;

        &-title {
            color: grey;
        }

        &-svg {
            width: 1rem;
            height: 1rem;
            margin-left: 5px;
            transition: transform 0.5s;
        }

        &-svg-rotate {
            transition: transform 0.5s;
            transform: rotate(180deg);
        }
    }
</style>
