import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskModel } from './task-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  readonly url: string = 'http://localhost:3000/tasks';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<TaskModel[]> {
    return this.httpClient.get<TaskModel[]>(this.url)
      .pipe(
        map((response: TaskModel[]) => {
          const tasks: TaskModel[] = [];
          response.forEach((task: TaskModel) => {
            tasks.push()
          });
          return tasks;
        }
        )
      );
  }
}



// return new TaskModel(
//   id: el.id,
//   title: el.title,
//   details: {
//       author: el.author,
//       assignee: el.assignee,
//       description: el.description,
//       priority: el.priority
