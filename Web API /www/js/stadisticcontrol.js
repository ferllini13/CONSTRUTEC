(function(){
    var app = angular.module('starter.stadisticcontrol', [])
        app.factory('StadisticControl', function(){
        var itemsBS = [];
        var itemsBSO = [];
        var itemsSPO = [];
            return {
                updateBS: function($http) {
                    var ip = "http://webserviceepatec.azurewebsites.net/EPATEC.asmx/Parsear?frase=";
                    var peticion = "masvendido"
                    
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
                                itemsBS.push(result2[i]);
                            }

                    });
                },
                updateBSO: function($http,office) {
                    var ip = "http://webserviceepatec.azurewebsites.net/EPATEC.asmx/Parsear?frase=";
                    var peticion = "masvendidoporoficina/"
                    
                    var request = "";
                    request = request.concat(ip, peticion,office);
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
                                itemsBSO.push(result2[i]);
                            }

                    });
                },
                updateSPO: function($http,office) {
                    var ip = "http://webserviceepatec.azurewebsites.net/EPATEC.asmx/Parsear?frase=";
                    var peticion = "masvendidoporoficina/"
                    var request = "";
                    var office2= "M-";
                    office2=office2.concat(office);
                    request = request.concat(ip, peticion,office);
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
                                itemsBSO.push(result2[i]);
                            }

                    });
                    
                    
                    
                },
                updateSPO: function($http) {
                   /* var ip = "http://webserviceepatec.azurewebsites.net/EPATEC.asmx/Parsear?frase=";
                    var peticion = ""
                    
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
                                itemsSPO.push(result2[i]);
                            }
                    });*/
                },
                listBS: function($http, $scope){
                    return itemsBS;
                    
                },
                listBSO: function($http, $scope){
                    return itemsBSO;
                    
                },
                listSPO: function($http, $scope){
                    return itemsSPO;
                    
                },
                
                
            };
        });
}());