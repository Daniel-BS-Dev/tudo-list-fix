import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/component/nav/nav.service';
import { CrudService } from '../crud.service';
import { MyTask } from '../models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  addTask: boolean = true;
  isEmpty: string = 'a';
  hasDate =  'a';

  task: MyTask = {
    text: '',
    title: '',
    isMark: false,
    date: '',
  };

  constructor(private service: NavService, private crudService: CrudService) {}

  ngOnInit(): void {}

  onAddTask() {
    this.addTask = this.service.onShowMenu();
  }

  newTask(): void {
    this.isEmpty = this.task.text;
    if(this.isEmpty == ''){
      return;
    }

    this.hasDate = String(this.task.date);
    if (this.task.date == '') {
      console.log('esta vazio')
      return;
    }

      if (this.task.title == '') {
      this.task = { ...this.task, title: 'Sem titulo' };
    }

   

    this.crudService.newTask(this.task).subscribe(() => {
      //this.crudService.showMessage("Tarefa Criada");
      setTimeout(() => {
        location.reload();
      }, 500);
    });
    this.cleanInput();
  }

  cleanInput() {
    this.task.text = '';
    this.task.date = '';
  }
}