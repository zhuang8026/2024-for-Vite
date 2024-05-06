<template>
    <section class="menu">
        <h4>{{$t('menu.menu')}}</h4>
        <ul class="">
            <li v-for="(submenu, subIndex) in menu">
                <p class="" v-if="submenu.isShow">
                    {{ submenu.main }}
                </p>
                <ul class="sub-menu">
                    <li v-for="(item, index) in submenu.subList">
                        <a
                            v-if="item.isShow"
                            class="sub-menu-item"
                            href="javascript:;"
                            @click="onClickMenu(item.link, `${subIndex}-${index}`)"
                        >
                            <!-- <span class="border-box pr-xs-x">
                                <img :src="item.icon" :alt="item.name"/>
                            </span> -->
                            <span>{{ item.name }}</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
        <br /><br />
        <button @click="logout">Logout</button>
    </section>
</template>
<script src="./Menu.ts" lang="ts"></script>
<style src="./Menu.scss" scoped lang="scss"></style>
