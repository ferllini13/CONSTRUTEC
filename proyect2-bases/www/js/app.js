var app = angular.module('App', ['ngRoute']);

var ip = "http://192.168.0.15:8080/Construtec.asmx/";

function server_request($http, request) {
 $http.get(request)
            .then(function (response) {
            console.log('Get Post', response);
            console.log("Get Post status", response.data);
            var data = response.data;
            var result = data.substring(76, data.length - 9);
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

app.controller('MenuCtrl', function($scope,loginData) {
$scope.login = loginData.getLogin();
console.log($scope.login.username);    
$scope.engine=false;
$scope.client=false;
$scope.general=false;
$scope.admi=false;
$scope.ifMenu=true;   

var type=$scope.login.menutype;    
for ( i= 0; i< type.length; i++ )  {
 if (type[i]==0){
     $scope.engine=true;
 }
  else if (type[i]==1){
     $scope.client=true;
 }
  else if (type[i]==2){
     $scope.general=true;
 }
 else if (type[i]==3){
     $scope.admi=true;
 }
}
    
})

app.controller('MaterialsCtrl', function($http, $scope) {
    var peticion = "ConsutaMateriales";
    var request = "";
    
    $scope.items = [];
    itemsFinal=$scope.itemsFinal=[];
               
    request = request.concat(ip, peticion);
    console.log("Request es:", request);
    $scope.update = function() {
        itemsFinal=$scope.itemsFinal=[];
    $http.get(request)
            .then(function (response) {
            console.log('Get Post', response);
            console.log("Get Post status", response.data);
            var data = response.data;
            var result = data.substring(76, data.length - 9);
            console.log("Get Post status", result);
            var result2 = angular.fromJson(result);
            console.log("Get Post status 2", result2);
            for(var i in result2) {
            $scope.items.push(result2[i]);
            }
            var result3 = $scope.items;
            console.log("Result3 ", result3);

 });
      };
    
    
    function addDelay() {
        $scope.items
        .sort(function(a, b) {
      return a._description.toUpperCase().charCodeAt(0) > b._description.toUpperCase().charCodeAt(0) ? 1 : -1;
    })
    .forEach(function(item) {
      //Get the first letter of the last name, and if the last name changes
      //put the letter in the array
        
      var itemCharCode = item._description.toUpperCase().charCodeAt(0);
        
        
        
      if (itemCharCode < 65) {
         itemCharCode = 35; 
      }
   
      //We may jump two letters, be sure to put both in
      //(eg if we jump from Adam Bradley to Bob Doe, add both C and D)
      var difference = itemCharCode - currentCharCode;
      for (var i = 1; i <= difference; i++) {
        /*console.log(String.fromCharCode(currentCharCode));*/
        addLetter(currentCharCode + i);;
        
      }
      currentCharCode = itemCharCode;
        console.log(item);
      itemsFinal.push(item);
    });
    }
    
    
    
    $scope.getItems = function(search) {
    $scope.items = itemsFinal;
    $scope.search = search;
    letterHasMatch = {};
        
    //Filter contacts by $scope.search.
    //Additionally, filter letters so that they only show if there
    //is one or more matching contact
    return itemsFinal.filter(function(item) {
      var itemDoesMatch = !$scope.search || item.isLetter ||
        item._description.toLowerCase().indexOf($scope.search.toLowerCase()) > -1
      //console.log(item.last_name.toString().charAt(0));
      
      //Mark this person's last name letter as 'has a match'
      if (!item.isLetter && itemDoesMatch) {

        var letter = item._description.charAt(0).toUpperCase();
        if ( item._description.charCodeAt(0) < 65 ){
          letter = "#";
        }
        letterHasMatch[letter] = true;
      }

      return itemDoesMatch;
    }).filter(function(item) {
      //Finally, re-filter all of the letters and take out ones that don't
      //have a match
      if (item.isLetter && !letterHasMatch[item.letter]) {
        return false;
      }
      return true;
    });
  };
    
    
    function addLetter(code) {
    var letter = String.fromCharCode(code);

    itemsFinal.push({
      isLetter: true,
      letter: letter
    });
   
    letters.push(letter);
  }

    

});

app.controller('WorksCtrl', function($http, $scope, loginData) {
   var peticion = "ListarProyectos";
    var request = "";
    var login = loginData.getLogin();
    var id = login.id;
    console.log("id es: ", id);
    $scope.items = [];
    itemsFinal=$scope.itemsFinal=[];
               
    request = request.concat(ip, peticion, "?datos=", id);
    console.log("Request es:", request);
    $scope.update = function() {
        itemsFinal=$scope.itemsFinal=[];
    $http.get(request)
            .then(function (response) {
            console.log('Get Post', response);
            console.log("Get Post status", response.data);
            var data = response.data;
            var result = data.substring(76, data.length - 9);
            console.log("Get Post status", result);
            var result2 = angular.fromJson(result);
            console.log("Get Post status 2", result2);
            for(var i in result2) {
            $scope.items.push(result2[i]);
            }
            var result3 = $scope.items;
            console.log("Result3 ", result3);
        

 });
      };
    
    
    function addDelay() {
        $scope.items
        .sort(function(a, b) {
      return a.c_location.toUpperCase().charCodeAt(0) > b.c_location.toUpperCase().charCodeAt(0) ? 1 : -1;
    })
    .forEach(function(item) {
      //Get the first letter of the last name, and if the last name changes
      //put the letter in the array
        
      var itemCharCode = item.c_location.toUpperCase().charCodeAt(0);
        
        
        
      if (itemCharCode < 65) {
         itemCharCode = 35; 
      }
   
      //We may jump two letters, be sure to put both in
      //(eg if we jump from Adam Bradley to Bob Doe, add both C and D)
      var difference = itemCharCode - currentCharCode;
      for (var i = 1; i <= difference; i++) {
        /*console.log(String.fromCharCode(currentCharCode));*/
        addLetter(currentCharCode + i);;
        
      }
      currentCharCode = itemCharCode;
        console.log(item);
      itemsFinal.push(item);
    });
    }
    
    
    
    $scope.getItems = function(search) {
    $scope.items = itemsFinal;
    $scope.search = search;
    letterHasMatch = {};
        
    //Filter contacts by $scope.search.
    //Additionally, filter letters so that they only show if there
    //is one or more matching contact
    return itemsFinal.filter(function(item) {
      var itemDoesMatch = !$scope.search || item.isLetter ||
        item.c_location.toLowerCase().indexOf($scope.search.toLowerCase()) > -1
      //console.log(item.last_name.toString().charAt(0));
      
      //Mark this person's last name letter as 'has a match'
      if (!item.isLetter && itemDoesMatch) {

        var letter = item.c_location.charAt(0).toUpperCase();
        if ( item.c_location.charCodeAt(0) < 65 ){
          letter = "#";
        }
        letterHasMatch[letter] = true;
      }

      return itemDoesMatch;
    }).filter(function(item) {
      //Finally, re-filter all of the letters and take out ones that don't
      //have a match
      if (item.isLetter && !letterHasMatch[item.letter]) {
        return false;
      }
      return true;
    });
  };
    
    
    function addLetter(code) {
    var letter = String.fromCharCode(code);

    itemsFinal.push({
      isLetter: true,
      letter: letter
    });
   
    letters.push(letter);
  }

})

app.controller('StagesCtrl', function() {
    var peticion = "ListarEtapasPorProyecto?";
    var request = "";
    var login = loginData.getLogin();
    var id = login.id;
    console.log("id es: ", id);
    $scope.items = [];
    itemsFinal=$scope.itemsFinal=[];
               
    request = request.concat(ip, peticion, "?datos=", id);
    console.log("Request es:", request);
    $scope.update = function() {
        itemsFinal=$scope.itemsFinal=[];
    $http.get(request)
            .then(function (response) {
            console.log('Get Post', response);
            console.log("Get Post status", response.data);
            var data = response.data;
            var result = data.substring(76, data.length - 9);
            console.log("Get Post status", result);
            var result2 = angular.fromJson(result);
            console.log("Get Post status 2", result2);
            for(var i in result2) {
            $scope.items.push(result2[i]);
            }
            var result3 = $scope.items;
            console.log("Result3 ", result3);
        

 });
      };
    
    
    function addDelay() {
        $scope.items
        .sort(function(a, b) {
      return a.c_location.toUpperCase().charCodeAt(0) > b.c_location.toUpperCase().charCodeAt(0) ? 1 : -1;
    })
    .forEach(function(item) {
      //Get the first letter of the last name, and if the last name changes
      //put the letter in the array
        
      var itemCharCode = item.c_location.toUpperCase().charCodeAt(0);
        
        
        
      if (itemCharCode < 65) {
         itemCharCode = 35; 
      }
   
      //We may jump two letters, be sure to put both in
      //(eg if we jump from Adam Bradley to Bob Doe, add both C and D)
      var difference = itemCharCode - currentCharCode;
      for (var i = 1; i <= difference; i++) {
        /*console.log(String.fromCharCode(currentCharCode));*/
        addLetter(currentCharCode + i);;
        
      }
      currentCharCode = itemCharCode;
        console.log(item);
      itemsFinal.push(item);
    });
    }
    
    
    
    $scope.getItems = function(search) {
    $scope.items = itemsFinal;
    $scope.search = search;
    letterHasMatch = {};
        
    //Filter contacts by $scope.search.
    //Additionally, filter letters so that they only show if there
    //is one or more matching contact
    return itemsFinal.filter(function(item) {
      var itemDoesMatch = !$scope.search || item.isLetter ||
        item.c_location.toLowerCase().indexOf($scope.search.toLowerCase()) > -1
      //console.log(item.last_name.toString().charAt(0));
      
      //Mark this person's last name letter as 'has a match'
      if (!item.isLetter && itemDoesMatch) {

        var letter = item.c_location.charAt(0).toUpperCase();
        if ( item.c_location.charCodeAt(0) < 65 ){
          letter = "#";
        }
        letterHasMatch[letter] = true;
      }

      return itemDoesMatch;
    }).filter(function(item) {
      //Finally, re-filter all of the letters and take out ones that don't
      //have a match
      if (item.isLetter && !letterHasMatch[item.letter]) {
        return false;
      }
      return true;
    });
  };
    
    
    function addLetter(code) {
    var letter = String.fromCharCode(code);

    itemsFinal.push({
      isLetter: true,
      letter: letter
    });
   
    letters.push(letter);
  }
})


app.controller('QueriesCtrl', function() {

})


app.controller('AboutCtrl', function() {

})


app.controller('loginController', function($scope,$http, loginData, $location) {
    console.log(ip);
    $scope.login = {username:'', password:'',name:'',id:'',code:'' ,menutype:'' }
    var form = document.getElementById("myForm");  
    form.onsubmit = function(){
    form.reset();
  }


$scope.verificar =  function(login){
                var peticion = "ListarClienteEspecifico?datos=";
                var request = "";
                request = request.concat(ip, peticion, $scope.login.username,"/",$scope.login.password);
                console.log("Request es:", request);

                $http.get(request)
                        .then(function (response) {
                        console.log('Get Post', response);
                        console.log("Get Post status", response.data);
                        var data = response.data;
                        var result = data.substring(76, data.length - 9);
                        console.log("Get Post status", result);
                    
                        var result2 = angular.fromJson(result);

                        console.log("Get Post status 2", result2);
    


                        if (result==="[]"){
                            alert("login erorr")
                            }

                        else{

                            updateRoles(login,result2[0].id,result2[0]._name,result2[0].username, result,loginData, $location)

                        }

                    });   
}


function updateRoles(login,id,name, username, result,loginData,$location){
    var rol = [];
    
    var peticion = "ListarRolesUsuario?datos="
    var request = "";
    request = request.concat(ip,peticion,id);
    $http.get(request)
            .then(function (response) {
            console.log('Get Post', response);
            console.log("Get Post status", response.data);
            var data = response.data;
            var result = data.substring(76, data.length - 9);
            console.log("Get Post status", result);
        
        
            var result4 = angular.fromJson(result);

    for(i=0; i<result4.length;i++){
            rol.push(result4[i].type);
                                    }

            if (rol[0]===0){  
            loginData.updateLogin(login,id,name,username,rol);
            $location.path('/materials');
            }

            else if (rol[0]===1){    
            loginData.updateLogin(login,id,name,username,rol);
            $location.path('/materials');
            }

            else if (rol[0]===2){    
            loginData.updateLogin(login,id,name,username,rol);
            $location.path('/materials');
            }

            else if (rol[0]===3){    
            loginData.updateLogin(login,id,name,username,rol);
            $location.path('/materials');
            }
         }); 

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
                            $location.path('/login');
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