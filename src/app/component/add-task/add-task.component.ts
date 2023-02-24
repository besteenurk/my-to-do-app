import {Component, Input, OnInit} from '@angular/core';
import {TaskListService} from "../task-list/task-list.service";
import {FormControl, FormGroup} from '@angular/forms';
import {AddTaskService} from "./add-task.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  refreshStatus: boolean | undefined;
  toDoForm = new FormGroup({
    task: new FormControl(''),
    status: new FormControl(false),
  });

  constructor(
    private addTaskService: AddTaskService,
    private listComponentService: TaskListService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Close', { duration: 2000 });
  }

  handleSaveToDo() {
    this.refreshStatus = false;
    const data = JSON.stringify(this.toDoForm.value);
    this.addTaskService.resolveItems(data).subscribe((response: any) => {
      this.refreshStatus = true;
      this.toDoForm.reset();
      this.openSnackBar('Your task added successfully!')
    });
  }

  getList(): void {
    this.listComponentService.getToDoList()
      .subscribe();
  }
}
