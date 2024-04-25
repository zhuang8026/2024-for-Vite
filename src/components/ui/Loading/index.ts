import { createApp, reactive,watchEffect } from 'vue'

import uiLoading from './index.vue';
import iconLoading from '@/assets/images/global-loading.png';

// 初始值
const obj = reactive({
	show: false,
	text: 'Loading',
	img:'',
	target:'body',
	textColor:'#fff',
	bgColor:"rgba(0, 0, 0, 0.7)",
	position:'fixed',
	scrollLock:true,
});

// create component
const $loading = createApp(uiLoading, {obj}).mount(typeof document !== 'undefined'? (typeof document.createElement !== 'undefined'? document.createElement('div'):'') :'')

// contrl loading status
const Loading = {
	// 控制顯示loading的方法
	show(data) {
		obj.show = true
		if(data!=undefined){
			obj.text 	   = data.text!=undefined       ? data.text:obj.text;
			obj.target     = data.target!=undefined     ? data.target:obj.target;
			obj.scrollLock = data.scrollLock!=undefined ? data.scrollLock:obj.scrollLock;
			obj.textColor  = data.textColor!=undefined  ? data.textColor:obj.textColor;
			obj.bgColor    = data.bgColor!=undefined    ? data.bgColor:obj.bgColor;
			obj.img 	   = data.img!=undefined 	    ? data.img: iconLoading;

			watchEffect(()=>{
				if(data.target!=undefined){
					if(obj.scrollLock){
						if(typeof document !== 'undefined'){
							document.querySelector(data.target).classList.add("loading-parentClass")
						}
					}else{
						setTimeout(()=>{
						if(typeof document !== 'undefined'){
							document.querySelector(data.target).classList.remove("loading-parentClass")
						}
						},500)
					}
				}else{
					if(obj.scrollLock){
						if(typeof document !== 'undefined'){
							document.body.classList.add("loading-parentClass")
						}
					}else{
						if(typeof document !== 'undefined'){
							document.body.classList.remove("loading-parentClass")
						}
					}
				}
			});

			if(data.target!=undefined){
				if(typeof document !== 'undefined'){
					document.querySelector(data.target).appendChild($loading.$el);
				};
				obj.position = 'absolute';
			}else{
				if(typeof document !== 'undefined'){
					document.body.appendChild($loading.$el);
				};
				obj.position = 'fixed';
			};

		}else{
			if(typeof document !== 'undefined'){
				document.body.appendChild($loading.$el);
			};
		}

	},

	// 控制loading隐藏的方法
	hide() {
		obj.show = false;
		if(obj.target!='body'){
			setTimeout(()=>{
				if(typeof document !== 'undefined'){
					document.querySelector(obj.target).classList.remove("loading-parentClass");
				};
			},500);
		}else{
			if(typeof document !== 'undefined'){
				document.body.classList.remove("loading-parentClass");
			};
		};
	}
}

export default Loading;