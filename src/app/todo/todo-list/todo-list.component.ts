import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoService } from '../services/todo.service';
import { TodoViewModel } from '../models/todo-view-model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private todoService: TodoService) { }

  ngOnInit() {
    this.loadTodos();
  }

  todos: TodoViewModel[] = [];

  loadTodos(){
    this.todoService.getTodos().subscribe(response => {
      this.todos = [];
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const todo: TodoViewModel = {
          id: id,
          title: data.title,
          description: data.description,
          done: data.done,
          lastModifiedDate: data.lastModifiedDate.toDate()
        };
        this.todos.push(todo);
      });
    });
  }

  clickAddTodo(){
    const modal = this.modalService.open(TodoFormComponent);
    modal.result.then(
      this.handleModalTodoFormClose.bind(this),
      this.handleModalTodoFormClose.bind(this)
    )
  }

  handleModalTodoFormClose(){
    
  }

}
