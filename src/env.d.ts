/// <reference types="vite/client" />
/// <reference types="@dcloudio/types" />
/// <reference types="miniprogram-api-typings" />
/// <reference types="@uni-helper/uni-app-types" />
/// <reference types="@uni-helper/uni-ui-types" />

declare module '*.vue' {
	import { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}
