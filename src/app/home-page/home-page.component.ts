import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { TaskModel } from '../task-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public tasks: Observable<TaskModel[]>

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.tasks = this.tasksService.getAll();
  }
}
