<script setup>
import { auth } from '@/auth.vue';
import { EventType, getWebsocket, open } from '@/ws';
import { EllipsisOutlined, SendOutlined, GiftFilled } from '@ant-design/icons-vue';
import { Button, Avatar, Space, Card, Badge, Textarea } from 'ant-design-vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const value1 = ref("")

const messages = ref([
    {
        username: "abcd",
        message: `Nunc quis sem mattis, ullamcorper sem sit amet, pulvinar magna. Cras iaculis felis ut felis accumsan
                    interdum. Aliquam erat volutpat. Proin eu erat massa. Phasellus a velit augue. Suspendisse eu lacus
                    in purus pulvinar scelerisque non sit amet mauris. Pellentesque tellus ipsum, volutpat ut
                    pellentesque sed, lacinia interdum eros.

                    Donec eu augue eu nulla blandit accumsan. Mauris vitae sollicitudin tortor, at ornare purus. Morbi
                    gravida ullamcorper tellus ac tincidunt. Sed id quam nulla. Nam quis velit nunc. Proin pulvinar erat
                    ligula, a condimentum ipsum consectetur in. Nulla facilisi. Etiam sit amet mi at ligula dapibus
                    luctus.

                    Aliquam quis lacus vel enim pretium volutpat eu at nibh. Vestibulum sollicitudin urna ut mauris
                    facilisis condimentum. Sed ligula tellus, dignissim non urna sed, commodo ullamcorper lorem. Cras ac
                    scelerisque mauris. Aliquam metus neque, fringilla a ligula id, auctor tempus nulla. Donec euismod
                    libero quis felis eleifend blandit pharetra in libero. Aenean interdum ultrices lorem, eu interdum
                    velit convallis eu. Vestibulum commodo elit nunc, sed sagittis lectus imperdiet at. Suspendisse
                    molestie ultricies neque sit amet mollis. Proin massa diam, facilisis sit amet sem quis, malesuada
                    malesuada nunc. Nulla nec tellus ut quam semper rhoncus. Duis imperdiet ultrices ligula, quis mollis
                    sapien rhoncus sit amet. Ut lobortis a magna et cursus. Integer at finibus sem.`
    },
    {
        username: "lollo0",
        message: `In ac pretium libero. Proin lacinia dapibus risus, consectetur mattis libero dictum quis. Aenean
                    cursus, libero non blandit condimentum, felis nisi consequat nisl, quis pharetra nunc nulla quis
                    diam. Praesent ultrices lectus nulla, non finibus mauris vulputate ut. Proin vitae arcu non diam
                    imperdiet mollis. Quisque sit amet pretium nisi. Donec vitae dolor pretium, pulvinar nibh vitae,
                    blandit orci. Vivamus condimentum eros est, sit amet venenatis velit pellentesque sit amet.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis
                    vitae quam semper orci volutpat pellentesque. Vestibulum ac consectetur lacus, volutpat ultricies
                    justo. In eu dictum lacus. Proin a ipsum eu tellus semper congue. Cras tincidunt orci a consectetur
                    imperdiet. Fusce varius dui ac diam euismod molestie.

                    Aenean aliquam arcu eu dui sodales, varius imperdiet ex tristique. Nunc auctor lacinia nibh, vel
                    faucibus magna congue volutpat. Phasellus quis ante erat. Mauris mollis velit metus, sed consectetur
                    orci lobortis vel. Proin et odio vel diam volutpat facilisis vel vitae augue. Morbi condimentum
                    vitae massa vel pharetra. Fusce eu fringilla odio, sed gravida metus. Orci varius natoque penatibus
                    et magnis dis parturient montes, nascetur ridiculus mus. Morbi non libero vitae lacus pharetra
                    rutrum ac in tellus. Fusce tincidunt urna vitae tellus tincidunt, eget consequat tortor commodo.
                    Donec mollis, sapien non tincidunt blandit, nisi justo varius velit, sed scelerisque tortor neque
                    sit amet augue. Etiam vehicula augue tortor, in varius sapien viverra molestie. Cras rutrum vel
                    sapien vitae rhoncus.

                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean
                    eu tortor consectetur, suscipit lorem eu, venenatis urna. Nunc sed ligula mollis, commodo leo vitae,
                    efficitur leo. Duis eget rhoncus nisl. Integer justo dolor, fringilla eget urna at, euismod
                    consectetur ante. Integer vel metus id mauris tincidunt dignissim. Morbi facilisis condimentum nisl,
                    id ornare nibh elementum nec. Donec eu commodo ipsum, et posuere arcu. Donec consequat hendrerit
                    turpis sit amet vehicula. Etiam pharetra consectetur felis, id tempor felis tincidunt vel. Sed eget
                    efficitur turpis. Donec at magna eleifend, varius tortor in, sollicitudin ligula. Fusce ornare
                    molestie dui eu fringilla.`
    },
    {
        username: "aa",
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vulputate urna ante, ac elementum
                    turpis tincidunt at. Mauris molestie condimentum sapien eu congue. Sed egestas congue euismod.
                    Maecenas non nisl eget risus commodo fringilla. Praesent cursus ligula in neque elementum fermentum.
                    Donec porta vel lorem sed cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                    posuere cubilia curae; Duis non tellus non ante vulputate tincidunt. Sed interdum id libero vitae
                    condimentum. Nullam eget ultricies urna, convallis finibus dolor. Phasellus tempus sed lectus eu
                    venenatis. Quisque eget luctus tellus.`
    },
    {
        username: "someone",
        message: `Nunc quis sem mattis, ullamcorper sem sit amet, pulvinar magna. Cras iaculis felis ut felis accumsan
                    interdum. Aliquam erat volutpat. Proin eu erat massa. Phasellus a velit augue. Suspendisse eu lacus
                    in purus pulvinar scelerisque non sit amet mauris. Pellentesque tellus ipsum, volutpat ut
                    pellentesque sed, lacinia interdum eros.

                    Donec eu augue eu nulla blandit accumsan. Mauris vitae sollicitudin tortor, at ornare purus. Morbi
                    gravida ullamcorper tellus ac tincidunt. Sed id quam nulla. Nam quis velit nunc. Proin pulvinar erat
                    ligula, a condimentum ipsum consectetur in. Nulla facilisi. Etiam sit amet mi at ligula dapibus
                    luctus.

                    Aliquam quis lacus vel enim pretium volutpat eu at nibh. Vestibulum sollicitudin urna ut mauris
                    facilisis condimentum. Sed ligula tellus, dignissim non urna sed, commodo ullamcorper lorem. Cras ac
                    scelerisque mauris. Aliquam metus neque, fringilla a ligula id, auctor tempus nulla. Donec euismod
                    libero quis felis eleifend blandit pharetra in libero. Aenean interdum ultrices lorem, eu interdum
                    velit convallis eu. Vestibulum commodo elit nunc, sed sagittis lectus imperdiet at. Suspendisse
                    molestie ultricies neque sit amet mollis. Proin massa diam, facilisis sit amet sem quis, malesuada
                    malesuada nunc. Nulla nec tellus ut quam semper rhoncus. Duis imperdiet ultrices ligula, quis mollis
                    sapien rhoncus sit amet. Ut lobortis a magna et cursus. Integer at finibus sem.`
    }
])

const chatUserListOpen = ref(false)
const chatUserListOnline = () => {
    chatUserListOpen.value = !chatUserListOpen.value
}

const ws = getWebsocket()

onMounted(async () => {
    console.log(auth.user)

    if (open === true) {
        ws.send(JSON.stringify({
            "event_type": EventType.Join,
            "message": "chat_1",
        }))
    }

    ws.onmessage = (payload) => {
        console.log(payload)
        const { event_type, message, username, avatar, created_at } = JSON.parse(payload.data)
        if (event_type == EventType.Message) {
            // messages.value.push(message)
            messages.value.push({
                username: username,
                avatar: avatar,
                message: message,
                created_at: created_at,
            })
            pushWindowToBottom()
        }
    }

    const msgs = await fetch("http://localhost:8000/api/messages/chat_1", {
        method: "get",
        mode: 'cors',
    })
    if (msgs.ok) {
        const data = await msgs.json()
        messages.value.push(...data)
        console.log(messages.value)
    }
})

onBeforeUnmount(() => {
    ws.send(JSON.stringify({
        "event_type": EventType.Leave,
    }))
})

async function send() {
    const msgs = await fetch("/api/message", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
            "message": value1.value,
        })
    })
    if (msgs.ok) {
        console.log("message sent")
    }
    // console.log(value1.value)
    // messages.value.push({
    //     user: 'Jon Snow',
    //     message: value1.value
    // })
    ws.send(JSON.stringify({
        "event_type": EventType.Message,
        "message": value1.value,
    }))
    value1.value = ''
    pushWindowToBottom()
}

function pushWindowToBottom() {
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    }, 200);
}

</script>

<template>
    <div class="chat">
        <div class="chat-header">
            <div class="chat-header-blur">
                <div class="chat-title">Chat Page</div>
                <Button type="text" @click="chatUserListOnline">
                    <template #icon>
                        <EllipsisOutlined />
                    </template>
                </Button>
            </div>
            <div :class="chatUserListOpen ? 'user-list-online open' : 'user-list-online'">
                <div class="users">
                    <a href="" class="user">
                        <Card size="small">
                            <Space>
                                <Badge color="green" :dot="true">
                                    <Avatar class="avatar" size="large" />
                                </Badge>
                                <div class="name">Alan Olaka</div>
                            </Space>
                        </Card>
                    </a>
                    <a href="" class="user">
                        <Card size="small">
                            <Space>
                                <Badge color="red" :dot="true">
                                    <Avatar class="avatar" size="large" />
                                </Badge>
                                <div class="name">Space123</div>
                            </Space>
                        </Card>
                    </a>
                    <a href="" class="user">
                        <Card size="small">
                            <Space>
                                <Badge color="green" :dot="true">
                                    <Avatar class="avatar" size="large" />
                                </Badge>
                                <div class="name">Jor Gok</div>
                            </Space>
                        </Card>
                    </a>
                </div>
            </div>
        </div>
        <div class="chat-container">
            <div class="text">
                <div class="user-message" v-for="msg in messages">
                    <div class="user-avatar">
                        <Avatar size="large" shape="square" :src="msg.avatar ?? msg.avatar"
                            style="background-color: rgba(0, 0, 0, 0.4); width: 48px; height: 48px;" />
                        <!-- <div style="width: 16px; height: 16px; background-color: rgba(0,0,0,.45);"> -->
                        <div>
                            <!-- <GiftOutlined /> -->
                            <!-- <GiftTwoTone /> -->
                            <GiftFilled />
                        </div>
                    </div>
                    <div class="user-content">
                        <span style="font-weight: bold; text-transform: capitalize;">{{ msg.username }}</span>
                        <span style="font-size: 14px;">{{ msg.created_at }}</span>
                        <p>
                            {{ msg.message }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="write-message">
                <div class="inner">
                    <div class="input">
                        <Button type="link" size="small" style="font-size: 10px; padding: 0;">logged as: {{
                            auth.user
                            }}</Button>
                        <div class="form-send-message">
                            <Textarea v-model:value="value1" size="large" style="width: 100%; margin-right: .5em;"
                                placeholder="scrivi la tua azione qui.." :auto-size="{ minRows: 1, maxRows: 5 }"
                                show-count :maxlength="1000" />
                            <Button type="default" size="large" @click="send">
                                <SendOutlined />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.chat {
    width: 100%;
    max-width: 1200px;
    height: 100%;
    /* background-color: rgba(255, 228, 196, .1); */
    border-radius: .3em;
    transition: all .4s ease-in-out;
}

.chat-header {
    position: relative;
    width: 100%;
    z-index: 8;
    background-color: rgba(255, 228, 196, .1);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
}

.chat-header .chat-header-blur {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 228, 196, .1);
    padding: .5em 1em;
    border-top-left-radius: .3em;
    border-top-right-radius: .3em;
    backdrop-filter: blur(1em);
}

.chat-header .chat-title {
    min-width: 200px;
    font-size: 20px;
    font-weight: bold;
}

.chat-container {
    height: 100%;
    padding: .5em 1em;
}

.chat-header .user-list-online {
    position: absolute;
    display: none;
    width: 100%;
    opacity: 0;
    padding: 1em;
    background-color: #b09c8f;
    background: linear-gradient(90deg, rgba(176, 156, 143, .7) 0%, rgba(150, 131, 116, .9) 100%);
    transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
    backdrop-filter: blur(5px);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
    border-bottom-left-radius: .3em;
    border-bottom-right-radius: .3em;
}

.user-list-online.open {
    display: block;
    opacity: 1;
}

.user-list-online .users {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
}

.user-list-online .user {
    max-width: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: .4em;
    margin-right: .4em;
}

.user-list-online .user .ant-card {
    background-color: rgba(0, 0, 0, 0.2);
    background: url("../assets/sidebar2.jpg") no-repeat top right / cover;
    border: 2px groove rgba(0, 0, 0, 0.8);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
    color: rgba(255, 193, 7, .85);
    margin-right: 0;
}

.user-list-online .user .avatar {
    background-color: rgba(0, 0, 0, 0.4);
    border: 2px solid rgba(0, 0, 0, 0.5);
}

.user-list-online .user .name {
    font-family: "Rubik Dirt", system-ui;
    font-size: 14px;
    margin-left: .5em;
}

.text {
    line-height: 1.4;
    padding-bottom: 80px;
}

.user-message {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 1.5em;
}

.user-message .user-avatar {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    /* width: 60px; */
}

.user-avatar div {
    width: 100%;
    margin-top: .3em;
    border-radius: 50%;
}

.user-message .user-content {
    width: 100%;
}

.user-content span {
    margin-right: .5em;
}

.write-message {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 0 1em;
    z-index: 1000;
}

.write-message .inner {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-left: 220px;
    transition: padding .4s ease-in-out;
}

.write-message .inner .input {
    width: 100%;
    max-width: 1200px;
    padding: .3em 1em;
    background-color: antiquewhite;
    transition: all .4s ease-in-out;
}

.ant-avatar {
    background-color: rgba(0, 0, 0, 0.2);
}

.form-send-message {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.form-send-message .input-default {
    padding: .6em;
    font-size: 15px;
    margin-right: .5em;
}

@media screen and (min-width: 1800px) {
    .chat {
        max-width: 1600px;
    }

    .write-message .inner .input {
        max-width: 1600px;
    }
}

@media screen and (max-width: 1200px) {
    .text {
        padding-top: .5em;
    }

    .chat-header .chat-header-blur {
        padding: .3em .5em
    }

    .chat-container {
        padding: 0 .5em 1em .5em;
    }

    .write-message {
        padding: 0;
    }

    .write-message .inner {
        padding: 0;
    }

    .write-message .inner .input {
        padding: .3em .5em;
    }

    .chat-header .user-list-online {
        padding: .5em;
    }
}
</style>