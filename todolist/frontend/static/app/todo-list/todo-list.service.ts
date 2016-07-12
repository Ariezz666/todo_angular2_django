import {Injectable, provide} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()

export class TaskService{

    constructor(private _http: Http){}

    getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts.pop().split(";").shift();
    }

    getTasks(){
        return this._http.get('/tasks/?format=json')
        .map(res => res.json());
    }

    createPost(post: {title: string, completed: boolean}){
        const body = JSON.stringify({title: post.title, completed: post.completed});
        console.log(post);
        console.log(body);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRFToken', this.getCookie('csrftoken'));
        return this._http.post('/tasks/?format=json', body, {
            headers: headers
        }).map(res => res.json()).map(res => res.json());
    }


    deleteTask(pk: number){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRFToken', this.getCookie('csrftoken'));
        const url = '/tasks/'+ pk + '/?format=json';
        console.log(url);
        return this._http.delete(url, {
            headers: headers
        });
    }

    updateTask(post: {title: string, completed: boolean, pk: number}){
        const body = JSON.stringify({title: post.title, completed: post.completed});
        console.log(post);
        console.log(body);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRFToken', this.getCookie('csrftoken'));
        const url = '/tasks/'+ post.pk + '/?format=json';
        console.log(url);
        return this._http.put(url, body, {
            headers: headers
        });
    }

}