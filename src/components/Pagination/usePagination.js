import {ref} from "vue";

const currentPage = ref(1)

export const usePagination = () => {
    const changePage = (page) => {
        return  currentPage.value = page
    }
    return {currentPage,changePage}
}
