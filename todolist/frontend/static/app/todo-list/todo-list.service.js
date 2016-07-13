System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var TaskService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            TaskService = (function () {
                function TaskService(_http) {
                    this._http = _http;
                }
                TaskService.prototype.getCookie = function (name) {
                    var value = "; " + document.cookie;
                    var parts = value.split("; " + name + "=");
                    if (parts.length == 2)
                        return parts.pop().split(";").shift();
                };
                TaskService.prototype.getTasks = function () {
                    return this._http.get('/tasks/?format=json')
                        .map(function (res) { return res.json(); });
                };
                TaskService.prototype.createPost = function (post) {
                    var body = JSON.stringify({ title: post.title, completed: post.completed });
                    console.log(post);
                    console.log(body);
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('X-CSRFToken', this.getCookie('csrftoken'));
                    return this._http.post('/tasks/?format=json', body, {
                        headers: headers
                    }).map(function (res) { return res.json(); });
                };
                TaskService.prototype.deleteTask = function (pk) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('X-CSRFToken', this.getCookie('csrftoken'));
                    var url = '/tasks/' + pk + '/?format=json';
                    console.log(url);
                    return this._http.delete(url, {
                        headers: headers
                    });
                };
                TaskService.prototype.updateTask = function (post) {
                    var body = JSON.stringify({ title: post.title, completed: post.completed });
                    console.log(post);
                    console.log(body);
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('X-CSRFToken', this.getCookie('csrftoken'));
                    var url = '/tasks/' + post.pk + '/?format=json';
                    console.log(url);
                    return this._http.put(url, body, {
                        headers: headers
                    });
                };
                TaskService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], TaskService);
                return TaskService;
            }());
            exports_1("TaskService", TaskService);
        }
    }
});
//# sourceMappingURL=todo-list.service.js.map