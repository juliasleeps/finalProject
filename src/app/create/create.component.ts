import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TaskModel } from "../task-model";
import { TasksService } from "../tasks.service";
import { MatDialog } from "@angular/material/dialog";
import { UnsavedDialogComponent } from "../unsaved-dialog/unsaved-dialog.component";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  public task: TaskModel;
  public readonly priorities: number[] = [1, 2, 3];

  public taskForm = new FormGroup({
    id: new FormControl({ value: "", disabled: true }),
    title: new FormControl("", Validators.required),
    author: new FormControl(),
    assignee: new FormControl(),
    description: new FormControl("", Validators.required),
    priority: new FormControl(this.priorities[0])
  });

  constructor(
    private router: Router,
    private tasksService: TasksService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  add(taskForm): void {
    this.tasksService.addNew(taskForm.value).subscribe(() => {
      this.goBack();
    });
  }

  goBack() {
    this.router.navigate(["/"]);
  }

  openUnsavedDialog(): boolean {
    if (!this.taskForm.touched) {
      this.goBack();
      return false;
    }
    const dialogRef = this.dialog.open(UnsavedDialogComponent, {
      height: "200px",
      width: "300px",
      position: {
        top: "",
        bottom: "",
        left: "",
        right: ""
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.goBack();
      }
    });

    return false;
  }
}
