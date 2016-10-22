var app = angular.module('App', ['ngRoute']);

var ip = "192.108.255.5";

function server_request($http, request) {
     $http.get(request)
                .then(function (response) {
                console.log('Get Post', response);
                console.log("Get Post status", response.data);
                var data = response.data;
                var result = data.substring(70, data.length - 9);
                console.log("Get Post status", result);
                return result;
         
     }
                      
    );
         
    }



    app.config(['$routeProvider', function($routeProvider, $urlRouterProvider) {

        $routeProvider
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'loginController'
            })
            
            .when('/signUp', {
                controller: 'SignUpCtrl',
                templateUrl:'templates/signUp.html'
            })
        
            .when('/about',{
                controller: 'AboutCtrl',
                templateUrl:'templates/about.html'
                })
            .when('/materials',{
                controller: 'MaterialsCtrl',
                templateUrl:'templates/materials.html'
                })
            .when('/works',{
                controller: 'WorksCtrl',
                templateUrl:'templates/works.html'
                })
            
            .when('/addWork',{
                controller: 'AddWorkCtrl',
                templateUrl:'templates/addWork.html'
                })
            .when('/stages',{
                controller: 'StagesCtrl',
                templateUrl:'templates/stages.html'
                })
            .when('/addStage',{
                controller: 'AddStageCtrl',
                templateUrl:'templates/addStage.html'
                })
            .when('/queries',{
                controller: 'QueriesCtrl',
                templateUrl:'templates/queries.html'
                })
             .otherwise({
                redirectTo: '/login'
            });

    }])
    
    app.controller('MenuCtrl', function($scope,loginData ) {
    $scope.login = loginData.getLogin();
    $scope.engine=false;
    $scope.client=false;
    $scope.general=false;
    $scope.admi=false;
    $scope.ifMenu=true;
    
        
    if (typeof loginData.menutype != 'undefined')
        {
            $scope.ifMenu = true;
            console.log("menutype es: ", loginData.menutype);
        }
    console.log($scope.login.menutype);
        
     
     if ($scope.login.menutype===0){
         $scope.engine=true;
     }
      else if ($scope.login.menutype===1){
         $scope.client=true;
     }
      else if ($scope.login.menutype===2){
         $scope.general=true;
     }
     else if ($scope.login.menutype===3){
         $scope.admi=true;
     }
 })
    app.controller('WorksCtrl', function() {
        
    })

    app.controller('AddWorkCtrl', function() {
        
    })
    
    app.controller('StagesCtrl', function() {
        
    })
    
    app.controller('AddStagesCtrl', function() {
        
    })
    
    app.controller('QueriesCtrl', function() {
        
    })
    

    app.controller('loginController', function($scope) {
        console.log(ip);
        $scope.login = {ip:'',username:'', password:'',name:'',id:'',code:'' ,menutype:'' };
        var form = document.getElementById("myForm");  
        form.onsubmit = function(){
        form.reset();
      }

        
    $scope.verificar =  function(login){
                    var peticion = "listar/clientes/_office/_name/_id/_type/where/_identityNumber/"
                    var request = "";
                    request = request.concat(ip, peticion, $scope.login.username,"/_password/",$scope.login.password);
                    console.log("Request es:", request);
                    result = server_request($http, request); 
                    
                            if (result==="[]"){
                                alert("login erorr")
                                
                                }
                            else{
                            var result2 = angular.fromJson(result);
                            console.log("Get Post status 2", result2);
                                
                            
                            if (result2[0]._type===0){
                                loginData.updateLogin(login,result2[0]._id,result2[0]._name,result2[0]._office.toString().replace(" ", "%20"),0);   
                                $state.go('home'); 
                            }
                            else if(result2[0]._type===1){
                                loginData.updateLogin(login,result2[0]._id,result2[0]._name,result2[0]._office.toString().replace(" ", "%20"),1);   
                                $state.go('myProducts');
                            }
                            else if(result2[0]._type===2){
                                loginData.updateLogin(login,result2[0]._id,result2[0]._name,result2[0]._office.toString().replace(" ", "%20"),2);     
                                $state.go('orders');
                            }
                            else if(result2[0]._type===3){
                                loginData.updateLogin(login,result2[0]._id,result2[0]._name,result2[0]._office.toString().replace(" ", "%20"),3);   
                                $state.go('stadistic');
                            }
                            else if(result2[0]._type===4){
                                loginData.updateLogin(login,result2[0]._id,result2[0]._name,result2[0]._office.toString().replace(" ", "%20"),4);   
                                $state.go('stadistic');
                            }
                            
                            }
    }

     $scope.reload=function(){
         window.location.reload();
     };
    })
    
    
    app.controller('SignUpCtrl', function() {
        
    })

    
    
.service('loginData', function() {
 return {
   login: {},
   getLogin: function() {
     return this.login;
   },
   updateLogin: function(login,id,name,menutype) {
     this.login = login;
    this.login.id=id;
       this.login.name=name;
       this.login.menutype=menutype;
       this.login.office=office;
   }
 }
})    
    
    
    
    
app.directive('menu', function() {
  return {
     templateUrl: 'templates/menu.html',
      controller:"MenuCtrl"
  };});