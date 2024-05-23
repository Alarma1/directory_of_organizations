import {defineStore} from 'pinia'

export const useCounterStore = defineStore('counter', {
    state: () => ({
        data: [
            {id: 1, name: 'Газпром', director: 'Алексей Миллер', phone: '495-719-3000'},
            {id: 2, name: 'Роснефть', director: 'Игорь Сечин', phone: '499-517-8899'},
            {id: 3, name: 'Сбербанк', director: 'Герман Греф', phone: '495-957-5777'},
            {id: 4, name: 'Лукойл', director: 'Вагит Алекперов', phone: '495-627-4444'},
            {id: 5, name: 'Норильский никель', director: 'Владимир Потанин', phone: '495-786-8333'},
            {id: 6, name: 'Татнефть', director: 'Наиль Маганов', phone: '8553-37-1111'},
            {id: 7, name: 'Северсталь', director: 'Алексей Мордашов', phone: '8202-53-8888'},
            {id: 8, name: 'Магнит', director: 'Сергей Галицкий', phone: '861-210-9811'},
            {id: 9, name: 'Яндекс', director: 'Елена Бунина', phone: '495-739-7000'},
            {id: 10, name: 'МТС', director: 'Алексей Корня', phone: '495-766-0166'},
            {id: 11, name: 'Газпром нефть', director: 'Александр Дюков', phone: '812-449-7111'},
            {id: 12, name: 'Аэрофлот', director: 'Михаил Полубояринов', phone: '495-752-9001'},
            {id: 13, name: 'X5 Retail Group', director: 'Игорь Шехтерман', phone: '495-502-9783'},
            {id: 14, name: 'Полюс Золото', director: 'Павел Грачев', phone: '495-641-3300'},
            {id: 15, name: 'РЖД', director: 'Олег Белозёров', phone: '495-262-1000'},
            {id: 16, name: 'РусГидро', director: 'Виктор Хмарин', phone: '495-225-3232'},
            {id: 17, name: 'Транснефть', director: 'Николай Токарев', phone: '495-950-8100'},
            {id: 18, name: 'Сургутнефтегаз', director: 'Владимир Богданов', phone: '3462-52-2222'},
            {id: 19, name: 'Ростелеком', director: 'Михаил Осеевский', phone: '800-100-0800'},
            {id: 20, name: 'Русал', director: 'Евгений Никитин', phone: '495-720-5170'},
            {id: 21, name: 'Лента', director: 'Владимир Сенькин', phone: '812-363-3000'},
            {id: 22, name: 'Мегафон', director: 'Георгий Петров', phone: '495-980-9000'},
            {id: 23, name: 'ФосАгро', director: 'Андрей Гурьев', phone: '495-231-2747'},
            {id: 24, name: 'НЛМК', director: 'Григорий Фёдоров', phone: '4742-44-4444'},
            {id: 25, name: 'Мосэнерго', director: 'Виталий Яковлев', phone: '495-957-1668'},
            {id: 26, name: 'Уралкалий', director: 'Дмитрий Осипов', phone: '342-419-6600'},
            {id: 27, name: 'ТМК', director: 'Дмитрий Пумпянский', phone: '495-775-7600'},
            {id: 28, name: 'Алроса', director: 'Сергей Иванов', phone: '495-620-9250'},
            {id: 29, name: 'Россети', director: 'Андрей Рюмин', phone: '495-995-5333'},
            {id: 30, name: 'Сибур', director: 'Дмитрий Конов', phone: '495-777-5555'},
            {id: 31, name: 'Северсталь', director: 'Алексей Мордашов', phone: '8202-53-8888'},
            {id: 32, name: 'ММК', director: 'Павел Шиляев', phone: '3519-24-2222'},
            {id: 33, name: 'ЛУКОЙЛ', director: 'Вагит Алекперов', phone: '495-627-4444'},
            {id: 34, name: 'Энел Россия', director: 'Стефано Маркано', phone: '495-981-2141'},
            {id: 35, name: 'Юнипро', director: 'Максим Широков', phone: '495-981-2310'},
            {id: 36, name: 'Мосэнергосбыт', director: 'Пётр Сорокин', phone: '495-981-9800'},
            {id: 37, name: 'Энел Россия', director: 'Стефано Маркано', phone: '495-981-2141'},
            {id: 38, name: 'Юнипро', director: 'Максим Широков', phone: '495-981-2310'},
            {id: 39, name: 'Мосэнергосбыт', director: 'Пётр Сорокин', phone: '495-981-9800'},
            {id: 40, name: 'Мегафон', director: 'Георгий Петров', phone: '495-980-9000'},
        ],
    }),
    actions: {
        deleteItem(id) {
            this.data = this.data.filter(item => (item.id !== id));
            console.log(this.data)
        },
    }
})
