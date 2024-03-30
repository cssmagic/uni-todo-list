// 本地存储的行为：
// - 读：只需要在应用初始化时读取数据
// - 写：只要数据有变更，就需要写入

import type { ITask } from '@/types'
import { v4 as uuid } from 'uuid'
import { ref, reactive, watch } from 'vue'

const demoData: Array<ITask> = [
	{ id: '1c41909a-663f-4362-8359-ab09c653e7e2', title: 'Learn Vue 3', isCompleted: true },
	{ id: '4b2eae19-3393-4d68-b182-fa5e71cee1ad', title: 'Learn TypeScript', isCompleted: false },
	{ id: '6e6b986a-5c65-4cea-a4bf-9398f0d1fbbf', title: 'Learn Uni-App', isCompleted: false },
]

const STORAGE_KEY = 'tasks'

const $storage = ref<Array<ITask>>([])

function save() {
	uni.setStorageSync(STORAGE_KEY, $storage.value)
}

function initStorage() {
	// 如果本地存储中没有数据，则写入 demo 数据
	if (!uni.getStorageSync(STORAGE_KEY)) {
		uni.setStorageSync(STORAGE_KEY, demoData)
	}
}

// init
watch($storage, save, { deep: true })

// exports
export function getItems() {
	initStorage()
	const storage = uni.getStorageSync(STORAGE_KEY)
	$storage.value = storage
	return $storage
}

export function addItem(item: ITask) {
	if (!item.id) item.id = uuid()
	$storage.value.push(item)
}

export function deleteItem(item: ITask) {
	const index = $storage.value.findIndex(task => task.id === item.id)
	$storage.value.splice(index, 1)
}
