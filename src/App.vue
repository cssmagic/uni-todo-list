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
body {
	font-family: 'Arial', sans-serif;
	font-size: 16px;
	line-height: 1;
}

// 让页面主体区域占满整个屏幕，以便实现两列布局
uni-page-body {
	height: 100%;
}
</style>
