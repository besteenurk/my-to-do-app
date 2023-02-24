import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TaskListService} from "./task-list.service";
import {List} from "./list";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnChanges {
  @Input() refreshList: boolean | undefined;
  @Input()
  data: List[] = [];
  durationInSeconds = 5;

  constructor(
    private listComponentService: TaskListService,
    private _snackBar: MatSnackBar
  ) {
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Close', {duration: 2000});
  }

  ngOnInit(): void {
    this.getList()
  }

  getList(): void {
    this.listComponentService.getToDoList()
      .subscribe(list => this.data = list);
  }


  changeTaskStatus(id: number,index: number, value: List) {
    const obj = {
      ...value,
      status: !value.status
    }
    const data = JSON.stringify(obj);
    this.listComponentService.changeTaskStatus(id, data).subscribe(res => {
      this.getList();
      if (!value.status) {
        this.openSnackBar('You have completed your task')
      } else {
        this.openSnackBar('You must complete the task!!')
      }
    })
  }

  deleteTask(id: number): void {
    this.listComponentService.deleteTask(id).subscribe(res => {
      this.getList();
      this.openSnackBar('Your task deleted successfully!');
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getList();
  }
}
