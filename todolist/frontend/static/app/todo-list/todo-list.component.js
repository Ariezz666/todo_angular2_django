System.register(['angular2/core', "./todo-list.service"], function(exports_1, context_1) {
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
    var core_1, todo_list_service_1;
    var TodoListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (todo_list_service_1_1) {
                todo_list_service_1 = todo_list_service_1_1;
            }],
        execute: function() {
            TodoListComponent = (function () {
                function TodoListComponent(_taskService) {
                    this._taskService = _taskService;
                    this.newTaskTitle = '';
                    this.selectedTask = null;
                    this.deletedTask = null;
                    this.isActive = 'all';
                    this.title = 'TODOS';
                    this.getTasks();
                }
                TodoListComponent.prototype.getTasks = function () {
                    var _this = this;
                    this._taskService.getTasks()
                        .subscribe(function (response) { return _this.tasks = response; }, function (error) { return console.log(error); });
                };
                TodoListComponent.prototype.addTask = function () {
                    if (this.newTaskTitle === '') {
                        alert('Error. Task cant be empty');
                    }
                    this._taskService.createPost({ title: this.newTaskTitle, completed: false })
                        .subscribe(function (response) { return console.log('Task created successful'); }, function (error) { return console.log(error); });
                    this.newTaskTitle = '';
                    this.getTasks();
                };
                TodoListComponent.prototype.onDelete = function (id) {
                    this._taskService.deleteTask(id)
                        .subscribe(function (response) { return console.log('Task deleted, id = ' + id); }, function (error) { return console.log(error); });
                    this.getTasks();
                };
                TodoListComponent.prototype.toggleCompletion = function (task) {
                    this._taskService.updateTask({ title: task.title, completed: !task.completed, pk: task.id })
                        .subscribe(function (response) { return console.log('Task updated, id = ' + task.id); }, function (error) { return console.log(error); });
                    this.getTasks();
                };
                TodoListComponent.prototype.onMoseOver = function (task) {
                    this.deletedTask = task;
                };
                TodoListComponent.prototype.onMoseLeave = function () {
                    this.deletedTask = null;
                };
                TodoListComponent.prototype.editTask = function (task) {
                    this.selectedTask = task;
                };
                TodoListComponent.prototype.updateTask = function (newTitle) {
                    var _this = this;
                    this._taskService.updateTask({ title: newTitle, completed: this.selectedTask.completed, pk: this.selectedTask.id })
                        .subscribe(function (response) { return console.log('Task updated, id = ' + _this.selectedTask.id); }, function (error) { return console.log(error); });
                    this.getTasks();
                    this.selectedTask = null;
                };
                TodoListComponent.prototype.cancelEditingTask = function () {
                    this.selectedTask = null;
                };
                TodoListComponent.prototype.onActive = function (status) {
                    this.isActive = status;
                };
                TodoListComponent = __decorate([
                    core_1.Component({
                        selector: 'my-todo-list',
                        template: "\n        <div class=\"todo\">\n            <h1>{{title}}</h1>\n            <input id=\"task-title\" placeholder=\"What needs to be done?\" [(ngModel)]=\"newTaskTitle\" autofocus  (keyup.enter)=\"addTask()\">\n            <div class=\"list\">\n                <ul>\n                    <li  *ngFor=\"#task of tasks\"  (mouseover)=\"onMoseOver(task)\" (mouseleave)=\"onMoseLeave()\" (dblclick)=\"editTask(task)\"><input type=\"checkbox\" [checked]=\"task.completed\" (change)=\"toggleCompletion(task)\">\n                        <span [ngClass]=\"{completed: task.completed}\" *ngIf=\"task !== selectedTask\">{{ task.title }}</span>\n                        <input id=\"task-title-edit\" type=\"text\" *ngIf=\"task === selectedTask\" value=\"{{task.title}}\" #updateTitle (keyup.enter)=\"updateTask(updateTitle.value)\" (keyup.escape)=\"cancelEditingTask()\">\n                        <span *ngIf=\"task === deletedTask  && task !== selectedTask\" ><button class=\"delete\" (click)=\"onDelete(task.id)\">Delete</button></span>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"footer\">\n                <div class=\"link\">1 item left</div>\n                <div class=\"link-center\">\n                    <a [ngClass]=\"{isActive: isActive === 'all'}\" (click)=\"onActive('all')\">All</a>\n                    <a [ngClass]=\"{isActive: isActive === 'active'}\" (click)=\"onActive('active')\">Active</a>\n                    <a [ngClass]=\"{isActive: isActive === 'completed'}\" (click)=\"onActive('completed')\">Completed</a>\n                </div>\n                <div class=\"link-right\"><a>Clear completed</a></div>\n            </div>\n        </div>\n    ",
                        providers: [todo_list_service_1.TaskService],
                    }), 
                    __metadata('design:paramtypes', [todo_list_service_1.TaskService])
                ], TodoListComponent);
                return TodoListComponent;
            }());
            exports_1("TodoListComponent", TodoListComponent);
        }
    }
});
//# sourceMappingURL=todo-list.component.js.map