<script setup>
import { useRouter } from 'vue-router';
import { setWebsocket } from '@/ws';
import { reactive } from 'vue';
import { auth } from '@/auth.vue';

const router = useRouter()

const formState = reactive({
    username: '',
    password: '',
    // remember: true,
});
const onFinish = async values => {
    console.log('Success:', values);
    // fetch /api/login
    const login = await fetch("/api/login", {
        headers: {
            "Content-Type": "application/json"
        },
        mode: 'cors',
        method: "post",
        body: JSON.stringify(values)
    })
    if (login.ok) {
        const json = await login.json()
        console.log(json)
        const { token } = json
        if (token !== "") {
            auth.value.user = "pippo"
            localStorage.setItem("user", token)
            router.push("/profile").then(() => {
                setWebsocket()
                // return window.location.reload()
            })
        }
    }
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

</script>

<template>

    <div class="content">
        <h1>Login</h1>
        <div class="login" v-if="!auth.user">
            <a-form class="login-form" layout="vertical" :model="formState" name="basic" style="width: 300px"
                autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                <a-form-item label="Username" name="username"
                    :rules="[{ required: true, message: 'Please input your username!' }]">
                    <a-input v-model:value="formState.username" size="large" />
                </a-form-item>

                <a-form-item label="Password" name="password"
                    :rules="[{ required: true, message: 'Please input your password!' }]">
                    <a-input-password v-model:value="formState.password" size="large" />
                </a-form-item>

                <a-form-item name="remember">
                    <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                </a-form-item>

                <a-form-item>
                    <a-button type="primary" html-type="submit">Login</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>

</template>

<style scoped>
.login {
    width: 100%;
    display: flex;
    /* justify-content: center; */
    padding: 1em 0;
}

.login-form {
    width: 300px;
    background-color: antiquewhite;
    padding: 1em;
    border-radius: .6em;
}
</style>