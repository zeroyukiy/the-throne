<script setup>
import { ref, onMounted } from 'vue';
import { Button, notification } from 'ant-design-vue';

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'I will never close automatically. I will be close automatically. I will never close automatically.',
    duration: 0,
    placement: 'bottomRight',
    // bottom: "100px"
  });
};

const list_avatars = ref([])
onMounted(async () => {
  // if (localStorage.getItem("user")) {
  //   userAuthenticated.value = true
  // }
  // const data = await fetch("/api/avatars", {
  //   method: 'get',
  //   mode: 'cors',
  // })
  // if (data.ok) {
  //   const { avatars } = await data.json()
  //   list_avatars.value = avatars
  // } else {
  //   console.log("error")
  // }
})

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
</style>