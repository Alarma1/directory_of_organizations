<template>
    <input v-model="inputValue" :type="inputType" :placeholder="placeholderText"
           class="default-style"/>
</template>

<script setup>
    const props = defineProps({
        placeholderText: String,
        inputType: String,
    })
    const inputValue = defineModel()
</script>

<style scoped lang="scss">
    @import "./src/assets/main.scss";

    .default-style {
        padding: 10px;
        border: 2px solid $grey-color;
    }
</style>
