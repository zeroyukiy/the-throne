import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useChatStore = defineStore("chat", () => {
    const id = ref("")
    const name = ref("")
    const slug = ref("")
    const description = ref("")
    const messages = ref([])

    const userProfiles = reactive([])

    const addMessage = (message) => {
        messages.value.push(message)
    }

    return { id, name, slug, description, messages, userProfiles, addMessage };
});
