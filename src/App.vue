<template>
    <div class="app-body">
        <Menu v-if="renderLayout === 'main'" />

        <div class="body" :class="renderLayout === 'main' ? 'has-menu' : 'no-menu'">
            <router-view></router-view>
            <Footer />
        </div>
    </div>
</template>

<script src="./app.ts" lang="ts"></script>
<style src="./app.scss" scoped></style>
