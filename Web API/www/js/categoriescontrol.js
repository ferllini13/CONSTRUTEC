(function(){
    var app = angular.module('starter.categoriescontrol', [])
        app.factory('CategoriesControl', function(){
        var items = [];
            return {
                update: function($http) {
                    var ip = "http://webserviceepatec.azurewebsites.net/EPATEC.asmx/Parsear?frase=";
                    var peticion = "listar,categorias"
                    var request = "";
                    request = request.concat(ip, peticion);
                    console.log("Request es:", request);
                $http.get(request)
                            .then(function (response) {
                            console.log('Get Post', response);
                            console.log("Get Post status", response.data);
                            var data = response.data;
                            var result = data.substring(70, data.length - 9);
                            console.log("Get Post status", result);
                            var result2 = angular.fromJson(result);
                            console.log("Get Post status 2", result2);                            
                            for(var i in result2) {
                                items.push(result2[i]);
                            }
                    });
                },
                list: function($http, $scope){
                    return items;
                    
                },
                elimItem: function(item){
                    
                    for (var i in items) {
                        if (items[i]._id === item._id) {
                            items.splice(i,1);
                        }
                    }
                },
                get: function(id){
                    return items.filter(function(item){
                        return item._id === id;
                    })[0];
                },
            };
        });
}());
