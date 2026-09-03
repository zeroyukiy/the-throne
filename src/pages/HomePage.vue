<script setup>
import { ref, onMounted } from 'vue';
import { Button, Card, notification } from 'ant-design-vue';
import { useUserStore } from '@/store/user';
import gsap from 'gsap';

const userStore = useUserStore()

const cards = ref([{
  img: '/src/assets/avatars/dani.png'
}, {
  img: '/src/assets/avatars/Game-of-Thrones_Jorah-921007776.jpg'
}, {
  img: '/src/assets/avatars/tyrion.png'
}, {
  img: '/src/assets/avatars/tyrion.png'
},

])

const toggle = ref(false)

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

const tl = gsap.timeline().pause()

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

  // tl.from('.ant-card', { x: 0, y: 0, stagger: { each: .1, from: 'start' } })
  // tl.fromTo('.ant-card#card_0', { x: 0, y: -10, duration: .1, ease: 'power4.in' }, { x: -90, y: 20, rotation: -45, duration: .2, ease: 'power4.out' })
  //   .fromTo('.ant-card#card_1', { x: -180, y: 0, duration: .1, ease: 'power4.in' }, { x: -180, y: 0, rotation: 0, duration: .2, ease: 'power4.out' }, '-=.2')
  //   .fromTo('.ant-card#card_2', { x: -360, y: 10, duration: .1, ease: 'power4.in' }, { x: -270, y: 20, rotation: 45, duration: .2, ease: 'power4.out' }, '-=.2')
  tl.fromTo('.card#card_0', { x: 0, y: -5, duration: .1, ease: 'power4.in' }, { x: -90, y: 20, rotation: -20, duration: .2, ease: 'power4.out' })
    .fromTo('.card#card_1', { x: -180, y: 0, duration: .1, ease: 'power4.in' }, { x: -180, y: 10, rotation: -10, duration: .2, ease: 'power4.out' }, '-=.2')
    .fromTo('.card#card_2', { x: -360, y: 5, duration: .1, ease: 'power4.in' }, { x: -270, y: 20, rotation: 10, duration: .2, ease: 'power4.out' }, '-=.2')
    .fromTo('.card#card_3', { x: -540, y: 10, duration: .1, ease: 'power4.in' }, { x: -360, y: 30, rotation: 20, duration: .2, ease: 'power4.out' }, '-=.2')


})

const showCards = () => {
  if (!toggle.value) {
    tl.play()
  } else {
    tl.reverse()
  }
  toggle.value = !toggle.value
}

</script>

<template>
  <div class="content">
    <h1>Home</h1>
    <Button type="primary" @click="openNotification">Clicca qui</Button>

    <div v-show="userStore.is_auth">Authenticated as: {{ userStore.username }}</div>

    <div class="cards">
      <div class="card" :id="`card_${index}`" :key="index" @click="showCards"
        style="width: 180px; height: 200px; border: 1px solid; border-radius: .8em;"
        :style="`background: url(${card.img}) no-repeat top center / cover`" v-for="(card, index) in cards"></div>
    </div>

  </div>
</template>

<style scoped>
.cards {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 1em;
}

.card {
  width: 180px;
  height: 200px;
  margin-right: 5px;
  box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
</style>