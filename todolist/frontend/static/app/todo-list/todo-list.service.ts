import {Injectable, provide} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/Rx';
import {Task} from './task';


@Injectable()

export class TaskService{
    
    tasks: Array<Task> = [];
    activeTasks: Array<Task> = [];
    completedTasks: Array<Task> = [];
    allTasks: Array<Task> = [];
    activeTasksCount = 0;


    constructor(private _http: Http){

        this.getTasks('all');

    }

    getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts.pop().split(";").shift();
    }

    getTasks(status: string){
        this._http.get('/tasks/?format=json')
                    .map(res => res.json())
                    .subscribe(
                        response => {
                            this.allTasks = response;
                            this.setTasks(status);
                        },
                        error => console.log(error)
                    );
    }

    createPost(post: {title: string, completed: boolean}, status: string){

        const body = JSON.stringify({title: post.title, completed: post.completed});
        console.log(post);
        console.log(body);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRFToken', this.getCookie('csrftoken'));
        this._http.post('/tasks/?format=json', body, {
            headers: headers
            }).map(res => res.json())
              .subscribe(
                  response => console.log('Task created successful'),
                  error => console.log(error)
        );

        this.getTasks(status);
        this.getTasks(status);

        // this.setTasks(status);
        // this.setTasks(status);

    }


    deleteTask(task: Task, status: string){

        this.allTasks.splice(this.allTasks.indexOf(task), 1);

        this.setTasks(status);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRFToken', this.getCookie('csrftoken'));
        const url = '/tasks/'+ task.id + '/?format=json';
        this._http.delete(url, {
            headers: headers
        }).subscribe(
                response => console.log('Task deleted, id = ' + task.id),
                error => console.log(error)
        );

    }

    updateTask(task: Task, newTask: Task, status: string){

        this.allTasks[this.allTasks.indexOf(task)] = newTask;
        this.setTasks(status);

        const body = JSON.stringify({title: newTask.title, completed: newTask.completed});
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRFToken', this.getCookie('csrftoken'));
        const url = '/tasks/'+ task.id + '/?format=json';
        console.log(url);
        this._http.put(url, body, {
            headers: headers
        }).subscribe(
                response => console.log('Task updated, id = ' + task.id),
                error => console.log(error)
        );
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

    setTasks(status: string){
        this.getActive();
        if (status === "completed") {
            this.tasks = this.completedTasks;
        } else if (status === "active") {
            this.tasks = this.activeTasks;
        } else {
            this.tasks = this.allTasks;
        }
    }

    }