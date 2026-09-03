<script setup>
import Sidebar from './components/Sidebar.vue';
import { MenuOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import { CrownOutlined } from '@ant-design/icons-vue'
import { useUserStore } from './store/user.js';
import { Avatar } from 'ant-design-vue';
// import { gsap } from 'gsap';
import { EventType } from './helpers/event_types.js';

const sidebar = ref(false)
const openMenu = () => {
  sidebar.value = !sidebar.value

  if (sidebar.value === true) {
    document.querySelector("body").classList.add("overlay")
  } else {
    document.querySelector("body").classList.remove("overlay")
  }
}

const userStore = useUserStore()

onMounted(() => {
  // const tl = gsap.timeline()
  // tl.from('.logo', { x: 300, duration: 1, ease: 'power4.in' })
  //   .to('.logo', { x: 20, duration: .5, ease: 'power4.in' })
  //   .to('.logo', { x: 0, duration: .5, ease: 'power4.out' })

})

</script>

<template>
  <div :class="{ overlay_g: sidebar }" @click="openMenu"></div>
  <div class="navbar">
    <div class="menu">
      <div class="open-menu" :class="{ open: sidebar }" @click="openMenu">
        <a href="" @click.prevent="">
          <MenuOutlined />
        </a>
      </div>
      <div class="."></div>
      <div class="logo">
        <!-- Aot the Game -->
        The
        <CrownOutlined />
        Throne
        <!-- Ultimo Trono -->
        <!-- Last Kingdom -->
      </div>
      <div class="user-logged">
        <div v-show="userStore.is_auth">
          <Avatar :size="48" src="http://localhost:8000/assets/avatars/pippo.jpg" circle />
        </div>
      </div>
    </div>
  </div>
  <Sidebar :class="{ open: sidebar }" :is_open="sidebar" :open="openMenu" />
  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<style>
.ant-notification-notice {
  background: #FFE4C4;
  background: linear-gradient(120deg, rgba(255, 228, 196, .5) 0%, rgba(134, 116, 109, .1) 100%);
  backdrop-filter: blur(1em);
}

.custom-img {
  border-radius: 50%;
  box-shadow: 0 2px 8px 2px rgba(0, 0, 0, .2);
  border: solid 3px rgba(0, 0, 0, .9);
  background-color: #9f2d00;
  margin-right: 1em;
}

@media screen and (max-width: 1200px) {
  .overlay {
    position: absolute;
    overflow-y: hidden;
    width: 100%;
    min-height: 100%;
  }

  .overlay_g {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 1050;
  }
}
</style>