/**
  use this class to manipulate data if you do not have server
  using this will not save any data, hense refresing the page will reload everything.
*/
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

let todos = [];

@Injectable()
export class TodoService {


  constructor() { }

// get data
  get(query = '') {

    return new Promise(resolve => {
      let data;
      if (query === 'completed' || query === 'active') {
        const isCompleted = query === 'completed';
        data = todos.filter(todo => todo.isDone === isCompleted);
      } else {
        data = todos;
      }
      resolve(data);
    });
  }

// add data
  add(data) {
    return new Promise(resolve => {
      todos.push(data);
      resolve(data);
    });
  }

// put data
  put(data) {
    return new Promise(resolve => {
      const index = todos.findIndex(todo => todo._id === data._id);
      todos[index].title = data.title;
      resolve(data);
    });
  }

// delete data
  delete(id) {
    return new Promise(resolve => {
      const index = todos.findIndex(todo => todo._id === id);
      todos.splice(index, 1);
      resolve(true);
    });
  }

// delete compleated.
  deleteCompleted() {
    return new Promise(resolve => {
      todos = todos.filter(todo => !todo.isDone);
      resolve(todos);
    });
  }
}
