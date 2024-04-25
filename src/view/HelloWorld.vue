<script setup lang="ts">
import { ref } from 'vue';

import UiButton from '@/components/ui/UiButton/index.vue';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
    <h1>{{ msg }}</h1>

    <div class="card">
        <button type="button" @click="count++">count is {{ count }}</button>
        <UiButton />
    </div>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
