import {ref} from "vue";

const head = ref([])
const filteredItemsView = ref([])
const ascendingOrder = ref(2)
const columnSortName = ref('')

export const useTable = () => {
    const changeAscendingOrder = (title) => {
        if (columnSortName.value !== title && columnSortName.value !== '') {
            ascendingOrder.value = 0
        } else {
            ascendingOrder.value = ascendingOrder.value < 2 ? ascendingOrder.value + 1 : 0
        }
    }
    return {filteredItemsView, ascendingOrder, columnSortName, head, changeAscendingOrder}
}
