var app = angular.module('App', ['ionic']);

var ip = "http://172.26.100.221:8080/Construtec.asmx/";// ip necesaria para acceso al webservice:: cambiar ip segun host



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


//se definen las views, las rutas de cada una y el controlador correspondiente
app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',//url con la que se accesa a login
            controller: 'loginController'// controlador de la vista del login
        
        })
    
        // se definen igual que para login las demas views
        .state('signUp', {
            url: '/signUp',
            controller: 'SignUpCtrl',
            templateUrl:'templates/signUp.html'
        })
            .state('menu', {
                url:'/menu',
                abstract: true,         
                controller: 'MenuCtrl',
                templateUrl:'templates/menu.html'
            })
        //par al view de about
        .state('menu.about',{
            url: '/about',
            views: {
                    'menuContent': {
                        controller: 'AboutCtrl',
                        templateUrl:'templates/about.html'
                    }
                } 
            
            })
        //para el view de materiales   
        .state('menu.materials',{
            url: '/materials',
            views: {
                    'menuContent': {
                        controller: 'MaterialsCtrl',
                        templateUrl:'templates/materials.html'
                    }
                }
            
            })
    
        // para el view de las obras
        .state('menu.works',{
            url: '/works',
        views: {
                    'menuContent': {
                        controller: 'WorksCtrl',
                        templateUrl:'templates/works.html'
                    }
                }
            
            })
        // para el view de las etapas
        .state('stages',{
            url: '/stages',
            controller: 'StagesCtrl',
            templateUrl:'templates/stages.html'      
            })
    
        //para el view de las queries del usuario general
        .state('menu.queries',{
            url: '/queries',
        views: {
                    'menuContent': {
                        controller: 'QueriesCtrl',
                        templateUrl:'templates/queries.html'
                    }
                }
            
            })
    
        //para el view que agrega materiales a una etapa
        .state('addMaterials',{
            url: '/addMaterials',
            controller: 'AddMaterialsCtrl',
          templateUrl:'templates/addMaterials.html'               
            
            })
    
        //para el view que muestra los materiales en una etapa
        .state('materialsStage',{
            url: '/materialsStage',
            controller: 'MaterialsStageCtrl',
            templateUrl:'templates/materialsStage.html'

            })
        // para iniciar directamente en el login
         $urlRouterProvider.otherwise('/login');

})

// se define el controlador para el menu
app.controller('MenuCtrl', function($scope,$state,loginData) {
$scope.login = loginData.getLogin();// recupera los datos del login
console.log($scope.login.username);    
//se definen las variables de control para los permisos
$scope.engine=false;// para ingenieros
$scope.client=false;// para clientes
$scope.general=false;//para el usuario general
$scope.admi=false;// para el administrador 

var type=$scope.login.menutype;
// se recorre un arrary con los roles del usuario actual para poder identificar variables de seguridad    
for ( i= 0; i< type.length; i++ )  {
 if (type[i]==0){// si es un ingeniero
     $scope.engine=true;
 }
  else if (type[i]==1){//si es un cliente
     $scope.client=true;
 }
  else if (type[i]==2){//si es un usuario general
     $scope.general=true;
 }
 else if (type[i]==3){// si es un administrador
     $scope.admi=true;
 }
}
    
    $scope.login = loginData.getLogin();
    $scope.logOut = function(){
        $state.go('login');
    };
    
})

// se define el controlador que permite ver todos los materiales existentes
app.controller('MaterialsCtrl', function($http, $scope) {
    var peticion = "ConsutaMateriales";// peticion necesaria para pedir todos los materiales en epatec del web service 
    var request = "";// string que concatena el request completo
    
    $scope.items = [];
    itemsFinal=$scope.itemsFinal=[];
               
    request = request.concat(ip, peticion);
    console.log("Request es:", request);
    $scope.update = function() {
        itemsFinal=$scope.itemsFinal=[];
    $http.get(request)// se llama al web service para acceder a lo solicitado en el request
    
            .then(function (response) {// se capta la respuesta del servidor
            console.log('Get Post', response);
            console.log("Get Post status", response.data);
            var data = response.data;// se toma la respuesta
            var result = data.substring(76, data.length - 9);// se castea a un string con solo el json
            console.log("Get Post status", result);
            var result2 = angular.fromJson(result);// se parsea a json
            console.log("Get Post status 2", result2);
            
            for(var i in result2) {// se agregan los items parseados del json a una lista para poder utilizarlos
            $scope.items.push(result2[i]);// push a la lista
            }
            var result3 = $scope.items;// se asigna la lista completa
            console.log("Result3 ", result3);

 });
        
        addDelay();// delay para evitar problemas secuenciales
      };
    
    
    function addDelay() {// funcion  que agrega un delay para poder mantener la continuidad logica del programa
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
    $scope.form = document.getElementById("myForm2");
    $scope.user=false;
    
    $scope.stages = function(id,name) {
        workData.updateWork(id,name);
        $location.path('/stages');
    };
    var peticion = "ListarProyectos?datos=";
    var request = "";
    var login = loginData.getLogin();
    var type=login.menutype;  
    
    for ( i= 0; i< type.length; i++ )  {
         if (type[i]==0){
             $scope.user=true;
         }
    }
    
    var id = login.id;
    console.log("id es: ", id);
    $scope.items = [];
    $scope.items2 = [];
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
    
    
    $scope.print=function(id){
      cosole.log("ESTE ES EL PUTO ID DE MIERDA  ",id);  
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
                $scope.form.reset();
                $scope.update();
    }
  })}
  
  
  $scope.getUsers=function(){
    var peticion2 = "ListarTodosClientes";
    var request2 = "";               
    $scope.items2=[];  
    request2 = request2.concat(ip, peticion2);
    console.log("Request es:", request2);
    $http.get(request2)
            .then(function (response) {
            console.log('Get Post', response);
            console.log("Get Post status", response.data);
            var data = response.data;
            var result = data.substring(76, data.length - 9);
            console.log("Get Post status", result);
            var result2 = angular.fromJson(result);
            console.log("Get Post status 2", result2);
            for(var i in result2) {
                $scope.items2.push(result2[i]);
            }
            var result3 = $scope.items;
            console.log("Result3 ", result3);
        

 });  
      
  };
  

})

app.controller('StagesCtrl', function($http, $scope, $location, workData, stageData,loginData) {
    $scope.bto=false;
    $scope.user=false;
    $scope.form = document.getElementById("myForm3");
    $scope.form2 = document.getElementById("myForm2");
    var work = workData.getWork();
    var work_id = work.id;
    var login = loginData.getLogin();
    var type=login.menutype;  
        for ( i= 0; i< type.length; i++ )  {
         if (type[i]==0){
             $scope.user=true;
         }
    }
    $scope.addMaterials = function(id,name) {
                
            var peticion = "ListarMaterialesEtapa?datos=";
            var request = "";
    

            request = request.concat(ip, peticion,id,"/",work_id);
            console.log("Request es:", request);
            $http.get(request)
                    .then(function (response) {
                    console.log('Get Post', response);
                    console.log("Get Post status", response.data);
                    var data = response.data;
                    var result = data.substring(76, data.length - 9);
                    console.log("Get Post status", result);
                
                    if (result=="[]"){
                        stageData.updateStage(id,name);
                        $location.path('/addMaterials');
                    }
                    else if (result=="no se pudo establecer la conexión de la base de datos"){
                        alert("Error: accesto data base; try agian")
                    }
                    else {
                        stageData.updateStage(id,name);
                        $location.path('/materialsStage');
                
                    }
             });
                
        
    };
    

    $scope.name=work.name;
    $scope.items = [];
    var materials = [];
    
    var new_stage_id = new Date().getTime().toString().slice(4,14);
    
    itemsFinal=$scope.itemsFinal=[];
    $scope.precioFinal = 0;
    
    function evitaHilos(i) {
        var peticion = "PresupuestoEtapa?datos=";
        var request = "";
        request = request.concat(ip, peticion,$scope.items[i].id,",",work_id);
        console.log("Id experimental es:", $scope.items[i].id);
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
            console.log("Precio experimental es: ", result2[0].total);
            
            if (result2[0].total == null) {
                $scope.items[i].price = 0;
            }
                else {
                    
                                
                    $scope.items[i]['price'] = result2[0].total;
                }
            var result3 = $scope.items;
            console.log("Result experimental ", result3);
            $scope.precioFinal = $scope.precioFinal + $scope.items[i].price;
            }
 });
    }
    
    
    
    $scope.updatebto = function(){
        $scope.bto=!$scope.bto;
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
        
        /*var peticion2 = "PresupuestoTotal?datos=";
        var request = "";
        console.log("este es el id",work_id)
        request = request.concat(ip, peticion2,work_id);
        console.log("Request supra-experimental es:", request);
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
            $scope.precioFinal = result2[0].total;
            }

 });*/
       
        
        
        for(i = 0; i < $scope.items.length; i++) {
            evitaHilos(i);
        
        }
        
        
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
    $scope.addStage2=function(id,sdate,fdate){
        assingStage(id,sdate,fdate);
    };
    
    function assingStage(id,sdate,fdate){
            var peticion = "AsignacionEtapa?datos=";
            var request = "";
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
                $scope.update();
                alert("Stage Creadted");
                $scope.form.reset();
                $scope.form2.reset();

            }
                  })
    
    
};    
})


app.controller('AddMaterialsCtrl', function(stageData, $scope, $http,loginData,workData) {
    var materials = [];
    $scope.user=false;
    itemsFinal=$scope.itemsFinal=[];
    var stage = stageData.getStage();
    $scope.name=stage.name;
    var stage_id = stage.id;
    
    var work = workData.getWork();
    var work_id = work.id;
    
    var login = loginData.getLogin();
    var type=login.menutype;  
        for ( i= 0; i< type.length; i++ )  {
         if (type[i]==0){
             $scope.user=true;
         }
    }
    
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
    
    function elimCart(id) {
        for (var i in materials) {
                            if (materials[i].amount == 1) {
                                materials.splice(i, 1);
                            }
                        }
                    for (var i in materials) {
                        if (materials[i].id === id) {
                            if (materials[i].amount > 0) {
                            materials[i].amount--;
                            return;
                            }
                        }
                    }                        
                    
    }
    
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
        $scope.getItemsCart = materials;
    };

    $scope.elimItemStage = function (id_mat) {       
        elimCart(id_mat);
        $scope.getItemsCart = materials;
    };
    
    var peticion = "ConsutaMateriales";
    var request = "";
    
    $scope.items = [];
    
               
    request = request.concat(ip, peticion);
    console.log("Request es:", request);
    $scope.update = function() {
        $scope.items = [];
        materials = [];
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
    
    $scope.getItemsCart = materials;
    
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
        
    $scope.items2 = [];
    
    $scope.getWorks = function(name) {
    $scope.items2 = [];
 
    
    var peticion = "ProyectoConMaterialX?datos=";
    var request = "";

    request = request.concat(ip, peticion, name);
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
            for(var i in result2) {
                $scope.items2.push(result2[i]);
            }
                var result3 = $scope.items2;
                console.log("Result3 ", result3);

 });
      }; 
    
})


app.controller('AboutCtrl', function() {

})




app.controller('loginController', function($scope, $state, $http, loginData) {
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

                            updateRoles(login,result2[0].id,result2[0]._name,result2[0].username, result,loginData)

                        }

                    });   
}


function updateRoles(login,id,name, username, result,loginData){
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
                $state.go('menu.works'); 
            }

            else if (rol[0]===1){    
            loginData.updateLogin(login,id,name,username,rol);
                $state.go('menu.works'); 
            }

            else if (rol[0]===2){    
            loginData.updateLogin(login,id,name,username,rol);
                $state.go('menu.queries'); 
            }

            else if (rol[0]===3){    
            loginData.updateLogin(login,id,name,username,rol);
                $state.go('menu.materials'); 
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




// definicion del controller para los materiales ya registrados en una etapa especifica
app.controller('MaterialsStageCtrl', function(stageData, $scope, $http,loginData, workData) {
    var materials = [];
    
    var stage = stageData.getStage();// recupera datos del sstage
    $scope.name=stage.name;
    var stage_id = stage.id;
    
    var work = workData.getWork();// recupera datos del work
    var work_id = work.id;
    
    var login = loginData.getLogin();//recupera datos del login
    
    var type=login.menutype;  //verifica el tipo de usuario, para los permisos 
        for ( i= 0; i< type.length; i++ )  {
         if (type[i]==0){
             $scope.user=true;
         }
    }
    
    
    var peticion = "ListarMaterialesEtapa?datos=";
    var request = "";
    
    $scope.items = [];
    itemsFinal=$scope.itemsFinal=[];
               
    request = request.concat(ip, peticion,stage_id,"/",work_id);
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
            console.log("Result3  este", result3);

 });
        
        addDelay();
      };
    
    
    function addDelay() {
        $scope.items
        .sort(function(a, b) {
      return a.description.toUpperCase().charCodeAt(0) > b.description.toUpperCase().charCodeAt(0) ? 1 : -1;
    })
    .forEach(function(item) {
      //Get the first letter of the last name, and if the last name changes
      //put the letter in the array
        
      var itemCharCode = item.description.toUpperCase().charCodeAt(0);
        
        
        
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
    
    $scope.getItemsCart = materials;
    
    $scope.getItems = function(search) {
    $scope.items = itemsFinal;
    $scope.search = search;
    letterHasMatch = {};
        
    //Filter contacts by $scope.search.
    //Additionally, filter letters so that they only show if there
    //is one or more matching contact
    return itemsFinal.filter(function(item) {
      var itemDoesMatch = !$scope.search || item.isLetter ||
        item.description.toLowerCase().indexOf($scope.search.toLowerCase()) > -1
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
    
})

// se define un service que permite conservar la informacion del login para pasarlo entre controllers
.service('loginData', function() {
return {
login: {},
getLogin: function() {// para recuperar los datos 
 return this.login;
},
updateLogin: function(login,id,name,username,menutype) {// para actualizar los datos del login, y definir el tipo de menu segun tipo de usuario
   this.login = login;// username, password
   this.login.id=id;
   this.login.name=name;
   this.login.username=username;
   this.login.menutype=menutype;// tipo de menu segun permisos de del tipo de usuarios
}
}
}) 



// se define un service que permite conservar la informacion de un work especifico para pasarlo entre controllers
.service('workData', function() {// fefinicion
return {
work: {},
getWork: function() {// para recuperar los datos 
 return this.work;
},
updateWork: function(id,name) {// para actualizar los datos del work
   this.work.id=id;
    this.work.name=name;
}
}
})  

// se define un service que permite conservar la informacion de un stage especifico para pasarlo entre controllers
.service('stageData', function() {
return {
stage: {},
getStage: function() {// para recuperar los datos 
 return this.stage;
},
updateStage: function(id,name) {// para actualizar los datos del stage
   this.stage.id=id;
    this.stage.name=name;
}
}
}) 



// se define un template del menu, que permite el utilizarlo en todas las vistas que lo requiere
app.directive('menu', function() {
return {
 templateUrl: 'templates/menu.html',
  controller:"MenuCtrl"
};});