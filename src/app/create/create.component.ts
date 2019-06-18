import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskModel } from '../task-model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public task: TaskModel;

  public taskForm = new FormGroup({
    'id': new FormControl({value: '', disabled: true}),
    'title': new FormControl('', Validators.required),
    'author': new FormControl(),
    'assignee': new FormControl(),
    'description': new FormControl('', Validators.required),
    'priority': new FormControl()
  });
  
  constructor(private router: Router, private tasksService: TasksService) { }

  ngOnInit() {
  }

  add(taskForm): void {
    console.log(taskForm.value);
    this.tasksService.addNew(taskForm.value)
      .subscribe(() => {
        this.goBack()
      });
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
