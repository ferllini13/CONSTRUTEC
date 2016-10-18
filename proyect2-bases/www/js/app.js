var app = angular.module('todoApp', ['ngRoute'])

    app.config(['$routeProvider', function($routeProvider) {



        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'homeController'
            })
            .when('/builds', {
                templateUrl: 'views/builds.html',
                controller: 'buildsController'
            })
            .when('/admin', {
                templateUrl: 'views/admin.html',
                controller: 'adminController'
            })
            .otherwise({
                redirectTo: '/'
            });

    }])









    .controller('TodoListController', function() {
        todoList = this;
        todoList.todos = [
            {text:'learn angular', done:true},
            {text:'build an angular app', done:false}];

        todoList.addTodo = function() {
            todoList.todos.push({text:todoList.todoText, done:false});
            todoList.todoText = '';
        };

        todoList.remaining = function() {
            var count = 0;
            angular.forEach(todoList.todos, function(todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        todoList.archive = function() {
            var oldTodos = todoList.todos;
            todoList.todos = [];
            angular.forEach(oldTodos, function(todo) {
                if (!todo.done) todoList.todos.push(todo);
            });
        };
    });