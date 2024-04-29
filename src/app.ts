// framework
import { computed, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// pinia
import { useGlobalStore } from '@/store';

// component & style
import Menu from '@/components/ui/Menu';

// enum 映射
// import { COOKIE_NAME } from '@/assets/enum/enum';

// utils
// import { openLoading, closeLoading } from '@/utils/globalUtils';
import { setCookie, getCookie } from '@/utils/cookie';

//api
// import { apiLogin, apiGetMyInfo } from '@/api/api.ts';

// version
import { PROJECT_VERSION } from '@/config.ts';

const App = {
    name: 'App',
    components: {
        Menu
    },
    props: {},
    setup() {
        // let router = useRouter();
        const route = useRoute();
        // let store = useGlobalStore();

        // check current page layout
        let renderLayout = computed(() => {
            return route.meta.layout;
        });
        return {
            PROJECT_VERSION,
            renderLayout
        };
    }
};

export default App;
