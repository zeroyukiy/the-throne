<script setup>
import Sidebar from './components/Sidebar.vue';
import { MenuOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { CrownOutlined } from '@ant-design/icons-vue'

const sidebar = ref(false)
const openMenu = () => {
  sidebar.value = !sidebar.value

  if (sidebar.value === true) {
    document.querySelector("body").classList.add("overlay")
  } else {
    document.querySelector("body").classList.remove("overlay")
  }
}

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
      <div class="logo">
        <!-- Aot the Game -->
        The
        <CrownOutlined />
        Throne
        <!-- Ultimo Trono -->
        <!-- Last Kingdom -->
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