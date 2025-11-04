<script setup>
import { ref, onMounted, reactive } from 'vue';
import { Button, notification } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const userAuthenticated = ref(false)

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'I will never close automatically. I will be close automatically. I will never close automatically.',
    duration: 0,
    placement: 'bottomRight',
  });
};

const list_avatars = ref([])
onMounted(async () => {
  if (localStorage.getItem("user")) {
    userAuthenticated.value = true
  }
  const data = await fetch("http://localhost:8000/avatars", {
    method: 'get',
    mode: 'cors',
  })
  if (data.ok) {
    const { avatars } = await data.json()
    list_avatars.value = avatars
  } else {
    console.log("error")
  }
})

const formState = reactive({
  username: '',
  password: '',
  // remember: true,
});
const onFinish = async values => {
  console.log('Success:', values);
  // fetch /api/login
  const login = await fetch("http://localhost:8000/login", {
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
      localStorage.setItem("user", token)
      router.push('/profile')
    }
  }
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

</script>

<template>
  <div class="content">
    <h1>Home</h1>
    <Button type="primary" @click="openNotification">Clicca qui</Button>

    <div class="avatars">
      <div v-for="avatar in list_avatars">
        <img :src="'http://localhost:8000/assets/avatars/' + avatar" width="80" height="80" alt="">
      </div>
    </div>


    <div class="login" v-if="!userAuthenticated">
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

    <!-- <img class="custom-img" src="../assets/avatar_resident_darkelve_woman_02.png" width="80" height="80" alt="">
        <img class="custom-img" src="../assets/avatar_resident_human_woman_01.png" width="80" height="80" alt="">
        <img src="../assets/sticker_warrior_human_girl_01.png" width="80" height="80" alt=""> -->
  </div>
</template>

<style scoped>
.avatars {
  /* width: 800px; */
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 1em;
}

.avatars img {
  margin: .5em .5em 0 0;
}

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