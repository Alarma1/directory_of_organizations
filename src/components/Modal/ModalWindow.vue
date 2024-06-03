<template>
    <div class="modal">
        <div class="modal-content">
            <h1 class="modal-header">Добавить организацию</h1>
            <div class="modal-body">
                <div class="modal__contain-input">
                    <InputComp v-model="name" inputType="text"
                               placeholderText="Название"
                               class="modal__input"/>
                </div>
                <div class="modal__contain-input">
                    <InputComp v-model="phone" inputType="tel"
                               placeholderText="Номер телефона"
                               class="modal__input"/>
                </div>
                <div class="modal__contain-input">
                    <InputComp v-model="director" inputType="tel"
                               placeholderText="ФИО Директора"
                               class="modal__input"/>
                </div>
            </div>
            <div class="modal-buttons">
                <div class="modal-buttons__cancel">
                    <ButtonComp @btnClick="cancel"
                                titleText="Отмена"/>
                </div>
                <div :class="{'modal-buttons__ok-disabled':disabledButton}" class="modal-buttons__ok">
                    <ButtonComp @btnClick="confirm" titleText="ОK" :disButton="disabledButton"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import ButtonComp from "../ButtonComp.vue"
    import InputComp from "../InputComp.vue"
    import {useAddOrg} from "./useAddOrg.js"
    import {computed} from "vue";

    const {name, phone, director} = useAddOrg()
    const disabledButton = computed(() => (name.value === '') || (director.value === '') || (phone.value === ''))
    const emit = defineEmits(['cancel', 'confirm'])
    const cancel = () => {
        emit('cancel')
    }
    const confirm = () => {
        console.log(disabledButton, name, director, phone)
        emit('confirm')
    }
</script>

<style scoped lang="scss">
    @import "./src/assets/main.scss";

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
            border: 2px solid $grey-color;
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
            border-top: 2px solid $grey-color;
            border-bottom: 2px solid $grey-color;
        }

        &__contain-input:not(:last-child) {
            margin-bottom: 10px;
        }

        &__input {
            width: 100%;
            padding: 15px;
            border: 2px solid $input-border-color;
            box-sizing: border-box;
        }

        .modal-buttons {
            height: 35px;
            display: flex;
            justify-content: space-between;
            padding: 10px 20px;

            &__cancel {
                width: 75px;
                margin: 0 5px;
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
                width: 50px;
                margin: 0 5px;
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

                &:active {
                    transform: none;
                }
            }
        }
    }
</style>
