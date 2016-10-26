(function(){
    var app = angular.module('starter.workscontrol', [])
        app.factory('WorksControl', function(){
        var items = [];
            return {
                list: function($http, $scope){
                    return items;
                    
                },
                elimItem: function(item){s">Materis">Materi
                    
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
