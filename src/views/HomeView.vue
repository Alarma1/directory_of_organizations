<template>
    <div class="main-container">
        <header class="header">
            <InputComp @input="changeCurrentPageInput()"
                       v-model="searchValue" inputType="text"
                       placeholderText="Найти по ФИО"
                       class="header__search-input"/>
            <div class="header__add-box">
                <ButtonComp @btnClick="addItem" titleText="Добавить"
                            class="header__add-button"/>
            </div>
        </header>
        <main class="body">
            <section>
                <TableComp @sortElements="sortElements($event)" @deleteItem="deleteItem($event)">
                    <template v-slot:table-items>
                    </template>
                </TableComp>
                <PaginationComp :countPage="countPage" @changePage="changeCurrentPage"/>
            </section>
            <section>
                <ModalWindow @cancel="cancel" @confirm="confirm" v-if="showModal"/>
            </section>
        </main>
    </div>
</template>
<script setup>
    import {ref, onMounted, computed} from "vue"
    import {useCounterStore} from "../stores/counter.js"
    import ButtonComp from "../components/ButtonComp.vue"
    import IconSort from "../components/IconSort.vue"
    import PaginationComp from "../components/Pagination/PaginationComp.vue"
    import InputComp from "../components/InputComp.vue"
    import ModalWindow from "../components/Modal/ModalWindow.vue"
    import TableComp from "../components/Table/TableComp.vue"
    import {useAddOrg} from "../components/Modal/useAddOrg.js"
    import {usePagination} from "../components/Pagination/usePagination.js"
    import {useTable} from "../components/Table/useTable.js"


    const store = useCounterStore()
    const filteredItems = ref(store.data)
    const {name, phone, director} = useAddOrg()
    const {currentPage} = usePagination()
    const {filteredItemsView, ascendingOrder, columnSortName, head, changeAscendingOrder} = useTable()
    const searchValue = ref('')
    let defaultData = []
    const countPage = computed(() => Math.ceil(filteredItems.value.length / 5))
    const showModal = ref(false);

    head.value = [
        {title: 'Название', name: 'name', sort: true},
        {title: 'ФИО директоров', name: 'fio', sort: true},
        {title: 'Номер телефона', name: 'phone', sort: false},
        {title: '', name: '', sort: false}]

    const searchItems = () => {
        columnSortName.value = ''
        ascendingOrder.value = 2
        if (searchValue.value === '') {
            filteredItems.value = store.data
            return
        }
        const searchTerm = searchValue.value.toLowerCase();
        filteredItems.value = store.data.filter(item => {
            return item.director.toLowerCase().includes(searchTerm);
        });
    }
    const sortElements = (title) => {
        changeAscendingOrder(title)

        columnSortName.value = title
        if (ascendingOrder.value === 0) {
            defaultData = [...filteredItems.value]
        }
        if (ascendingOrder.value === 2) {
            columnSortName.value = ''
            filteredItems.value = defaultData
        }
        if (columnSortName.value === 'name') {
            if (ascendingOrder.value === 0) {
                filteredItemsView.value = filteredItems.value.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                })
            }
            if (ascendingOrder.value === 1) {

                filteredItemsView.value = filteredItems.value.sort((a, b) => {
                    return b.name.localeCompare(a.name);
                })
            }
        }
        if (columnSortName.value === 'fio') {
            if (ascendingOrder.value === 0) {
                filteredItemsView.value = filteredItems.value.sort((a, b) => {
                    return a.director.localeCompare(b.director);
                })
            }
            if (ascendingOrder.value === 1) {
                filteredItemsView.value = filteredItems.value.sort((a, b) => {
                    return b.director.localeCompare(a.director);
                })
            }
        }
        showPage()
    }
    const deleteItem = (item) => {
        store.deleteItem(item.id)
        filteredItems.value = store.data
        searchItems()
        showPage()
    }
    const showPage = () => {
        const end = currentPage.value * 5
        const start = end - 5
        filteredItemsView.value = filteredItems.value.slice(start, end)
    }
    const changeCurrentPage = () => {
        showPage()
    }
    const changeCurrentPageInput = () => {
        searchItems()
        changeCurrentPage(1)
    }
    const addItem = () => {
        showModal.value = !showModal.value
    }
    const cancel = () => {
        showModal.value = false;
        name.value = ''
        director.value = ''
        phone.value = ''
    };
    const confirm = () => {
        showModal.value = false;
        store.addItem({name: name.value, director: director.value, phone: phone.value})
        name.value = ''
        director.value = ''
        phone.value = ''
        showPage()
    };
    onMounted(() => changeCurrentPage(1))
</script>

<style scoped lang="scss">
    @import "./src/assets/main.scss";
    .main-container {
        display: flex;
        flex-direction: column;
        padding: 20px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 20px;

        &__search-input {
            width: 200px;
        }

        &__add-box {
            width: 100px;
        }

        &__add-button {
            border: 2px solid $black-color;
            transition: transform 0.05s;
        }
    }

    .body {
        width: 100%;
    }
</style>
