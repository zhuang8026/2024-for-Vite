import { computed, reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// enum 映射
import { COOKIE_NAME } from '@/assets/enum/enum';

// utils
import { useI18n } from 'vue-i18n';
// import { openLoading, closeLoading } from '@/utils/globalUtils';
import { setCookie, getCookie, eraseCookie } from '@/utils/cookie';

// import { apiLogout } from '@/api/api.ts';

import FormattedI18n from '@/components/ui/FormattedI18n';

export default {
    name: 'dashboard',
    components: { FormattedI18n },
    props: [],
    setup() {
        let router = useRouter();
        const { t, locale } = useI18n();
        const selectedLanguage = ref('zh-TW');

        const formattedI18n = (text_key: String) => {
            // 將文字中的"//"標記轉換為可點擊的 span 標籤
            // console.log(t('dashboard_desc').replace(/\/\/(.*?)\/\//g, ' '));
            console.log(t(`${text_key}`).split('//'));
            // return t('dashboard_desc').replace(
            //     /\/\/(.*?)\/\//g,
            //     '<a class="clickable" @click="handleClick">$1</a>'
            // );
        };

        const handleClick = index => {
            // 點擊事件處理函數

            alert('handleClick ->' + index);
        };

        const handleClick2 = index => {
            // 點擊事件處理函數
            alert('handleClick2 ->' + index);
        };

        // 語言轉換
        const handleChangeLanguage = e => {
            locale.value = e.target.value;
            selectedLanguage.value = e.target.value;
            setCookie(COOKIE_NAME.LANG, e.target.value);

        };

        onMounted(() => {
            let lang = getCookie(COOKIE_NAME.LANG);
            if (!lang) {
                lang = 'zh-TW';
                setCookie(COOKIE_NAME.LANG, lang);
            }
            selectedLanguage.value = lang;
        })
        return {
            selectedLanguage,
            handleChangeLanguage,
            formattedI18n,
            handleClick,
            handleClick2
        };
    }
};
