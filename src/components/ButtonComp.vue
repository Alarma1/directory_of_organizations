<template>
    <button @click="buttonClick" :disabled="disButton"
            :class="{'ok-disabled':disButton}" class="default-style"> {{titleText}}
        <slot></slot>
    </button>
</template>

<script setup>
    const props = defineProps({
        titleText: String,
        disButton: Boolean,
    })
    const emit = defineEmits(['btnClick'])
    const buttonClick = () => {
        emit('btnClick')
    }
</script>

<style scoped lang="scss">
    @import "./src/assets/main.scss";

    button {
        width: 100%;
        height: 100%;
        border: none;
        padding: 0;
        cursor: pointer;
        background: none;

        &:active {
            transform: scale(0.95);
        }
    }

    .default-style {
        transition: background-color 0.3s, transform 0.3s;

        &:hover {
            background-color: $grey-color;
        }
    }

    .ok-disabled {
        cursor: not-allowed;
        background-color: $grey-color;
        border: 2px solid $grey-color;
        color: gray;

        &:active {
            transform: none;
        }
    }
</style>
