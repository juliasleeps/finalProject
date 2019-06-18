export class TaskModel {
    constructor(
        public id: string,
        public title: string,
        public author: string,
        public assignee: string,
        public description: string,
        public priority: string
    ){
    }
}
