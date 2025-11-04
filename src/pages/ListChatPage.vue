<script setup>
import { Card, Col, Row } from 'ant-design-vue';
</script>

<template>
    <div class="content">
        <h1>Esplora</h1>

        <div style="display: flex; justify-content: flex-start; margin-top: 1em;">
            <Card title="Card title" :bordered="false" size="small">
                <p>Maecenas molestie eros id leo accumsan sagittis. Mauris malesuada, metus quis efficitur rutrum, lorem
                    orci molestie ligula,</p>
            </Card>

            <Card title="Card title" :bordered="false">
                <p>Card content</p>
            </Card>

            <Card title="Card title" :bordered="false">
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </div>

    </div>
</template>

<style>
.ant-card {
    width: 400px;
    margin-right: 1em;
    background-color: antiquewhite;
}

.ant-card .ant-card-head {
    border-bottom: 2px solid rgba(0, 0, 0, .65);
}
</style>