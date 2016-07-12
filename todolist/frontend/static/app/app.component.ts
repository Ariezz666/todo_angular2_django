import {Component} from 'angular2/core';
import {TodoListComponent} from './todo-list/todo-list.component'

@Component({
    selector: 'my-app',
    template: `
        <my-todo-list></my-todo-list>            
    `,
    directives: [TodoListComponent]
})

export class AppComponent {

}