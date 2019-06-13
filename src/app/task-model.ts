export class TaskModel {
    id: number;
    title: string;
    details: {
        author: string;
        assignee: string;
        description: string;
        priority: string;
    }
}
