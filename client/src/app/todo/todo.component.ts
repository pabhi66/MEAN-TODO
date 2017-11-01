import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

// Import rxjs map operator
import 'rxjs/add/operator/map';

import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})

// class
export class TodoComponent implements OnInit {
  private todos;
  private activeTasks = 0;
  private newTodo;
  private path;


  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  // constructor that takes in activated routes and http client
  constructor(private route: ActivatedRoute, private http: Http) { }

  // get all todos from the database
  getTodos(query = '') {
    this.http.get(`${this.API}/todo`)
      .map(res => res.json())
      .subscribe(todos => {
        console.log(todos);
        this.todos = todos;
        this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
      });
  }

  // get all todos on start from the server
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos(this.path);
    });
  }

  // add todo to the server
  addTodo() {
    this.http.post(`${this.API}/todo`, { title: this.newTodo, isDone: false })
      .map(res => res.json())
      .subscribe(() => {
        this.getTodos();
      });

    // clear text field
    this.newTodo = '';
  }

  // update todo to server
  updateTodo(todo, newValue) {
    this.http.put(`${this.API}/todo/${todo._id}`, { title: newValue })
      .map(res => res.json())
      .subscribe(todos => {
        todo.editing = false;
        this.getTodos();
        console.log('task updated');
      });
  }

  // delete todo from the server
  destroyTodo(todo) {
    this.http.delete(`${this.API}/todo/${todo._id}`)
      .map(res => res.json())
      .subscribe(todos => {
        this.getTodos();
        console.log('tasked removed');
      });
  }

  clearCompleted() {
    // this.todoService.deleteCompleted().then(() => {
    //   return this.getTodos();
    // });

    // this.todos.filter(todo => !todo.isDone).then()
    this.http.delete(`${this.API}/todo`)
      .map(res => res.json())
      .subscribe(todos => {
        this.getTodos();
        console.log('tasked removed');
      });
  }

  // mark todo as complete
  markTodo(todo) {
    // console.log(todo.isDone);
    if (todo.isDone) {
      this.http.put(`${this.API}/todo/${todo._id}`, { isDone: false })
        .map(res => res.json())
        .subscribe(todos => {
          this.getTodos();
          console.log('task not completed');
        });
    } else {
      this.http.put(`${this.API}/todo/${todo._id}`, { isDone: true })
        .map(res => res.json())
        .subscribe(todos => {
          this.getTodos();
          console.log('task not completed');
        });
    }
  }

}
