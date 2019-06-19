import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TasksService } from '../tasks.service';
import { TaskModel } from '../task-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UnsavedDialogComponent } from '../unsaved-dialog/unsaved-dialog.component';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public task: TaskModel;

  public taskForm = new FormGroup({
    'id': new FormControl({value: '', disabled: true}),
    'title': new FormControl('', Validators.required),
    'author': new FormControl(''),
    'assignee': new FormControl(''),
    'description': new FormControl('', Validators.required),
    'priority': new FormControl('')
})

  constructor(
    private router: Router,
    private tasksService: TasksService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
    ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = params.id;
      this.tasksService.getById(id).subscribe((task: TaskModel) => {
        this.task = task;

        this.taskForm = new FormGroup({
          'id': new FormControl(this.task.id),
          'title': new FormControl(this.task.title, Validators.required),
          'author': new FormControl(this.task.author),
          'assignee': new FormControl(this.task.assignee),
          'description': new FormControl(this.task.description, Validators.required),
          'priority': new FormControl(this.task.priority)
        });
      })
    }) 
  }

  ngOnInit() {

  }

  save(taskForm): void {
    this.tasksService.edit(taskForm.value)
      .subscribe(() => {
        this.goBack()
      });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  openUnsavedDialog(): void {
    if (!this.taskForm.touched){
      this.goBack();
      return;
    }
    const dialogRef = this.dialog.open(UnsavedDialogComponent, {
      height: '200px',
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.goBack();
      }
    });
  }

}
