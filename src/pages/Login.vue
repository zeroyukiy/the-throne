<script setup>
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { useUserStore } from '@/store/user';

const router = useRouter()

const userStore = useUserStore()

const formState = reactive({
    username: '',
    password: '',
    // remember: true,
});
const onFinish = async values => {
    console.log('Success:', values);
    // fetch /api/auth/login
    const login = await fetch("http://localhost:8000/login", {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
            username: formState.username,
            password: formState.password,
        })
    })
    if (login.ok) {
        const { user } = await login.json()
        console.log(user)
        if (user !== "") {
            userStore.init(user)
            // localStorage.setItem("user", token)
            // window.location.href = "/"
            router.push("/")
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
        <div class="login" v-if="!userStore.is_auth">
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
    /* background-color: antiquewhite; */
    background-color: rgba(224, 224, 224, .4);
    padding: 1em;
    border-radius: .6em;
    box-shadow: 0 2px 2px 1px rgba(0, 0, 0, .1);
}
</style>