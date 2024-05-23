<template>
    <div class="main-container">
        <header class="header">
            <input @input="searchProduct($event)" type="text" placeholder="Найти по ФИО"
                   class="header__search-input"/>
            <button @click="addItem" class="header__add-button">Добавить</button>
        </header>
        <main class="body">
            <table class="table">
                <thead class="table__head">
                <tr>
                    <th>Название</th>
                    <th>ФИО директоров</th>
                    <th>Номер телефона</th>
                    <th></th>
                </tr>
                </thead>
                <tbody class="table__body">
                <tr v-for="item in filteredItemsView" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.director }}</td>
                    <td>{{ item.phone }}</td>
                    <td class="table__cell" WIDTH="20px">
                        <button @click="deleteItem(item.id)" class="table__delete-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="pagination">
                <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="pagination__button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                    </svg>
                </button>
                <button v-for="(page, index) in countPage" :key="index" @click="changePage(index + 1)"
                        :class="{'pagination__button--active':currentPage === (index + 1)}"
                        class="pagination__button--number"
                >{{ page }}
                </button>
                <button @click="changePage(currentPage + 1)" :disabled="currentPage === countPage"
                        class="pagination__button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                    </svg>
                </button>
            </div>
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
    const countPage = computed(() => Math.ceil(filteredItems.value.length / 5))
    const searchProduct = ((event) => {
        if (event === '') {
            filteredItems.value = store.data
            changePage(1)
            return
        }
        const searchTerm = event.target.value.toLowerCase();
        filteredItems.value = store.data.filter(item => {
            return item.director.toLowerCase().includes(searchTerm);
        });
        changePage(1)
    })
    const deleteItem = (id) => {
        store.deleteItem(id)
        filteredItems.value = store.data
        changePage(currentPage.value)
    }
    const changePage = (page) => {
        console.log(page)
        currentPage.value = page
        const end = currentPage.value * 5
        const start = end - 5
        console.log(start, end)
        filteredItemsView.value = filteredItems.value.slice(start, end)
    }
    onMounted(() => changePage(1))
</script>
<style scoped lang="scss">
    .main-container {
        display: flex;
        flex-direction: column;
        padding: 20px;
    }

    .red {
        color: red;
    }

    .header {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;

        &__search-input {
            width: 200px;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }

        &__add-button {
            padding: 10px 20px;
            border-radius: 5px;
            border: none;
            background-color: #007bff;
            color: white;
            cursor: pointer;
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
                border: 1px solid #ccc;
                padding: 10px;
                text-align: left;
            }

            &__delete-button {
                display: flex;
                align-items: center;
                width: 22px;
                padding: 0;
                background-color: inherit;
                border: none;
                cursor: pointer;
            }
        }

        .pagination {
            display: flex;
            justify-content: center;
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
                    border: 2px solid black;
                }
            }
        }
    }
</style>
