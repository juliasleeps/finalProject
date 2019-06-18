import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaskModel } from './task-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  readonly url: string = 'http://localhost:3000/tasks';
  readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<TaskModel[]> {
    return this.httpClient.get<TaskModel[]>(this.url)
      .pipe(
        map((response: TaskModel[]) => {
          const tasks: TaskModel[] = [];
          response.forEach((task: TaskModel) => {
            tasks.push(
              new TaskModel(
                task.id,
                task.title,
                task.author,
                task.assignee,
                task.description,
                task.priority
              )
            )
          });
          return tasks;
        }
        )
      );
  }

  getById(id: number):  Observable<TaskModel> {
    return this.httpClient.get(`${this.url}/${id}`).pipe(
      map((response: TaskModel) => {
        return new TaskModel(
          response.id,
          response.title,
          response.author,
          response.assignee,
          response.description,
          response.priority
        )
      })
    )
  }

  edit(task): Observable<TaskModel> {
    return this.httpClient.put(`${this.url}/${task.id}`, task, this.httpOptions).pipe(
      map((result: TaskModel) => result)
    )
  }

  addNew(task): Observable<TaskModel> {
    return this.httpClient.post(this.url, task, this.httpOptions).pipe(
      map((response: TaskModel) => {
        return new TaskModel(
          response.id,
          response.title,
          response.author,
          response.assignee,
          response.description,
          response.priority
        )
      })
    )
  }

  delete(id: string): Observable<TaskModel> {
    return this.httpClient.delete(`${this.url}/${id}`).pipe(
      map((response: TaskModel) => {return response}
      )
    )
  }
}

