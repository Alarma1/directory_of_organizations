<template>
    <div class="pagination">
        <ButtonComp @btnClick="buttonClick(currentPage - 1)" class="pagination__button"
                    :disButton="currentPage === 1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="pagination__svg">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
            </svg>
        </ButtonComp>
        <div class="pagination__pages">
            <p class="pagination__pages-text">Страница {{currentPage}}</p>
        </div>
        <ButtonComp @btnClick="buttonClick(currentPage + 1)" class="pagination__button"
                    :disButton="currentPage === countPage">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="pagination__svg">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
            </svg>
        </ButtonComp>
    </div>
</template>

<script setup>
    import ButtonComp from "../components/ButtonComp.vue"
    import {ref} from "vue"

    const props = defineProps({
        countPage: Number,
    })
    const emit = defineEmits(['changePage'])
    const currentPage = ref(1)
    const buttonClick = (page) => {
        currentPage.value = page
        emit('changePage', page)
    }
</script>

<style scoped lang="scss">
    .pagination {
        display: flex;
        justify-content: end;
        gap: 5px;

        &__button {
            display: flex;
            align-items: center;
            width: 22px;
            padding: 0;
            background-color: inherit;
            border: none;
            cursor: pointer;
        }

        &__svg {
            &:active {
                transform: scale(0.75);
            }
        }

        &__pages {
            display: flex;
            align-items: center;

            &-text {
                margin: 0;
            }
        }

    }
</style>
