<script setup>
import Sidebar from './components/Sidebar.vue';
import { MenuOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';

const sidebar = ref(false)
const openMenu = () => {
  sidebar.value = !sidebar.value
}

</script>

<template>
  <div class="navbar">
    <div class="menu">
      <div class="open-menu" :class="{ open: sidebar }" @click="openMenu">
        <a href="" @click.prevent="">
          <MenuOutlined />
        </a>
      </div>
      <div class="logo">
        <!-- Aot the Game -->
        The Throne
         <!-- Ultimo Trono -->
         <!-- Last Kingdom -->
      </div>
    </div>
  </div>
  <Sidebar :class="{ open: sidebar }" />
  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<style>
.ant-notification-notice {
  /* background-color: #ffe4c4; */
  background: #FFE4C4;
  background: linear-gradient(120deg, rgba(255, 228, 196, .5) 0%, rgba(134, 116, 109, .1) 100%);
  backdrop-filter: blur(1em);
}

.custom-img {
  border-radius: 50%;
  box-shadow: 0 2px 8px 2px rgba(0, 0, 0, .2);
  border: solid 3px rgba(0, 0, 0, .9);
  /* background-color: wheat; */
  background-color: #9f2d00;
  margin-right: 1em;
}
</style>