<script setup>
import { onMounted, ref } from 'vue';
import { LogoutOutlined, HomeOutlined, UserOutlined, MessageOutlined, FireOutlined } from '@ant-design/icons-vue';

const bounce = ref(false)

// close the sidebar when the user click on one of the links
const props = defineProps(['open', 'is_open'])

onMounted(() => {
    document.querySelectorAll("li > a.link").forEach((element) => {
        element.addEventListener("click", (e) => {
            if (props.is_open) {
                props.open()
            }
        })
    })
})

const logout = () => {
    // call the /auth/logout endpoint
    localStorage.removeItem("user")
}

</script>

<template>
    <div class="sidebar">
        <div class="menu">
            <ul>
                <li class="name-menu">Main Menu</li>
                <li>
                    <RouterLink class="link" active-class="active" to="/">Pagina principale
                        <HomeOutlined />
                    </RouterLink>
                </li>
                <li>
                    <RouterLink class="link" active-class="active" to="/profile">Personaggio
                        <UserOutlined />
                    </RouterLink>
                </li>
                <li>
                    <RouterLink class="link" active-class="active" to="/explore">Esplora
                        <FireOutlined />
                    </RouterLink>
                </li>
            </ul>
            <ul>
                <li class="name-menu">World Map</li>
                <li>
                    <RouterLink class="link" active-class="active" to="/chat">Una Chat
                        <MessageOutlined />
                    </RouterLink>
                </li>
                <li>
                    <RouterLink class="link" to="/">Link</RouterLink>
                </li>
                <li>
                    <RouterLink class="link" to="/">Link</RouterLink>
                </li>
                <li>
                    <RouterLink class="link" to="/">Link</RouterLink>
                </li>
                <li>
                    <RouterLink class="link" to="/">Link</RouterLink>
                </li>
                <li>
                    <RouterLink class="link" to="/">Link</RouterLink>
                </li>
            </ul>
        </div>
        <ul class="menu-settings">
            <li>
                <div class="bounce-ball" :class="bounce === true ? 'active' : ''"></div>
                <RouterLink class="link link-danger" to="/logout" @mouseover="bounce = true" @mouseout="bounce = false"
                    @click="logout">
                    Disconnetti
                    <LogoutOutlined />
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.menu {
    width: 100%;
}

.sidebar ul {
    width: 100%;
    padding: .5em .7em;
}

.sidebar ul li {
    margin-bottom: 5px;
}

li span {
    margin-right: .5em;
}

.sidebar .menu-settings {
    margin-bottom: .5em;
}

.link {
    display: flex;
    justify-content: space-between;
    padding: .5em .8em;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    color: #FFE0B2;
    font-size: 14px;
}

.link:hover {
    color: aliceblue;
    background-color: rgba(0, 0, 0, 0.7);
}

.link-danger {
    /* color: #fb2c36; */
}

.link-danger:hover {
    background-color: #c10007;
    text-decoration: line-through;
}

.bounce-ball {
    display: none;
    opacity: 0;
    position: relative;
    top: 10px;
    left: 183px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    z-index: 100;
    box-shadow: 0 2px 0 0 rgba(255, 255, 255, .5);
    animation: link-logout-flash .3s infinite;
}

.bounce-ball.active {
    display: block;
    opacity: 1;
    width: 10px;
    background-color: #FFE0B2;
}

.active {
    color: aliceblue;
    background-color: rgba(0, 0, 0, 0.7);
}

span.anticon {
    font-size: 18px;
}

.name-menu {
    font-size: 8px;
    text-transform: uppercase;
    color: rgba(255, 193, 7, .85);
    text-align: right;
}

.open {
    left: 0;
}

@keyframes link-logout-flash {
    0% {
        transform: translateY(0);
    }

    20% {
        transform: translateY(5px);
    }

    90% {
        transform: translateY(-5px);
    }
}
</style>
