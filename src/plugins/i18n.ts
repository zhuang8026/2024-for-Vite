import { createI18n } from 'vue-i18n';
import zh from '@/assets/languages/zh-TW.json';
import en from '@/assets/languages/en-US.json';

type MessageSchema = typeof zh;

const i18n = createI18n<[MessageSchema], 'zh-TW' | 'en-US'>({
    legacy: false, // 要把 legacy 設為 false，才可以使用 Composition API
    locale: 'en-US', // 預設
    fallbackLocale: 'en-US', // 預設
    globalInjection: true, // 全域
    messages: {
        'zh-TW': zh,
        'en-US': en
    }
});

export default i18n;
