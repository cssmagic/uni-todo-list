<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { ITask } from '@/types'
import type { UniPopup } from '@uni-helper/uni-ui-types'
import * as storage from '@/utils/storage'
import { toSimpleDateTime } from '@/utils/formatter'
import TaskDetail from '@/components/TaskDetail.vue'

const $tasks = storage.getItems()
const $screenMode = ref<'normal' | 'wide'>('normal')
const $safeAreaBottom = ref(0)	// 底部安全距离
const $dialogInputTitle = ref<UniPopup>()
const $dialogDelete = ref<UniPopup>()
const titleCreate = '添加新任务'
const titleEdit = '修改任务标题'
const confirmTextCreate = '确定'
const confirmTextEdit = '保存'
const $dialogTitle = ref('')
const $confirmText = ref('')
const $currentTaskTitle = ref('')
const $promptDeleteTask = ref('')
let currentAction: ('create' | 'edit') = 'create'
const $currentTask = ref<null | ITask>(null)

function init() {
	const systemInfo = uni.getSystemInfoSync()
	// 处理底部安全区域（待验证）
	$safeAreaBottom.value = systemInfo.safeAreaInsets?.bottom || 0
	// 处理屏幕拉伸和旋转
	uni.onWindowResize((result) => {
		const windowWidth = result.size.windowWidth
		_detectScreenMode(windowWidth)
	})
	_detectScreenMode(systemInfo.windowWidth)
}

function _detectScreenMode(windowWidth: number) {
	$screenMode.value = windowWidth > 768 ? 'wide' : 'normal'
}

function onClickAddBtn() {
	// 更新状态
	currentAction = 'create'
	$currentTask.value = null
	$currentTaskTitle.value = ''

	$dialogTitle.value = titleCreate
	$confirmText.value = confirmTextCreate

	$dialogInputTitle.value!.open()
}

function onClickTaskTitle(item: ITask) {
	if ($screenMode.value === 'wide') {
		$currentTask.value = item
		return
	}

	// 更新状态
	currentAction = 'edit'
	$currentTask.value = item
	$currentTaskTitle.value = item.title

	$dialogTitle.value = titleEdit
	$confirmText.value = confirmTextEdit

	$dialogInputTitle.value!.open()
}

function onChangeCheckbox(item: ITask) {
	// console.log('toggle:', item.id)
	item.isCompleted = !item.isCompleted
	$currentTask.value = item
}

function deleteTask(item: ITask) {
	// console.log('delete:', item.id)
	$currentTask.value = item
	$promptDeleteTask.value = `是否删除 “${item.title}”？`

	$dialogDelete.value!.open()
}

function onSaveTaskDetail(data: object) {
	console.log('save:', data)
	if ($currentTask.value) {
		$currentTask.value.title = data.title
	}
}

function dialogInputConfirm(value: string) {
	const now = toSimpleDateTime(new Date())
	const title = value || `未命名任务 (${now})`
	const task: ITask = {
		title,
		isCompleted: false,
	}
	if (currentAction === 'create') {
		storage.addItem(task)
	} else {
		if ($currentTask.value) {
			$currentTask.value.title = title
		}
	}
	// 把暂存变量清空
	$currentTask.value = null
}

function dialogDeleteConfirm() {
	if ($currentTask.value) {
		storage.deleteItem($currentTask.value)
	}
	// 把暂存变量清空
	$currentTask.value = null
}

// init
init()

</script>

<template>
	<div class="content" :class="$screenMode">
		<div class="main-view">
			<div v-if="!$tasks.length" class="empty">
				<div>（你的任务清单空空如也）</div>
				<div class="add">
					<button
						size="mini"
						type="default"
						hover-class="is-hover"
						@click="onClickAddBtn"
					>
						<uni-icons type="plusempty" size="12" color="currentColor"></uni-icons>
						<span style="margin-left: 5px;">添加任务</span>
					</button>
				</div>
			</div>
			<div class="task-list" v-else>
				<div
					v-for="item in $tasks"
					:key="item.id"
					class="task-item"
					:class="[
						item.isCompleted ? 'is-completed' : '',
						item.id === $currentTask?.id ? 'is-current' : ''
					]"
					:data-id="item.id"
				>
					<checkbox-group class="task-status" @change="onChangeCheckbox(item)">
						<label class="task-status-label">
							<checkbox
								:checked="!!item.isCompleted"
							/>
						</label>
					</checkbox-group>
					<div class="task-title" @click="onClickTaskTitle(item)">
						{{ item.title }}
					</div>
					<div class="task-action" @click="deleteTask(item)" v-if="$screenMode !== 'wide'">
						<uni-icons type="trash" size="24" color="currentColor"></uni-icons>
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
				<label class="action-inner" :style="{ marginBottom: $safeAreaBottom + 'px' }">
					<button
						size="default"
						type="primary"
						hover-class="is-hover"
						@click="onClickAddBtn"
					>
						<uni-icons type="plusempty" size="16" color="currentColor"></uni-icons>
						<span style="margin-left: 5px;">添加任务</span>
					</button>
				</label>
			</div>
		</div>

		<div class="detail-view" v-if="$screenMode === 'wide'">
			<div v-if="!$currentTask" class="empty">
				（当前没有选中的任务）
			</div>
			<div v-else class="detail-wrapper">
				<TaskDetail
					:isEditing="true"
					:task="$currentTask"
					@delete="deleteTask"
					@submit="onSaveTaskDetail"
				></TaskDetail>
			</div>
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
.empty {
	padding-top: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	color: #999;
}

.main-view {
	flex: 1;
	overflow-x: hidden;
	overflow-y: hidden;
	position: relative;
	.content.wide & {
		max-width: 500px;
	}
	.empty {
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
}

.detail-view {
	flex: 1;
	overflow-x: hidden;
	overflow-y: auto;
	border-left: 1px solid $color-splitter;
	background-color: $bg-color-stage;
	.detail-wrapper {
		margin: auto;
		padding: 20px;
		max-width: 500px;
	}
}


// task item
.task-list {
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
}
.task-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid $color-hr;
	&:hover {
		background-color: $bg-color-hover;
	}
	// 仅在宽屏状态下显示激活效果
	.wide &.is-current {
		background-color: $bg-color-active;
	}
	.task-status {
		flex: 0 0;
		.task-status-label {
			display: block;
			padding: 20px;
		}
	}
	.task-title {
		flex: 1 1;
		font-weight: bold;
		align-self: stretch;
		display: flex;
		line-height: $lh;
		align-items: center;
		padding: 20px 0;
		cursor: pointer;
	}
	.task-action {
		flex: 0 0;
		padding: 20px;
		color: #999;
		cursor: pointer;
		&:hover {
			color: #333;
		}
	}
	&.is-completed .task-title {
		text-decoration: line-through;
		color: #ccc;
	}
}

.total {
	padding: 20px;
	padding-bottom: 110px;
	color: #999;
	text-align: center;
}


// action
.action {
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.3);
}
.action-inner {
	padding: 15px 20px;
	width: 100%;
}


</style>
