<script setup>
import { Card, Avatar } from 'ant-design-vue';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons-vue';
</script>

<template>
    <div class="content">
        <h1>Esplora</h1>

        <div class="cards">

            <RouterLink class="link" to="/chat">
                <Card title="Nome della chat" extra="in corso" :bordered="false" size="small"
                    style="background-color: rgb(200, 230, 201);">
                    <div class="description">
                        <a-space align="start">
                            <Avatar shape="square" size="large" />
                            <div>
                                <p>
                                    Maecenas molestie eros id leo accumsan sagittis. Mauris malesuada, metus quis
                                    efficitur rutrum, lorem
                                    orci molestie ligula...
                                </p>
                                <div class="tags">
                                    <a-tag color="pink">free-role</a-tag>
                                    <a-tag color="blue">esplorazione</a-tag>
                                </div>
                            </div>
                        </a-space>
                    </div>
                    <div class="card-info">
                        <div class="status">
                            <a-tooltip placement="right" title="open" color="#3d3332">
                                <UnlockOutlined />
                            </a-tooltip>
                        </div>
                        <div class="author">
                            <p class="created-by">creata da: pippo</p>
                            <Avatar size="small" />
                        </div>
                    </div>
                </Card>
            </RouterLink>

            <Card title="Card title" extra="conclusa" :bordered="false" size="small">
                <div class="description">
                    <a-space align="start">
                        <Avatar shape="square" size="large" />
                        <div>
                            <p>
                                Suspendisse molestie ultricies neque sit amet mollis.
                                Donec euismod libero quis felis eleifend blandit pharetra in libero...
                            </p>
                            <div class="tags">
                                <a-tag color="red">pvp</a-tag>
                                <a-tag color="green">master</a-tag>
                                <a-tag color="purple">2x exp</a-tag>
                                <a-tag color="yellow">2x gold</a-tag>
                            </div>
                        </div>
                    </a-space>
                </div>
                <div class="card-info">
                    <div class="status">
                        <a-tooltip placement="right" title="close" color="#3d3332">
                            <LockOutlined />
                        </a-tooltip>
                    </div>
                    <div class="author">
                        <p class="created-by">creata da: Jon Snow</p>
                        <Avatar size="small" />
                    </div>
                </div>
            </Card>

            <Card title="Card title" extra="conclusa" :bordered="false" size="small">
                <div class="description">
                    <a-space align="start">
                        <Avatar shape="square" size="large" />
                        <div>
                            <p>Card content</p>
                            <p>Card content</p>
                            <div class="tags">
                                <a-tag color="red">pvp</a-tag>
                                <a-tag color="green">master</a-tag>
                                <a-tag color="gold">legendary-reward</a-tag>
                            </div>
                        </div>
                    </a-space>
                </div>
                <div class="card-info">
                    <div class="status">
                        <a-tooltip placement="right" title="close" color="#3d3332">
                            <LockOutlined />
                        </a-tooltip>
                    </div>
                    <div class="author">
                        <p class="created-by">creata da: Jon Snow</p>
                        <Avatar size="small" />
                    </div>
                </div>
            </Card>

            <Card :loading=true :bordered="false" size="small">
                <div class="description">
                    <a-space align="start">
                        <Avatar shape="square" size="large" />
                        <div>
                            <p>Card content</p>
                            <p>Card content</p>
                        </div>
                    </a-space>
                </div>
                <div class="card-info">
                    <div class="status">
                        <a-tooltip placement="right" title="close" color="#3d3332">
                            <LockOutlined />
                        </a-tooltip>
                    </div>
                    <div class="author">
                        <p class="created-by">creata da: Jon Snow</p>
                        <Avatar size="small" />
                    </div>
                </div>
            </Card>

            <Card :loading=true :bordered="false" size="small">
                <div class="description">
                    <a-space align="start">
                        <Avatar shape="square" size="large" />
                        <div>
                            <p>Card content</p>
                            <p>Card content</p>
                        </div>
                    </a-space>
                </div>
                <div class="card-info">
                    <div class="status">
                        <a-tooltip placement="right" title="close" color="#3d3332">
                            <LockOutlined />
                        </a-tooltip>
                    </div>
                    <div class="author">
                        <p class="created-by">creata da: Jon Snow</p>
                        <Avatar size="small" />
                    </div>
                </div>
            </Card>

            <Card :loading=true :bordered="false" size="small">
                <div class="description">
                    <a-space align="start">
                        <Avatar shape="square" size="large" />
                        <div>
                            <p>Card content</p>
                            <p>Card content</p>
                        </div>
                    </a-space>
                </div>
                <div class="card-info">
                    <div class="status">
                        <a-tooltip placement="right" title="close" color="#3d3332">
                            <LockOutlined />
                        </a-tooltip>
                    </div>
                    <div class="author">
                        <p class="created-by">creata da: Jon Snow</p>
                        <Avatar size="small" />
                    </div>
                </div>
            </Card>

            <Card :loading=true :bordered="false" size="small">
                <div class="description">
                    <a-space align="start">
                        <Avatar shape="square" size="large" />
                        <div>
                            <p>Card content</p>
                            <p>Card content</p>
                        </div>
                    </a-space>
                </div>
                <div class="card-info">
                    <div class="status">
                        <a-tooltip placement="right" title="close" color="#3d3332">
                            <LockOutlined />
                        </a-tooltip>
                    </div>
                    <div class="author">
                        <p class="created-by">creata da: Jon Snow</p>
                        <Avatar size="small" />
                    </div>
                </div>
            </Card>

        </div>
    </div>
</template>

<style>
.cards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-top: .8em;
    margin-bottom: 1em;
}

.ant-card {
    font-size: 16px;
    background-color: antiquewhite;
    border: 2px solid;
    border-bottom: 4px solid;
    border-right: 4px solid;
    border-color: rgba(0, 0, 0, .85);
}

.ant-card .ant-card-head {
    border-bottom: 2px solid rgba(0, 0, 0, .65);
}

.cards .description {
    margin-bottom: 2em;
}

.description .tags {
    margin-top: .2em;
}

.tags .ant-tag {
    margin: .2em .4em .2em 0;
}

.ant-card-body .card-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 12px 12px 8px 12px;
}

.ant-card-body .card-info .author {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.author .created-by {
    font-size: 12px;
    margin-right: .5em;
    color: rgba(0, 0, 0, .45);
}

@media only screen and (max-width: 1080px) {
    .cards {
        grid-template-columns: repeat(3, 2fr);
        grid-gap: 20px;
    }
}

@media only screen and (max-width: 768px) {
    .cards {
        grid-template-columns: repeat(2, 1fr);
    }

    /* 
    .card {
        width: 100%;
    }

    .card .content {
        font-size: 16px;
    } */
}

@media only screen and (max-width: 520px) {
    .cards {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>