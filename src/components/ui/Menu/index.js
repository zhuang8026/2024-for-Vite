import Menu from './index.vue';
Menu.install = app => {
    app.component(Menu.name, Menu);
};
export default Menu;
