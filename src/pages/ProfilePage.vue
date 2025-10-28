<script setup></script>

<template>
    <div class="bg-user-profile">
        <div class="profile">
            <div class="avatar">
                <img src="http://localhost:8000/assets/avatars/avatar_wizard_human_woman_02.png" alt="">
            </div>
            <div class="username">John Smith 81</div>
        </div>
    </div>
    <div class="content">
        <h1>Profilo Personaggio</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas molestie eros id leo accumsan sagittis.
            Mauris malesuada, metus quis efficitur rutrum, lorem orci molestie ligula, in placerat ex risus nec nulla.
            Donec vehicula sem vitae erat bibendum, ut congue nisl auctor. Donec ornare sodales odio, a imperdiet felis
            ornare ut. Curabitur id urna eleifend, consectetur diam id, congue enim. Nam ac dictum nunc. Vestibulum
            consequat vulputate nunc, eget vehicula felis vehicula gravida. Ut ut fermentum nibh, vel tempus ipsum. Sed
            sed nunc pretium, tempor neque at, auctor purus. Quisque vehicula ipsum at velit eleifend, vitae convallis
            erat imperdiet. Fusce nec diam mollis, aliquam purus quis, pulvinar risus. Vivamus eu dui pellentesque,
            facilisis lacus at, vehicula nisl. Fusce fringilla mi non laoreet luctus. Nullam tortor libero, dapibus ut
            nisi ac, rutrum efficitur ex. Vivamus rutrum sapien in lacus mattis mollis. Proin in iaculis libero.
        </p>
        <p>
            Ut feugiat sagittis ornare. Suspendisse a risus at velit gravida placerat. Fusce euismod sed odio et
            fermentum. Nullam facilisis cursus lacinia. Curabitur mollis mattis libero a scelerisque. Vivamus dignissim
            lectus placerat, eleifend dui eget, gravida nibh. Aliquam non orci in libero vehicula vestibulum eget
            facilisis ipsum.
        </p>
        <p>
            Ut sed porta tortor. Donec augue velit, volutpat sit amet dui et, molestie tincidunt sapien. Donec rutrum
            urna a leo egestas, ac iaculis dolor sollicitudin. Aenean mauris ex, feugiat ac vulputate quis, euismod ut
            elit. In et feugiat dui, at feugiat magna. Mauris sodales lacus eget eros rutrum pellentesque. Curabitur sit
            amet felis libero. Maecenas et efficitur eros, sit amet iaculis libero. Mauris dapibus tellus pellentesque
            aliquam tincidunt. Ut tincidunt augue in odio tempus, sit amet pretium justo dapibus. Nullam consequat
            gravida elit. Aliquam convallis sapien sed quam egestas, sed tincidunt lorem convallis. Aliquam et laoreet
            lorem.
        </p>
        <p>
            Etiam tincidunt scelerisque lorem a dictum. Proin laoreet pretium nisi, ac tincidunt magna. Fusce quis lacus
            ultricies, ultrices nibh sed, vulputate ante. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Nulla facilisi. Donec bibendum ornare velit a sollicitudin. Pellentesque
            egestas a metus non blandit. Quisque ultrices leo augue, in pulvinar ante porttitor ac. Nunc hendrerit mi
            sem, sit amet aliquet lacus ultricies a. Suspendisse potenti. Proin a ligula nec tortor efficitur vehicula.
            Suspendisse tempor tortor gravida, faucibus metus vel, molestie enim.
        </p>
        <p>
            Integer sem ante, porttitor at leo at, finibus posuere ante. Cras tempor interdum leo, id iaculis leo
            aliquet vel. Praesent egestas orci ut ante mollis, id consequat magna dapibus. Nam auctor vel nunc sit amet
            elementum. Morbi vel purus vitae lectus pharetra congue accumsan et quam. Duis interdum venenatis
            condimentum. In pellentesque dui id urna posuere, et pulvinar orci convallis. Suspendisse quis nunc felis.
            Donec leo elit, varius eu dictum in, euismod eget ligula. Duis non placerat risus. Sed ut fringilla nisi.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        </p>
    </div>
</template>

<style scoped>
p {
    margin-bottom: 1em;
}

.content {
    width: 100%;
    max-width: 1200px;
}

.bg-user-profile {
    position: relative;
    width: 100%;
    height: 260px;
    background: url('../assets/anime-girl-looking-for-sunset_bmVsZmuUmZqaraWkpJRmbmdlrWZlbWU-3996841341.jpg') no-repeat center center / cover;
    border-radius: .6em;
    margin-bottom: 1em;
}

.profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 1em;
    left: 1em;
    height: 60px;
}

.profile .username {
    font-size: 20px;
    font-weight: bold;
    text-shadow: 2px 2px rgba(255, 255, 255, .5);
}

.avatar {
    display: block;
    bottom: 10px;
    left: 10px;
    width: 60px;
    height: 60px;
    background-color: rgba(255, 255, 255, .7);
    border-radius: 50%;
    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.2);
    margin-right: 1em;
}

.avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

@media screen and (max-width: 1200px) {
    .bg-user-profile {
        border-radius: 0;
    }
    /* .bg-user-profile {
        position: absolute;
        height: 140px;
        top: 60px;
        left: 0;
        border-radius: 0;
    } */
    /* .container {
        padding-top: 140px;
    } */
}
</style>