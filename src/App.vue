<template>
    <router-view></router-view>
    Version {{ PROJECT_VERSION }}
</template>

<script setup lang="ts">
import { PROJECT_VERSION } from '@/config.ts';
</script>

<style scoped></style>
