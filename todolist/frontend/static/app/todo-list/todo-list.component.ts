import {Component} from 'angular2/core'
import {TaskService} from "./todo-list.service";
import {Task} from './task';

@Component({
    selector: 'my-todo-list',
    template: `
        <div class="todo">
            <h1>{{title}}</h1>
            <input id="task-title" placeholder="What needs to be done?" [(ngModel)]="newTaskTitle" autofocus  (keyup.enter)="addTask()">
            <div class="list">
                <ul>
                    <li  *ngFor="#task of tasks"  (mouseover)="onMoseOver(task)" (mouseleave)="onMoseLeave()" (dblclick)="editTask(task)"><input type="checkbox" [checked]="task.completed" (change)="toggleCompletion(task)">
                        <span [ngClass]="{completed: task.completed}" *ngIf="task !== selectedTask">{{ task.title }}</span>
                        <input id="task-title-edit" type="text" *ngIf="task === selectedTask" value="{{task.title}}" #updateTitle (keyup.enter)="updateTask(updateTitle.value)" (keyup.escape)="cancelEditingTask()">
                        <span *ngIf="task === deletedTask  && task !== selectedTask" ><button class="delete" (click)="onDelete(task.id)">Delete</button></span>
                    </li>
                </ul>
            </div>
            <div class="footer">
                <div class="link">1 item left</div>
                <div class="link-center">
                    <a [ngClass]="{isActive: isActive === 'all'}" (click)="onActive('all')">All</a>
                    <a [ngClass]="{isActive: isActive === 'active'}" (click)="onActive('active')">Active</a>
                    <a [ngClass]="{isActive: isActive === 'completed'}" (click)="onActive('completed')">Completed</a>
                </div>
                <div class="link-right"><a>Clear completed</a></div>
            </div>
        </div>
    `,
    providers: [TaskService],
})

export class TodoListComponent{
    title: string;
    tasks: string;
    response: string;
    newTaskTitle = '';
    selectedTask: {title: string, completed: boolean, id: number} = null;
    deletedTask: {title: string, completed: boolean, id: number} = null;
    isActive = 'all';

    constructor(private _taskService: TaskService){
        this.title = 'TODOS';
        this.getTasks();

    }

    
    getTasks(){
        this._taskService.getTasks()
            .subscribe(
                response => this.tasks = response,
                error => console.log(error)
            )
    }

    addTask(){
        if (this.newTaskTitle===''){
            alert('Error. Task cant be empty');
        }

        this._taskService.createPost({title: this.newTaskTitle, completed: false})
            .subscribe(
                response => console.log('Task created successful'),
                error => console.log(error)
        );
        this.newTaskTitle = '';
        this.getTasks();
    }

    onDelete(id: number){
        this._taskService.deleteTask(id)
            .subscribe(
                response => console.log('Task deleted, id = ' + id),
                error => console.log(error)
        );
        this.getTasks();
    }

    toggleCompletion(task){
        this._taskService.updateTask({title: task.title, completed: !task.completed, pk: task.id})
        .subscribe(
                response => console.log('Task updated, id = ' + task.id),
                error => console.log(error)
        );
        this.getTasks();
    }

    onMoseOver(task: {title: string, completed: boolean, id: number}){
        this.deletedTask = task;
    }

    onMoseLeave(){
        this.deletedTask = null;
    }

    editTask(task){
        this.selectedTask = task;
    }

    updateTask(newTitle: string){
        this._taskService.updateTask({title: newTitle, completed: this.selectedTask.completed, pk: this.selectedTask.id})
        .subscribe(
                response => console.log('Task updated, id = ' + this.selectedTask.id),
                error => console.log(error)
        );
        this.getTasks();
        this.selectedTask = null;
    }

    cancelEditingTask(){
        this.selectedTask = null;
    }

    onActive(status: string){
        this.isActive = status;

    }

}