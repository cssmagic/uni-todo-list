<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
	console.log('App Launch')
})
onShow(() => {
	console.log('App Show')
})
onHide(() => {
	console.log('App Hide')
})
</script>

<style lang="scss">
uni-page-head {
	font-family: 'Arial', sans-serif;
}
page,
uni-page-body {
	// 让页面主体区域占满整个屏幕，以便实现两列布局
	height: 100%;

	font-family: 'Arial', sans-serif;
	font-size: $fs;
	line-height: 1;
	color: $color;
	background: $bg-color;
}
</style>
