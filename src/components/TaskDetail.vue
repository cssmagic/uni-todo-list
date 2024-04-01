<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { ITask } from '@/types'
import type { UniEasyinput } from '@uni-helper/uni-ui-types'
import * as storage from '@/utils/storage'

const props = defineProps<{
	task: ITask,
	isEditing: boolean,
}>()

const emit = defineEmits([
	'delete',
	'submit',
])

const $taskTitle = ref(props.task.title)

watch(() => props.task, (task) => {
	$taskTitle.value = task.title
})

function onClickBtnDelete() {
	// console.log('delete:', props.task)
	emit('delete', props.task)
}
function onClickBtnSave() {
	// console.log('save:', $taskTitle.value)
	emit('submit', { title: $taskTitle.value })
}

</script>

<template>
	<div>
		<div class="top-action">
			<div class="btn-delete" @click="onClickBtnDelete">
				<uni-icons type="trash" size="24" color="currentColor"></uni-icons>
			</div>
		</div>
		<div class="form">
			<div class="uni-form-item">
				<div class="title">任务标题</div>
				<uni-easyinput
					name="title"
					autoHeight
					type="textarea"
					v-model.lazy.trim="$taskTitle"
					placeholder="请输入任务标题"
				/>
			</div>
		</div>
		<div class="action">
			<button
				class="btn-save"
				size="default"
				type="primary"
				hover-class="is-hover"
				@click="onClickBtnSave"
			>
				<span>保存</span>
			</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.top-action {
	display: flex;
	justify-content: flex-end;
	.btn-delete {
		margin-right: -10px;
		padding: 10px;
		color: #999;
		cursor: pointer;
		&:hover {
			color: #333;
		}
	}
}

.form {
	.uni-form-item {
		.title {
			font-size: 14px;
			color: #666;
			margin-bottom: 10px;
		}
	}
}
.action {
	margin-top: 20px;
}

</style>
