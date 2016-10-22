var app = angular.module('App', ['ngRoute']);

var ip = "http://192.168.0.15:8080/Construtec.asmx/";

function server_request($http, request) {
     $http.get(request)
                .then(function (response) {
                console.log('Get Post', response);
                console.log("Get Post status", response.data);
                var data = response.data;
                var result = data.substring(70, data.length - 9);
                console.log("Get Post status", result);
                return result;
         
     });       
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
    
    app.controller('MaterialsCtrl', function() {
        var peticion = "ConsutaMateriales";
        var request = "";
        request = request.concat(ip, peticion);
        console.log("Request es:", request);
        result = server_request($http, request); 
        
        var result2 = angular.fromJson(result);
        console.log("Get Post status 2", result2);
        
        
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
        $scope.login = {username:'', password:'',name:'',id:'',code:'' ,menutype:'' };
        var form = document.getElementById("myForm");  
        form.onsubmit = function(){
        form.reset();
      }

        
    $scope.verificar =  function(login){
                    var peticion = "ListarClientes/";
                    var request = "";
                    request = request.concat(ip, peticion, $scope.login.username,"/",$scope.login.password);
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
                                $location.path('/home');
                            }
                            
                            }
    }

     $scope.reload=function(){
         window.location.reload();
     };
    })
    
    
    app.controller('SignUpCtrl', function($scope, $http, $location) {
    var form = document.getElementById("myForm");
    var request = "";
     
    $scope.createUser = function(type,icode){ 
        /* verificar que usuario no exista*/

                var peticion = "ListarClientes/";

                request = request.concat(ip, peticion,$scope.signUp.Uname,"/",icode,"/",$scope.signUp.inum,"/",$scope.signUp.phone);
                console.log("Request es:", request);
        
                result = server_request($http, request); 
                    
                            if (result2.length===0){
                                registry(type);
                            }else{
                                alert("User Name number already in use")
                            }                         
             
                }
                                  
        function registry(type){
                            var request2 = "";
                            var peticion2 = "RegistrarIngeniero/";
                            var newid = new Date().getTime().toString().slice(4,14);
                            peticion2 = peticion2.concat(peticion,newid,$scope.signUp.Uname,"/",icode,"/",$scope.signUp.inum,"/",$scope.signUp.phone);
                                
                            request2 = request2.concat(ip, peticion2);
                            console.log("Request es:", request2);
            
                            result = server_request($http, request);
                                if (result==="no se pudo conectar"){
                                    alert("check the data");
                                    
                                }else{
                                        
                                    form.reset();
                                    $location.path('/login');
                                }
                            };
    })
        
    
.service('loginData', function() {
 return {
   login: {},
   getLogin: function() {
     return this.login;
   },
   updateLogin: function(login,id,name,username,menutype) {
       this.login = login;
       this.login.id=id;
       this.login.name=name;
       this.login.username=username;
       this.login.menutype=menutype;
   }
 }
})    
    
app.directive('menu', function() {
  return {
     templateUrl: 'templates/menu.html',
      controller:"MenuCtrl"
  };});