(function(){
    var app = angular.module('starter.productscontrol', [])
        app.factory('ProductsControl', function(){
        var items = [];
            return {
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
                }
            };
        });
}());