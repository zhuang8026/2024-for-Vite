import { createI18n } from 'vue-i18n';
import zh from '@/assets/languages/zh-TW.json';
import en from '@/assets/languages/en-US.json';

// enum 映射
import { COOKIE_NAME } from '@/assets/enum/enum';
import { setCookie, getCookie } from '@/utils/cookie';

const LANG = getCookie(COOKIE_NAME.LANG);

type MessageSchema = typeof zh;

const i18n = createI18n<[MessageSchema], 'zh-TW' | 'en-US'>({
    legacy: false, // 要把 legacy 設為 false，才可以使用 Composition API
    locale: LANG ||'en-US', // 預設 (允许用户在不同的环境中选择默认语言)
    fallbackLocale: 'en-US', // 預設 (如果当前语言的翻译文本不存在，则会回退到此语言)
    globalInjection: true, // 全域
    messages: {
        'zh-TW': zh,
        'en-US': en
    }
});

export default i18n;
