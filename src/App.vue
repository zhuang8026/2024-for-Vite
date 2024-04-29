<template>
    <Menu v-if="renderLayout === 'main'" />

    <router-view></router-view>
    Version {{ PROJECT_VERSION }}
</template>

<script src="./app.ts" lang="ts"></script>
<style scoped></style>
