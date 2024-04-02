# uni-todo-list

> “呆呆清单” App 源代码，基于 Uni-app 框架。

## 概况

* 基于 Uni-app 框架，采用 Vue 3 语法，采用 uni-ui 组件库。
* 采用 Node 开发方式。（确实不太方便，后期可能改为 HBuilderX 开发方式。）
* 特性：
	* 响应式布局，为宽屏设备设计了单独的交互方式。
	* 仅使用本地存储保存用户数据。

## 开发

1. 把代码仓库克隆到本地。
1. 在项目根目录执行 `npm install` 或 `yarn` 安装依赖。
1. 运行开发环境（Web）：`npm run dev:h5`。


## 构建

* Web：
	1. 运行 `npm run build:h5`。
	1. 把 `/dist/build/h5` 目录下的文件部署到 Web 服务器。
* 微信小程序：
	1. 运行 `npm run build:mp-weixin`。
	1. 在微信开发者工具中导入 `/dist/build/mp-weixin` 目录。
	1. 在微信开发者工具中预览或发布。
* Android App：
	1. 运行 `npm run build:app-android`。
	1. 在 HBuilderX 中导入 `/dist/build/app` 目录。
	1. 进行云打包。
	1. 在 `/dist/build/app/unpackage/release/apk/` 目录找到 APK 文件，安装到 Android 手机上。

## 演示

* Web：https://todo.cmcm.app/

* Android App：请在 [最新 Release](https://github.com/cssmagic/uni-todo-list/releases/latest) 的 Assets 中下载 APK 文件。

* 微信小程序：

	<img src="https://github.com/cssmagic/uni-todo-list/assets/1231359/16711a50-ab18-4cfe-993b-63132759c2f2" width="129" height="129">


***

## License

GPLv3
