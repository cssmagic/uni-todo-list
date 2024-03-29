export interface ITask {
	id?: string;	// 任务 ID，采用 UUID 格式（当创建任务时，缺省为空）
	title: string;	// 任务标题
	isCompleted: boolean;	// 是否已完成
	startDate?: Date;	// 开始时间（缺省为创建时间）
	endDate?: Date;	// 结束时间（标记为“已完成”的时间）
	dueDate?: Date;	// 截止时间（缺省为空，需要用户手动设置）
}
