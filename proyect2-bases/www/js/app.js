var app = angular.module('App', ['ngRoute']);

var ip = "http://192.168.0.30:8080/Construtec.asmx/";

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
        .when('/queries',{
            controller: 'QueriesCtrl',
            templateUrl:'templates/queries.html'
            })
        .when('/addMaterials',{
            controller: 'AddMaterialsCtrl',
            templateUrl:'templates/addMaterials.html'
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
        
        addDelay();
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

app.controller('WorksCtrl', function($location,$http, $scope, workData,loginData) {
    
    $scope.stages = function(id) {
        workData.updateWork(id);
        $location.path('/stages');
    };
   var peticion = "ListarProyectos?datos=";
    var request = "";
    var login = loginData.getLogin();
    var id = login.id;
    console.log("id es: ", id);
    $scope.items = [];
    itemsFinal=$scope.itemsFinal=[];
               
    request = request.concat(ip, peticion, id);
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
    
  $scope.addWork = function(place,client){
     var form = document.getElementById("myForm2");  
    var peticion = "RegistrarObra?datos=";
    var newid = new Date().getTime().toString().slice(8,14);
    var request = "";
    var id = login.id;
               
    request = request.concat(ip, peticion,newid,"/",place,"/",client,"/",id);
    console.log("Request es:", request);
    $http.get(request)
            .then(function (response) {
            console.log('Get Post', response);
            console.log("Get Post status", response.data);
            var data = response.data;
            var result = data.substring(76, data.length - 9);
           
            if (result=="no se pudo establecer la conexión de la base de datos"){
                alert("Error: server conection");
            }else {
                alert("Work Creadted");
                form.reset();
    }
  })}

})

app.controller('StagesCtrl', function($http, $scope, $location, workData, stageData,loginData) {
    var form = document.getElementById("myForm3");
    var form2 = document.getElementById("myForm2");
    var login = loginData.getLogin();
    $scope.addMaterials = function(id) {
        stageData.updateStage(id);
        $location.path('/addMaterials');
    };
    
    var work = workData.getWork();
    var work_id = work.id;
    $scope.items = [];
    var materials = [];
    
    var new_stage_id = new Date().getTime().toString().slice(4,14);
    
    itemsFinal=$scope.itemsFinal=[];
    
    $scope.sell = function () {
        var peticion = "AsignacionMateriales?datos=";
        var request = "";
          request = request.concat(ip, peticion, work_id, "/",stage_id);
        for (var i in materials) {
            request = request.concat("/", materials[i].id, "/", materials[i].amount, "/" ,materials[i].description)
        }
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
    })
    };
    
    
    $scope.addItemStage = function (id_mat, description_mat) {
        addCart(id_mat, description_mat);
    };
    
    $scope.update = function() {
        var peticion = "ListarEtapasPorProyecto?datos=";
        var request = "";
        console.log("este es el id",work_id)
        request = request.concat(ip, peticion,work_id);
        console.log("Request es:", request);
        itemsFinal=$scope.itemsFinal=[];
    $http.get(request)
            .then(function (response) {
            console.log('Get Post', response);
            console.log("Get Post status", response.data);
            var data = response.data;
            var result = data.substring(76, data.length - 9);
            console.log("Get Post status", result);
        
            if (result=="no se pudo establecer la conexión de la base de datos"){
             alert("error: click update");   
            }else{
            var result2 = angular.fromJson(result);
            console.log("Get Post status 2", result2);
            for(var i in result2) {
            $scope.items.push(result2[i]);
            }
            var result3 = $scope.items;
            console.log("Result3 ", result3);
            }

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

        var letter = item.description.charAt(0).toUpperCase();
        if ( item.description.charCodeAt(0) < 65 ){
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
    
    
    
    $scope.addStage=function(comment,date1,date2,id){
        
        var peticion = "RegistrarEtapa?datos=";
        var newid = new Date().getTime().toString().slice(8,14);
        var request = "";
        var id = login.id;

        request = request.concat(ip, peticion,newid,"/",comment.replace(" ","%20"));
        console.log("Request es:", request);
        $http.get(request)
                .then(function (response) {
                console.log('Get Post', response);
                console.log("Get Post status", response.data);
                var data = response.data;
                var result = data.substring(76, data.length - 9);

                if (result=="no se pudo establecer la conexión de la base de datos"){
                    alert("Error: server conection");
                }else {
                    assingStage(newid,date1,date2);

                            }
  })
    }
    $scope.addStage2=function(d,sdate,fdate){
        assingStage(id,sdate,fdate)
    };
    
    function assingStage(id,sdate,fdate){
            console.log("djsbdnsbd");
            var peticion = "AsignacionEtapa?datos=";
            var request = "";
            var id = login.id;
            request = request.concat(ip, peticion,work.id,"/",id,"/",sdate,"/",fdate);
            console.log("Request es:", request);
            $http.get(request)
                .then(function (response) {
                console.log('Get Post', response);
                console.log("Get Post status", response.data);
                var data = response.data;
                var result = data.substring(76, data.length - 9);
    
            if (result=="no se pudo establecer la conexión de la base de datos"){
                alert("Error: server conection");
            }else {
                alert("Stage Creadted");
                form.reset();
                form2.reset();
            }
                  })
    
    
};    
})


app.controller('AddMaterialsCtrl', function(stageData, $scope, $http) {
    var materials = [];
    
    var stage = stageData.getStage();
    var stage_id = stage.id;
    
    function addCart(id, description){   //[id, description, amount]
                    for (var i in materials) {
                        if (materials[i].id === id) {                            
                            materials[i].amount++;
                            return;
                        }
                    }
            var item = {id:id, description: description, amount: 1};
                    materials.push(item);
                    materials = JSON.parse(JSON.stringify(materials));
                    
                }
    
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
        
        addDelay();
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
    
})


app.controller('QueriesCtrl', function($scope, $http) {
    var nombre = "";
    $scope.nombreMat = function(name) {
        nombre = name;
    };
    
    var peticion = "ProyectoConMaterialX?datos=";
    var request = "";
    
    $scope.items = [];
    itemsFinal=$scope.itemsFinal=[];
               
    request = request.concat(ip, peticion, nombre);
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
        
        addDelay();
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
    
                        if (result==="[]"){
                            alert("login erorr")
                            }
                        else if (result=="no se pudo establecer la conexión de la base de datos"){
                            alert("database conection error");
                        }
                        else{
                            var result2 = angular.fromJson(result);
                            console.log("Get Post status 2", result2);

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
            $location.path('/works');
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

            var peticion = "ListarClienteEspecifico?datos=";

            request = request.concat(ip, peticion, $scope.signUp.UserName,"/",$scope.signUp.password);
            console.log("Request es:", request);

            $http.get(request)
            .then(function (response) {
            console.log('Get Post', response);
            console.log("Get Post status", response.data);
            var data = response.data;
            var result = data.substring(76, data.length - 9);
            console.log("Get Post status", result);

        
                         if (result==="[]"){
                            registry(type,icode);
                        }else{
                            alert("User Name number already in use")
                        }                         

                    }); 
            }

    function registry(type,icode){
                        var request2 = "";
                        var peticion2 = "RegistrarClientes?datos=";
                        var newid = new Date().getTime().toString().slice(4,14);
                        var newid2 ="";
        
                        if (type==0){
                            newid2=icode;   
                        }else {
                        newid2 =new Date().getTime().toString().slice(0,10);
                            
                            
                            
                        }                                        
                        request2 = request2.concat(ip,peticion2,newid,"/",$scope.signUp.Uname,"/",$scope.signUp.lname1,"/",$scope.signUp.inum,"/",$scope.signUp.password,"/",$scope.signUp.UserName,"/",$scope.signUp.phone,"/",type,"/",newid2);
        
                        console.log(request2);
                        
                        $http.get(request2)
                                .then(function (response) {
                                console.log('Get Post', response);
                                console.log("Get Post status", response.data);
                                var data = response.data;
                                var result = data.substring(70, data.length - 9);
                                console.log("Get Post status", result);
                       
        
                            if (result==="no se pudo establecer la conexión de la base de datos"){
                                if (type==0){
                                alert("check the data or change then ingineere code");
                                }else 
                                alert("check the data");

                            }else{
                                form.reset();
                                $location.path('/login');
                            }
                            
                            });
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


.service('workData', function() {
return {
work: {},
getWork: function() {
 return this.work;
},
updateWork: function(id) {
   this.work.id=id;
}
}
})  

.service('stageData', function() {
return {
stage: {},
getStage: function() {
 return this.stage;
},
updateStage: function(id) {
   this.stage.id=id;
}
}
}) 


app.directive('menu', function() {
return {
 templateUrl: 'templates/menu.html',
  controller:"MenuCtrl"
};});