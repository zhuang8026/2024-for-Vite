<template>
    <div>
        <span v-for="(txt, index) in formattedI18n" :key="index">
            <span v-if="txt.indexOf('//') != -1" class="clickable" @click="onClick(index)">
                {{ txt.replace(/\/\//g, '') }}
            </span>
            <span v-else>{{ txt }}</span>
        </span>
    </div>
</template>
<script src="./FormattedI18n.ts" lang="ts"></script>
<style src="./FormattedI18n.scss" scoped lang="scss"></style>
