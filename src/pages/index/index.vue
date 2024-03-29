<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { ITask } from '@/types'
import type { UniPopup } from '@uni-helper/uni-ui-types'
import * as storage from '@/utils/storage'

const $tasks = storage.getItems()
const $dialogInputTitle = ref<UniPopup>()
const $dialogDelete = ref<UniPopup>()
const titleCreate = '创建新任务'
const titleEdit = '修改任务标题'
const confirmTextCreate = '创建'
const confirmTextEdit = '保存'
const $dialogTitle = ref('')
const $confirmText = ref('')
const $currentTaskTitle = ref('')
const $promptDeleteTask = ref('')
let currentAction = 'create'	// 'create' | 'edit'
let currentTask: null | ITask = null

function onClickAddBtn() {
	// 更新状态
	currentAction = 'create'
	currentTask = null
	$currentTaskTitle.value = ''

	$dialogTitle.value = titleCreate
	$confirmText.value = confirmTextCreate

	$dialogInputTitle.value!.open()
}

function onClickTaskTitle(item: ITask) {
	// 更新状态
	currentAction = 'edit'
	currentTask = item
	$currentTaskTitle.value = item.title

	$dialogTitle.value = titleEdit
	$confirmText.value = confirmTextEdit

	$dialogInputTitle.value!.open()
}

function onClickCheckbox(item: ITask) {
	item.isCompleted = !item.isCompleted
}

function deleteTask(item: ITask) {
	console.log('delete:', item.id)
	currentTask = item
	$promptDeleteTask.value = `是否删除 “${item.title}”？`

	$dialogDelete.value!.open()
}

function dialogInputConfirm(value: string) {
	const title = value || '未命名任务'
	const task: ITask = {
		title,
		isCompleted: false,
	}
	if (currentAction === 'create') {
		storage.addItem(task)
	} else {
		if (currentTask) {
			currentTask.title = title
		}
	}
	// 把暂存变量清空
	currentTask = null
}

function dialogDeleteConfirm() {
	if (currentTask) {
		storage.deleteItem(currentTask)
	}
	// 把暂存变量清空
	currentTask = null
}

</script>

<template>
	<div class="content">
		<div class="main-view">
			<div v-if="!$tasks.length" class="empty">
				<div>（你的任务清单空空如也）</div>
				<div class="add" @click="onClickAddBtn">点此创建新任务</div>
			</div>
			<div class="task-list" v-else>
				<div
					v-for="item in $tasks"
					:key="item.id"
					class="task-item"
					:class="item.isCompleted ? 'is-completed' : ''"
					:data-id="item.id"
				>
					<label class="task-status">
						<checkbox
							:checked="!!item.isCompleted"
							@click="onClickCheckbox(item)"
						/>
					</label>
					<div class="task-title" @click="onClickTaskTitle(item)">
						{{ item.title }}
					</div>
					<div class="task-action" @click="deleteTask(item)">
						<text>[Delete]</text>
					</div>
				</div>
				<div class="total">共 {{ $tasks.length }} 个任务</div>
			</div>


			<uni-popup ref="$dialogInputTitle" type="dialog">
				<uni-popup-dialog
					mode="input"
					:title="$dialogTitle"
					v-model="$currentTaskTitle"
					placeholder="请输入任务标题"
					:confirmText="$confirmText"
					cancelText="取消"
					@confirm="dialogInputConfirm"
				></uni-popup-dialog>
			</uni-popup>

			<uni-popup ref="$dialogDelete" type="dialog">
				<uni-popup-dialog
					mode="base"
					title="确认删除"
					:content="$promptDeleteTask"
					confirmText="确认"
					cancelText="取消"
					@confirm="dialogDeleteConfirm"
				></uni-popup-dialog>
			</uni-popup>


			<div class="action">
				<label class="action-inner">
					<button
						size="default"
						type="primary"
						hover-class="is-hover"
						@click="onClickAddBtn"
					>创建新任务
					</button>
				</label>
			</div>
		</div>
		<div class="detail-view">
			<!--TODO-->
		</div>
	</div>
</template>

<style scoped lang="scss">
.content {
	// font-size: $fs-xl;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
}
.main-view {
	flex: 1;
	max-width: 640px;
	overflow-x: hidden;
	overflow-y: auto;
}
.detail-view {
	display: none;
	flex: 1;
	overflow-x: hidden;
	overflow-y: auto;
}

.empty {
	padding-top: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	color: #999;
	.add {
		margin-top: 20px;
		padding: 10px;
		text-decoration: underline;
		cursor: pointer;
		&:hover {
			color: #333;
		}
	}
}

// task item
.task-list {
	padding-bottom: 100px;
}
.task-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #ddd;
	.task-status {
		flex: 0 0;
		padding: 20px;
	}
	.task-title {
		flex: 1 1;
		align-self: stretch;
		display: flex;
		align-items: center;
		padding: 20px;
		cursor: pointer;
	}
	.task-action {
		flex: 0 0;
		padding: 20px;
		cursor: pointer;
	}
	&.is-completed .task-title {
		text-decoration: line-through;
		color: #999;
	}
}

.total {
	padding: 20px;
	color: #999;
	text-align: center;
}


// action
.action {
	display: flex;
	justify-content: center;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #0006;
}
.action-inner {
	padding: 15px 20px;
	width: 100%;
	max-width: 640px;
}


</style>
