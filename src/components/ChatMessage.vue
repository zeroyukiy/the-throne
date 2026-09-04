<script setup>
import { onMounted, reactive, ref } from 'vue';
import {
    Avatar
} from "ant-design-vue";
import { GiftFilled } from '@ant-design/icons-vue';
import { useChatStore } from '@/store/chat';
import gsap from 'gsap';

const props = defineProps({ message: Object, keyMessage: Number })
const message = ref(props.message)

const chatStore = useChatStore()

const tooltipRef = ref()
const tooltipIsOpen = ref(false)

const tooltip = reactive({
    userProfile: {},
    set: false
})

const isLoading = ref(true)

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 300);
})

const openTooltipUserProfile = async (user_id) => {
    if (!tooltip.set) {
        let profile = chatStore.userProfiles.find(profile => profile.user_id == user_id)
        if (profile === undefined) {
            console.log("query")
            // query the data of the user
            try {
                const req = await fetch(`http://localhost:8000/users/${user_id}`)
                if (req.ok) {
                    const { user_id, username } = await req.json();
                    const data = {
                        user_id: user_id,
                        username: username
                    }
                    chatStore.userProfiles.push(data)
                    profile = data
                }
            } catch (err) {
                console.error(err)
            }
        }
        tooltip.userProfile = {
            user_id: profile.user_id,
            username: profile.username
        }
        tooltip.set = true
    }

    !tooltipIsOpen.value ? tooltipRef.value.classList.add('open') : tooltipRef.value.classList.remove('open')
    tooltipIsOpen.value = !tooltipIsOpen.value
}

</script>

<template>
    <div class="user-message" :id="'message_' + props.keyMessage" v-show="!isLoading">
        <div class="user-avatar">
            <Avatar size="large" shape="square" :src="message.user.avatar"
                style="background-color: rgba(0, 0, 0, 0.4);width: 48px;height: 48px;"
                @click="openTooltipUserProfile(message.user.id)" />
            <div style="margin-left: 0.5em">
                <span style="font-weight: bold; text-transform: capitalize;">{{ message.user.username }}</span>
                <div>
                    <GiftFilled />
                </div>
            </div>
            <div class="tooltipUserProfile" ref="tooltipRef">
                <h3>{{ tooltip.userProfile.username }}</h3>
            </div>
        </div>
        <div class="user-content">
            <div>
                <p>
                    {{ message.text }}
                </p>
            </div>
        </div>
    </div>

    <div class="message-preview" v-show="isLoading">
         <a-skeleton avatar :paragraph="{ rows: 4 }" />
    </div>

</template>

<style scoped>
.user-message {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 1.5em;
    flex-wrap: wrap;
}

.user-message .user-avatar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* flex-wrap: wrap; */
    /* width: 60px; */
}

.user-avatar .ant-avatar {
    cursor: pointer;
}

.user-avatar div {
    /* width: 100%; */
    /* margin-top: .3em; */
    border-radius: 50%;
}

.user-avatar .tooltipUserProfile {
    width: 180px;
    height: 100px;
    padding: .4em;
    display: none;
    position: absolute;
    left: 50px;
    top: -10px;
    background-color: rgba(0, 0, 0, 0.2);
    background: url("../assets/sidebar2.jpg") no-repeat top right / cover;
    color: rgba(255, 193, 7, 0.85);
    margin-right: 0;
    border: 2px solid;
    border-bottom: 4px solid;
    border-right: 4px solid;
    border-color: rgba(0, 0, 0, 0.85);
    border-radius: .6em;
}

.tooltipUserProfile h3 {
    font-family: "Rubik Dirt", system-ui;
    font-size: 14px;
}

.tooltipUserProfile.open {
    display: block;
}

.user-message .user-content {
    width: 100%;
}

.user-content span {
    margin-right: 0.5em;
}

.message-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 200px;
    border-radius: 4px;
    padding: 10px;
    margin: 20px 0;
}
</style>