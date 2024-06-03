<template>
    <table class="table">
        <thead class="table__head">
        <tr class="table__row">
            <th v-for="(item,index) in head" :key="index" class="table__cell">
                <div v-if="item.sort" @click="sortElements(item.name)" class="table__cell-sort">
                    <span class="table__cell-text">{{ item.title }}</span>
                    <div class="table__cell-box-svg">
                        <IconSort v-if="columnSortName === item.name" :orderDigit="ascendingOrder"/>
                    </div>
                </div>
                <div v-if="!item.sort">
                    <span class="table__cell-text">{{ item.title }}</span>
                </div>
            </th>
        </tr>
        </thead>
        <tbody class="table__body">
        <slot name="table-items">
            <tr v-for="(item,index) in filteredItemsView" :key="`${index}_item`">
                <td class="table__cell-td table__cell-name">{{ item.name }}</td>
                <td class="table__cell-td table__cell-director">{{ item.director }}</td>
                <td class="table__cell-td table__cell-phone">{{ item.phone }}</td>
                <td class="table__cell-td table__cell-button">
                    <div class="table__cell-box">
                        <ButtonComp @btnClick="deleteItem(item)"
                                    class="table__delete-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke-width="1.5"
                                 stroke="currentColor" class="table__cell-button-svg">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                            </svg>
                        </ButtonComp>
                    </div>
                </td>
            </tr>
        </slot>
        </tbody>
    </table>
</template>

<script setup>
    import ButtonComp from "../ButtonComp.vue"
    import IconSort from "../IconSort.vue"
    import {useTable} from "./useTable.js"

    const {filteredItemsView, columnSortName, ascendingOrder, head} = useTable()
    const emit = defineEmits(['sortElements', 'deleteItem'])
    const sortElements = (id) => {
        emit('sortElements', id)
    }
    const deleteItem = (item) => {
        emit('deleteItem', item)
    }
</script>

<style scoped lang="scss">
    @import "./src/assets/main.scss";

    .table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;

        th,
        td {
            border: 2px solid $grey-color;
        }

        &__cell {
            color: grey;
            transition: background-color 0.3s, transform 0.05s;

            &-td {
                padding: 10px;
            }

            &-sort {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px;

                &:hover {
                    cursor: pointer;
                    background: $hover-bg-color;
                }
            }

            &-box-svg {
                width: 16px;
                height: 16px;
            }

            &-text {
                transition: none;
            }

            &-column-btn {
                width: 45px;
                height: 20px;
            }

            &-button {
                width: 20px;
                height: 20px;
                transition: background-color 0.3s, transform 0.05s;

                &:hover {
                    background-color: $hover-bg-color;
                }

                &-svg {
                    width: 30px;
                    height: 20px;

                    &:active {
                        transform: scale(0.95);
                    }
                }
            }

            &-box {
                margin: auto;
                width: 20px;
                height: 20px;

            }

            &-name {
                width: 35%;
            }

            &-director {
                width: 35%;
            }

            &-phone {
                text-align: end;
            }
        }

        &__delete-button {
            display: flex;
            align-items: center;
            justify-content: center;

            transform: scale(0.95);

            .delete-button__svg {
                width: 20px;
                height: 20px;
            }

            &:hover {
                background-color: inherit;
                border-radius: 15px;
                border: 1px solid $black-color;
            }
        }
    }
</style>
