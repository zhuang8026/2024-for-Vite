import { computed, ref, reactive, onMounted } from 'vue';

// utils
import { useI18n } from 'vue-i18n';

export default {
    name: 'formatted-i-18-n',
    components: {},
    props: {
        text_key: {
            type: String,
            default: ''
        },
        theme: {
            type: [Object, String],
            default: 'white' //white,black
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    setup(props, { emit }) {
        const { t } = useI18n();

        // const formattedI18n = (text_key: String) => {
        //     // 將文字中的"//"標記轉換為可點擊的 span 標籤
        //     let arr = t(`${text_key}`).split(/(\/\/.*?\/\/)/);
        //     console.log('formattedI18n:', arr);

        //     return arr;
        // };

        const formattedI18n = computed(() => {
            let arr = t(`${props.text_key}`).split(/(\/\/.*?\/\/)/);
            console.log('formattedI18n:', arr);
            return arr;
        });

        let onClick = index => {
            console.log('onClick', index);
            // emit('update:active', id);
            emit('onClick', index);
        };

        // onMounted(() => {
        //     formattedI18n(props.text_key);
        // });
        return {
            onClick,
            formattedI18n
        };
    }
};
