import {defineStore} from 'pinia'
import {uuid} from 'vue-uuid';


export const useCounterStore = defineStore('counter', {
    state: () => ({
        data: [
            {id: uuid.v1(), name: "ОАО Газпром", director: "Миллер А. Б.", phone: "+7-495-719-3000"},
            {id: uuid.v1(), name: "ОАО Роснефть", director: "Сечин И. И.", phone: "+7-499-517-8899"},
            {id: uuid.v1(), name: "АО Сбербанк", director: "Греф Г. О.", phone: "+7-495-957-5777"},
            {id: uuid.v1(), name: "ОАО Лукойл", director: "Алекперов В. Ю.", phone: "+7-495-627-4444"},
            {id: uuid.v1(), name: "ОАО Норильский никель", director: "Потанин В. О.", phone: "+7-495-786-8333"},
            {id: uuid.v1(), name: "ОАО Татнефть", director: "Маганов Н. С.", phone: "+7-8553-37-1111"},
            {id: uuid.v1(), name: "АО Северсталь", director: "Мордашов А. А.", phone: "+7-8202-53-8888"},
            {id: uuid.v1(), name: "ОАО Магнит", director: "Галицкий С. Н.", phone: "+7-861-210-9811"},
            {id: uuid.v1(), name: "ООО Яндекс", director: "Бунина Е. И.", phone: "+7-495-739-7000"},
            {id: uuid.v1(), name: "ОАО МТС", director: "Корня А. Ю.", phone: "+7-495-766-0166"},
            {id: uuid.v1(), name: "ОАО Газпром нефть", director: "Дюков А. В.", phone: "+7-812-449-7111"},
            {id: uuid.v1(), name: "ОАО Аэрофлот", director: "Полубояринов М. И.", phone: "+7-495-752-9001"},
            {id: uuid.v1(), name: "ООО X5 Retail Group", director: "Шехтерман И. А.", phone: "+7-495-502-9783"},
            {id: uuid.v1(), name: "ОАО Полюс Золото", director: "Грачев П. Н.", phone: "+7-495-641-3300"},
            {id: uuid.v1(), name: "ОАО РЖД", director: "Белозёров О. В.", phone: "+7-495-262-1000"},
            {id: uuid.v1(), name: "ОАО РусГидро", director: "Хмарин В. И.", phone: "+7-495-225-3232"},
            {id: uuid.v1(), name: "ОАО Транснефть", director: "Токарев Н. П.", phone: "+7-495-950-8100"},
            {id: uuid.v1(), name: "ОАО Сургутнефтегаз", director: "Богданов В. Л.", phone: "+7-3462-52-2222"},
            {id: uuid.v1(), name: "АО Ростелеком", director: "Осеевский М. А.", phone: "+7-800-100-0800"},
            {id: uuid.v1(), name: "ОАО Русал", director: "Никитин Е. И.", phone: "+7-495-720-5170"},
            {id: uuid.v1(), name: "ООО Лента", director: "Сенькин В. Н.", phone: "+7-812-363-3000"},
            {id: uuid.v1(), name: "ОАО Мегафон", director: "Петров Г. Н.", phone: "+7-495-980-9000"},
            {id: uuid.v1(), name: "ОАО ФосАгро", director: "Гурьев А. А.", phone: "+7-495-231-2747"},
            {id: uuid.v1(), name: "ОАО НЛМК", director: "Фёдоров Г. В.", phone: "+7-4742-44-4444"},
            {id: uuid.v1(), name: "ОАО Мосэнерго", director: "Яковлев В. Н.", phone: "+7-495-957-1668"},
            {id: uuid.v1(), name: "ОАО Уралкалий", director: "Осипов Д. С.", phone: "+7-342-419-6600"},
            {id: uuid.v1(), name: "ОАО ТМК", director: "Пумпянский Д. В.", phone: "+7-495-775-7600"},
            {id: uuid.v1(), name: "АО Алроса", director: "Иванов С. А.", phone: "+7-495-620-9250"},
            {id: uuid.v1(), name: "ОАО Россети", director: "Рюмин А. А.", phone: "+7-495-995-5333"},
            {id: uuid.v1(), name: "ОАО Сибур", director: "Конов Д. А.", phone: "+7-495-777-5555"},
            {id: uuid.v1(), name: "АО Северсталь", director: "Мордашов А. А.", phone: "+7-8202-53-8888"},
            {id: uuid.v1(), name: "ОАО ММК", director: "Шиляев П. И.", phone: "+7-3519-24-2222"},
            {id: uuid.v1(), name: "ОАО ЛУКОЙЛ", director: "Алекперов В. Ю.", phone: "+7-495-627-4444"},
            {id: uuid.v1(), name: "ОАО Энел Россия", director: "Маркано С. Г.", phone: "+7-495-981-2141"},
            {id: uuid.v1(), name: "ОАО Юнипро", director: "Широков М. Н.", phone: "+7-495-981-2310"},
            {id: uuid.v1(), name: "ОАО Мосэнергосбыт", director: "Сорокин П. И.", phone: "+7-495-981-9800"},
            {id: uuid.v1(), name: "ОАО Энел Россия", director: "Маркано С. Г.", phone: "+7-495-981-2141"},
            {id: uuid.v1(), name: "ОАО Юнипро", director: "Широков М. Н.", phone: "+7-495-981-2310"},
            {id: uuid.v1(), name: "ОАО Мосэнергосбыт", director: "Сорокин П. И.", phone: "+7-495-981-9800"},
            {id: uuid.v1(), name: "ОАО Мегафон", director: "Петров Г. Н.", phone: "+7-495-980-9000"}
        ]
    }),
    actions: {
        deleteItem(id) {
            this.data = this.data.filter(item => (item.id !== id));
        },
        addItem(obj) {
            this.data.push({...obj, id: uuid.v1(),})
        }
    }
})
