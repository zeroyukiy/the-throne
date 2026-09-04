<script setup>
import { useUserStore } from "@/store/user";
import { useChatStore } from "@/store/chat";
import {
    EllipsisOutlined,
    SendOutlined,
} from "@ant-design/icons-vue";
import {
    Button,
    Avatar,
    Space,
    Card,
    Badge,
    Textarea,
    Tag,
} from "ant-design-vue";
import { onMounted, onUnmounted, ref, watch } from "vue";
import gsap from "gsap";
import { EventType } from "@/helpers/event_types";
import { SmileOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import ChatMessage from "@/components/ChatMessage.vue";

const userStore = useUserStore();
const chatStore = useChatStore();

const route = useRoute()
const router = useRouter()

const value1 = ref("");

const chatUserListOpen = ref(false);
const chatUserListOnline = () => {
    chatUserListOpen.value = !chatUserListOpen.value;
};

const { socket } = userStore;

const isLoading = ref(true)

watch(isLoading, async (old, next) => {
    console.log(userStore.socket)
    socket.send(JSON.stringify({
        event: EventType.JoinRoom,
        payload: {
            room_id: chatStore.slug,
        },
    }))
})

const getRoom = async (slug_param) => {
    try {
        const req = await fetch(`http://localhost:8000/chat/${slug_param}`)
        if (req.ok) {
            const result = await req.json()
            console.log(result)
            const { id, name, slug, description, messages } = result
            if (slug_param === slug) {
                console.log('room_id ok')
                chatStore.id = id
                chatStore.name = name.charAt(0).toUpperCase() + name.slice(1)
                chatStore.slug = slug
                chatStore.description = description
                isLoading.value = false
                chatStore.messages = messages
            }
        } else {
            router.replace({ path: "/notfound" })
        }
    } catch (err) {
        console.error(err)
    }
}

onMounted(async () => {

    document.onscroll = () => {
        // console.log((document.body.offsetHeight + 68) < (window.pageYOffset + window.innerHeight))
        if ((document.body.offsetHeight + 68) < (window.pageYOffset + window.innerHeight)) {
            closeAlertMessage()
        }
    }

    console.log("mounted ", Date.now())

    if (socket.readyState === 1) {
        await getRoom(route.params.id)
        socket.onmessage = (message) => {
            const { event, payload, timestamp } =
                JSON.parse(message.data);
            if (event == EventType.Message) {
                console.log(message);
                chatStore.addMessage({
                    user: {
                        id: payload.user_id,
                        username: payload.username,
                        avatar: payload.avatar,
                    },
                    text: payload.message,
                    created_at: timestamp,
                })
                // pushWindowToBottom()
                if (payload.username !== userStore.username) {
                    openAlertMessage();
                }
            }
        };

    }
});

async function send() {
    socket.send(
        JSON.stringify({
            event: EventType.Message,
            payload: {
                message: value1.value,
            }
        }),
    );
    value1.value = "";
    pushWindowToBottom();
}

function pushWindowToBottom() {
    setTimeout(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    }, 200);
}

function pushDown() {
    closeAlertMessage();
    pushWindowToBottom();
}

const openAlertMessage = () => {
    const tl = gsap.timeline();
    tl.to(".chat>.alert-message", {
        x: 10,
        y: -100,
        opacity: 0,
        duration: 0.1,
    }).to(".chat>.alert-message", {
        x: 10,
        y: 20,
        opacity: 1,
        duration: 0.4,
        display: "block",
        ease: "power4.out",
    });
};

const closeAlertMessage = () => {
    gsap.to(".chat>.alert-message", { opacity: 0, duration: 0.4, display: "none" });
};

let tl = gsap.timeline();
onMounted(() => {
    tl.to(".write-message", { y: 200, opacity: 0, duration: 0.1 }).to(
        ".write-message",
        { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
    );
});

onUnmounted(async () => {
    tl = null;
    socket.send(JSON.stringify({
        event: EventType.LeaveRoom,
        payload: {
            room_id: "chat"
        },
    }))
});
</script>

<template>
    <!-- <div class="chat" v-show="ws.open"> -->
    <div class="chat" v-show="!isLoading">
        <div class="alert-message">
            <a-alert message="Ci sono nuovi messaggi" type="info" show-icon @click="pushDown">
                <template #icon><smile-outlined /></template>
            </a-alert>
        </div>
        <div class="chat-header">
            <div class="chat-header-blur">
                <div class="chat-title">{{ chatStore.name }}</div>
                <Button type="text" @click="chatUserListOnline">
                    <template #icon>
                        <EllipsisOutlined />
                    </template>
                </Button>
            </div>
            <div :class="chatUserListOpen
                ? 'user-list-online open'
                : 'user-list-online'
                ">
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
                                    <Avatar class="avatar" size="large" src="http://localhost:8000/assets/avatars/avatar_deity_man_02.png" />
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
                <div class="description">
                    <h2>Descrizione</h2>
                    <p>
                        {{ chatStore.description }}
                    </p>
                    <div class="tags">
                        <Tag color="pink">free-role</Tag>
                        <Tag color="blue">esplorazione</Tag>
                    </div>
                </div>

                <!-- ChatMessage -->
                <ChatMessage :message="message" :keyMessage="key" v-for="(message, key) in chatStore.messages" />
                <!-- <div class="user-messsage" v-else>
                    <p>No messages..</p>
                </div> -->
                <!-- End ChatMessage -->
            </div>
            <div class="write-message">
                <div class="inner">
                    <div class="input">
                        <Button type="link" size="small" style="font-size: 10px; padding: 0">logged as: {{
                            userStore.username
                        }}</Button>
                        <div class="form-send-message">
                            <Textarea v-model:value="value1" size="large" style="width: 100%; margin-right: 0.5em"
                                placeholder="scrivi la tua azione qui.." :auto-size="{ minRows: 1, maxRows: 5 }"
                                show-count :maxlength="1000" />
                            <Button type="default" size="large" @click="send">
                                <!-- <Button type="default" size="large"> -->
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
.alert-message {
    display: none;
    width: 280px;
    position: fixed;
    z-index: 100;
    opacity: 0;
}

.chat {
    width: 100%;
    max-width: 1200px;
    height: 100%;
    /* background-color: rgba(255, 228, 196, .1); */
    border-radius: 0.3em;
    transition: all 0.4s ease-in-out;
}

.chat-header {
    position: relative;
    width: 100%;
    z-index: 8;
    background-color: rgba(255, 228, 196, 0.1);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
}

.chat-header .chat-header-blur {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 228, 196, 0.1);
    padding: 0.5em 1em;
    border-top-left-radius: 0.3em;
    border-top-right-radius: 0.3em;
    backdrop-filter: blur(1em);
}

.chat-header .chat-title {
    min-width: 200px;
    font-size: 20px;
    font-weight: bold;
}

.chat-container {
    height: 100%;
    padding: 0.5em 1em;
}

.chat-header .user-list-online {
    position: absolute;
    display: none;
    width: 100%;
    opacity: 0;
    padding: 1em;
    background-color: #b09c8f;
    background: linear-gradient(90deg,
            rgba(176, 156, 143, 0.7) 0%,
            rgba(150, 131, 116, 0.9) 100%);
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    backdrop-filter: blur(5px);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
    border-bottom-left-radius: 0.3em;
    border-bottom-right-radius: 0.3em;
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
    margin-bottom: 0.4em;
    margin-right: 0.4em;
}

.user-list-online .user .ant-card {
    background-color: rgba(0, 0, 0, 0.2);
    background: url("../assets/sidebar2.jpg") no-repeat top right / cover;
    /* border: 2px groove rgba(0, 0, 0, 0.8); */
    color: rgba(255, 193, 7, 0.85);
    margin-right: 0;

    border: 2px solid;
    border-bottom: 4px solid;
    border-right: 4px solid;
    border-color: rgba(0, 0, 0, 0.85);
    border-radius: .6em;
}

.user-list-online .user .avatar {
    background-color: rgba(0, 0, 0, 0.4);
    border: 2px solid rgba(0, 0, 0, 0.5);
}

.user-list-online .user .name {
    font-family: "Rubik Dirt", system-ui;
    font-size: 14px;
    margin-left: 0.5em;
}

.text {
    line-height: 1.4;
    padding-bottom: 80px;
}

.text .description {
    margin-bottom: 1em;
}

.text .description h2 {
    font-size: 14px;
}

.description p {
    font-size: 14px;
}

.description .tags {
    padding: 0.2em 0;
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
    transition: padding 0.4s ease-in-out;
}

.write-message .inner .input {
    width: 100%;
    max-width: 1200px;
    padding: 0.3em 1em;
    background-color: antiquewhite;
    transition: all 0.4s ease-in-out;
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
    padding: 0.6em;
    font-size: 15px;
    margin-right: 0.5em;
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
        padding-top: 0.5em;
    }

    .chat-header .chat-header-blur {
        padding: 0.3em 0.5em;
    }

    .chat-container {
        padding: 0 0.5em 1em 0.5em;
    }

    .write-message {
        padding: 0;
    }

    .write-message .inner {
        padding: 0;
    }

    .write-message .inner .input {
        padding: 0.3em 0.5em;
    }

    .chat-header .user-list-online {
        padding: 0.5em;
    }
}
</style>
