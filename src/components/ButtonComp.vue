<template>
    <button @click="buttonClick" :disabled="disButton"
            :class="{[hoverColor]:true}"> {{titleText}}
        <slot></slot>
    </button>
</template>

<script setup>
    const props = defineProps({
        titleText: String,
        disButton: Boolean,
        hoverColor: String,
    })
    const emit = defineEmits(['btnClick'])
    const buttonClick = () => {
        emit('btnClick')
    }
</script>

<style scoped lang="scss">

    $grey-color: #ccc;
    button {
        width: 100%;
        height: 100%;
        border: none;
        padding: 0;
        cursor: pointer;
        background: none;
        transition: background-color 0.3s, transform 0.3s;

    }

    .addBtn {
        &:hover {
            background-color: #ccc;
        }
    }

    .deleteBtn {
        &:hover {
            border-radius: 15px;
            border: 1px solid black;
        }

    }
</style>
