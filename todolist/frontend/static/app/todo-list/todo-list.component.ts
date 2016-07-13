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
                <div class="link" ><strong>{{activeTasksCount}}</strong> {{activeTasksCount == 1 ? 'item' : 'items'}} left</div>
                <div class="link-center">
                    <a [ngClass]="{isActive: isActive === 'all'}" (click)="onActive('all')">All</a>
                    <a [ngClass]="{isActive: isActive === 'active'}" (click)="onActive('active')">Active</a>
                    <a [ngClass]="{isActive: isActive === 'completed'}" (click)="onActive('completed')">Completed</a>
                </div>
                <div class="link-right" (click)="onDeleteAllCompleted()" *ngIf="completedTasks.length > 0"><a>Clear completed</a></div>
            </div>
        </div>
    `,
    providers: [TaskService],
})

export class TodoListComponent{
    title: string;
    tasks: Task[] = [];
    response: string;
    newTaskTitle = '';
    selectedTask: {title: string, completed: boolean, id: number} = null;
    deletedTask: {title: string, completed: boolean, id: number} = null;
    isActive = 'all';
    activeTasks: Task[] = [];
    completedTasks: Task[] = [];
    allTasks: Task[] = [];
    activeTasksCount = 0;

    constructor(private _taskService: TaskService){
        this.title = 'TODOS';
        console.log('test2');
        this.getTasks();
        console.log(this.tasks);
    }

    
    getTasks(){
        this._taskService.getTasks()
            .subscribe(
                response => {
                    this.tasks = response;
                    this.allTasks = response;
                    this.onActive(this.isActive);
                },
                error => console.log(error)
            )
    }

    addTask(){
        console.log(this.tasks);
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
        this.getActive();
        if (status === 'completed'){
            this.tasks = this.completedTasks;
        } else if (status === 'active'){
            this.tasks = this.activeTasks;
        } else
            this.tasks = this.allTasks;
    }

    getActive(){

        this.completedTasks = [];
        this.activeTasks = [];
        this.activeTasksCount = 0;

        for (var i = 0; i < this.allTasks.length; i++){
            if (this.allTasks[i].completed){
                this.completedTasks.push(this.allTasks[i]);

            } else{
                this.activeTasks.push(this.allTasks[i]);
                this.activeTasksCount += 1;
            }
        }

    }

    onDeleteAllCompleted(){
        for(var i = 0; i < this.completedTasks.length; i++){
            this._taskService.deleteTask(this.completedTasks[i].id)
            .subscribe(
                response => console.log('Task deleted, id = ' + this.completedTasks[i].id),
                error => console.log(error)
        );
        }
        this.getTasks();
        this.onActive(this.isActive);
    }

}