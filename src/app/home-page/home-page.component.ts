import { Component, OnInit } from "@angular/core";
import { TasksService } from "../tasks.service";
import { TaskModel } from "../task-model";
import { Observable, of } from "rxjs";
import { catchError, filter, map } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { TaskInfoDialogComponent } from "../task-info-dialog/task-info-dialog.component";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  public tasks: Observable<TaskModel[]>;

  constructor(public dialog: MatDialog, private tasksService: TasksService) {}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.tasks = this.tasksService.getAll().pipe(
      catchError(err => {
        throw new Error(err);
      })
    );
  }

  deleteTask(id: string) {
    this.tasksService.delete(id).subscribe(() => {
      this.getAllTasks();
    });
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      // height: '200px',
      // width: '300px',
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(id);
      }
    });
  }

  openInfoDialog(val: TaskModel): void {
    const dialogRef = this.dialog.open(TaskInfoDialogComponent, {
      height: "300px",
      width: "300px",
      data: {
        id: val.id,
        title: val.title,
        author: val.author,
        assignee: val.assignee,
        description: val.description,
        priority: val.priority
      }
    });
  }

  filterTasks(criteria: string): Observable<TaskModel[]> {
    if (criteria) {
      this.tasks = this.tasks.pipe(
        map((tasks: TaskModel[]) => {
          const tests = [];
          tasks.forEach(task => {
            if (task.title.includes(criteria)) {
              tests.push(task);
            }
          });
          return tests;
        })
      );
    }
    return this.tasks;
  }

  searchTask(search: HTMLInputElement): void {
    this.filterTasks(search.value);
  }
}
