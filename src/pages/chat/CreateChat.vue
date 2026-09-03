<script setup>
import { Textarea, Select } from 'ant-design-vue';
import { reactive, ref } from 'vue';

// const formRef = ref()
const form = reactive({
    title: "",
    description: "",
    tags: ["free-role"],
})

const options = ref([
    { value: "pve" },
    { value: "free-role" },
    { value: "pvp" },
    { value: "esplorazione" },
    { value: "master" },
    { value: "2x gold" },
    { value: "2x exp" },
])

const handleChange = value => {
    console.log(`selected ${value}`);
};

</script>

<template>
    <div class="content">
        <h1>Crea Nuova Chat</h1>

        <div class="create-chat-form">

            <a-form ref="formRef" :model="form" layout="vertical" name="form_in_modal">
                <a-form-item name="title" label="Titolo" :rules="[{ required: true, message: 'Inserisci in titolo!' }]">
                    <a-input size="large" v-model:value="form.title" />
                </a-form-item>
                <a-form-item name="description" label="Descrizione"
                    :rules="[{ required: true, message: 'Inserisci la descrizione!' }]">
                    <Textarea size="large" v-model:value="form.description"
                        placeholder="breve descrizione, massimo 120 caratteri" maxlength="120" rows="3" />
                </a-form-item>

                <a-form-item name="tags" label="Tags">
                    <Select size="large" v-model:value="form.tags" mode="multiple" style="width: 100%"
                        placeholder="Please select" :options="options" @change="handleChange"></Select>
                </a-form-item>

            </a-form>

        </div>
    </div>
</template>

<style>
.create-chat-form {
    width: 100%;
    max-width: 600px;
    background-color: antiquewhite;
    padding: 1em;
    border-radius: .3em;
    margin: .5em 0;
}
</style>