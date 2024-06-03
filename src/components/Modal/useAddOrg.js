import {ref} from "vue";

const name = ref('');
const phone = ref('');
const director = ref('');

export const useAddOrg = () => {
    return {name, phone, director}
}
