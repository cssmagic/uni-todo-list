<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { ITask } from '@/types'
import * as storage from '@/utils/storage'

const $tasks = storage.getItems()

function onClickAddBtn() {
	const title = prompt('请输入任务标题：')
	if (title) {
		const task: ITask = {
			title,
			isCompleted: false,
		}
		storage.addItem(task)
	}
}
function onClickCheckbox(item: ITask) {
	item.isCompleted = !item.isCompleted
}
function onClickTaskTitle(item: ITask) {
	console.log('click:', item)
	const title = prompt('把任务标题修改为：', item.title)
	if (title) {
		item.title = title
	}
}
function deleteTask(item: ITask) {
	console.log('delete:', item.id)
	storage.deleteItem(item)
}

</script>

<template>
	<div class="content">
		<div class="main-view">
			<template v-if="!$tasks.length">
				Empty, <span @click="onClickAddBtn">[Add]</span>
			</template>
			<div class="task-list" v-else>
				<div
					class="task-item"
					v-for="item in $tasks"
					:key="item.id"
					:class="item.isCompleted ? 'is-completed' : ''"
					:data-id="item.id"
				>
					<div class="task-status">
						<checkbox
							:checked="!!item.isCompleted"
							@click="onClickCheckbox(item)"
						/>
					</div>
					<span class="task-title" @click="onClickTaskTitle(item)">{{ item.title }}</span>
					<div class="task-action">
						<text @click="deleteTask(item)">[Delete]</text>
					</div>
				</div>
				<div class="action">
					<hr>
					<span @click="onClickAddBtn">[Add]</span>
				</div>
			</div>
			<div class="detail-view">
				<!--TODO-->
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
	// 子元素水平居中
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

// task item
.is-completed .task-title {
	text-decoration: line-through;
	color: #999;
}


</style>
