<template>
    <div class="main-container">
        <header class="header">
            <input @input="changeCurrentPageInput()" type="text" v-model="inputValue" placeholder="Найти по ФИО"
                   class="header__search-input"/>
            <button @click="addItem" class="header__add-button">Добавить</button>
        </header>
        <main class="body">
            <section>
                <table class="table">
                    <thead class="table__head">
                    <tr class="table__row">
                        <th @click="sortElements('name')" class="table__cell table__cell--sortable">
                            <div class="table__cell-content">
                                <span class="table__cell-text">Название</span>
                                <svg v-if="ascendingOrder !== 2 && columnName === 'name'"
                                     xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="grey" class="table__cell-icon"
                                     :class="{'table__cell-icon-rotate':ascendingOrder === 1 && columnName === 'name'}">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"/>
                                </svg>
                            </div>
                        </th>
                        <th @click="sortElements('fio')" class="table__cell table__cell--sortable">
                            <div class="table__cell-content">
                                <span class="table__cell-text">ФИО директоров</span>
                                <svg v-if="ascendingOrder !== 2 && columnName === 'fio'"
                                     xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="grey" class="table__cell-icon"
                                     :class="{'table__cell-icon-rotate':ascendingOrder === 1 && columnName === 'fio'}">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"/>
                                </svg>
                            </div>
                        </th>
                        <th class="table__cell-text">Номер телефона</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody class="table__body">
                    <tr v-for="item in filteredItemsView" :key="item.id">
                        <td class="table__cell-name">{{ item.name }}</td>
                        <td class="table__cell-director">{{ item.director }}</td>
                        <td>{{ item.phone }}</td>
                        <td class="table__cell table__cell-button">
                            <button @click="deleteItem(item.id)" class="table__delete-button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="pagination">
                    <button @click="changeCurrentPage(currentPage - 1)" :disabled="currentPage === 1"
                            class="pagination__button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                        </svg>
                    </button>
                    <div><p style="color: grey">Страница {{currentPage}}</p></div>
                    <button @click="changeCurrentPage(currentPage + 1)" :disabled="currentPage === countPage"
                            class="pagination__button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                        </svg>
                    </button>
                </div>
            </section>
            <section>
                <div class="modal" v-if="showModal">
                    <div class="modal-content">
                        <h1 class="modal-header">Добавить организацию</h1>
                        <div class="modal-body">
                            <div class="modal__contain-input">
                                <input type="text" id="name" v-model="name" placeholder="Название"
                                       class="modal__input">
                            </div>
                            <div class="modal__contain-input">
                                <input type="tel" id="phone" v-model="phone" placeholder="Номер телефона"
                                       class="modal__input">
                            </div>
                            <div class="modal__contain-input">
                                <input type="text" id="director" v-model="director" placeholder="ФИО Директора"
                                       class="modal__input">
                            </div>
                        </div>
                        <div class="modal-buttons">
                            <button @click="cancel" class="modal-buttons__cancel">Отмена</button>
                            <button @click="confirm"
                                    :disabled="disabledButton"
                                    :class="{'modal-buttons__ok-disabled':disabledButton}"
                                    class="modal-buttons__ok">ОK
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
<script setup>
    import {ref, onMounted, computed} from "vue"
    import {useCounterStore} from "../stores/counter.js"

    const store = useCounterStore()
    const filteredItems = ref(store.data)
    const filteredItemsView = ref([])
    const currentPage = ref(1)
    const ascendingOrder = ref(2)
    const columnName = ref('')
    const inputValue = ref('')
    let defaultData = []
    const countPage = computed(() => Math.ceil(filteredItems.value.length / 5))
    const showModal = ref(false);
    const name = ref('');
    const phone = ref('');
    const director = ref('');
    const disabledButton = computed(() => (name.value === '') || (director.value === '') || (phone.value === ''))
    const searchItems = () => {
        columnName.value = ''
        ascendingOrder.value = 2
        if (inputValue.value === '') {
            filteredItems.value = store.data
            return
        }
        const searchTerm = inputValue.value.toLowerCase();
        filteredItems.value = store.data.filter(item => {
            return item.director.toLowerCase().includes(searchTerm);
        });
    }
    const sortElements = (title, toggleClick = false) => {
        if (!toggleClick) {
            if (columnName.value !== title && columnName.value !== '') {
                ascendingOrder.value = 0
            } else {
                ascendingOrder.value = ascendingOrder.value < 2 ? ascendingOrder.value + 1 : 0
            }
        }
        columnName.value = title
        if (ascendingOrder.value === 0) {
            defaultData = [...filteredItems.value]
        }
        if (ascendingOrder.value === 2) {
            columnName.value = ''
            filteredItems.value = defaultData
        }
        if (columnName.value === 'name') {
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
        if (columnName.value === 'fio') {
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
    const deleteItem = (id) => {
        store.deleteItem(id)
        filteredItems.value = store.data
        searchItems()
        showPage()
    }
    const showPage = () => {
        const end = currentPage.value * 5
        const start = end - 5
        filteredItemsView.value = filteredItems.value.slice(start, end)
    }
    const changeCurrentPage = (id) => {
        currentPage.value = id
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
        showPage()
    };
    onMounted(() => changeCurrentPage(1))
</script>
<style scoped lang="scss">
    $grey-color: #ccc;
    $black-color: black;
    $hover-bg-color: #d5e6a2;
    $input-border-color: #000000cf;
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
            padding: 10px;
            border: 2px solid $grey-color;
        }

        &__add-button {
            padding: 10px 20px;
            border: 2px solid $black-color;
            background-color: inherit;
            color: $black-color;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.1s;

            &:hover {
                background-color: $grey-color;
            }

            &:active {
                transform: scale(0.95);
            }
        }
    }

    .body {
        width: 100%;

        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;

            th,
            td {
                border: 2px solid $grey-color;
                padding: 10px;
            }

            &__cell {
                cursor: pointer;
                transition: background-color 0.3s, transform 0.1s;

                &:hover {
                    background: $hover-bg-color;
                }

                &-button {
                    width: 20px;
                }

                &-name {
                    width: 35%;
                }

                &-director {
                    width: 35%;
                }

                &-text {
                    color: grey;
                }
            }

            &__delete-button {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                padding: 0;
                background-color: inherit;
                border: none;
                cursor: pointer;

                &:hover {
                    background: $hover-bg-color;
                    border-radius: 10px;
                    border: 1px solid;
                }

                &:active {
                    transform: scale(0.86);
                    border-radius: 10px;
                    border: 1px solid;
                }
            }

            &__cell-content {
                display: flex;
                align-items: center;
            }

            &__cell-icon {
                width: 1rem;
                height: 1rem;
                margin-left: 5px;
                transition: transform 0.5s;
            }

            &__cell-icon-rotate {
                transition: transform 0.5s;
                transform: rotate(180deg);
            }
        }

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

                &--number {
                    cursor: pointer;
                }

                &--active {
                    border: 2px solid $black-color;
                }
            }
        }

        .modal {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);

            .modal-content {
                background-color: #fefefe;
                border: 2px solid #888;
                width: 80%;
                max-width: 400px;
                filter: drop-shadow(5px 5px 50px #757575bd)
            }

            .modal-header {
                padding: 0 20px 0 20px;
                font-size: 30px;
                text-align: center;
                font-weight: bold;
                margin-bottom: 10px;
            }

            .modal-body {
                padding: 20px;
                border-top: 2px solid grey;
                border-bottom: 2px solid grey;
            }

            &__contain-input:not(:last-child) {
                margin-bottom: 10px;
            }

            &__input {
                width: 100%;
                padding: 15px;
                border: 1px solid $input-border-color;
                border-radius: 4px;
                box-sizing: border-box;
            }

            .modal-buttons {
                display: flex;
                justify-content: space-between;
                padding: 10px 20px;

                &__cancel {
                    margin: 0 5px;
                    padding: 8px 16px;
                    cursor: pointer;
                    background-color: inherit;
                    border: 2px solid $input-border-color;
                    transition: background-color 0.3s, transform 0.1s;

                    &:hover {
                        background: $grey-color;
                    }

                    &:active {
                        transform: scale(0.95);
                    }
                }

                &__ok {
                    margin: 0 5px;
                    padding: 8px 16px;
                    border: 2px solid $black-color;
                    cursor: pointer;
                    background-color: inherit;
                    color: $black-color;
                    transition: background-color 0.3s, transform 0.1s;

                    &:hover {
                        background: $grey-color;
                    }

                    &:active {
                        transform: scale(0.95);
                    }
                }

                &__ok-disabled {
                    cursor: not-allowed;
                    background-color: $grey-color;
                    border: 2px solid $grey-color;
                    color: gray;
                }
            }
        }
    }
</style>
