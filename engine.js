(function() {
  var app = angular.module("myApp", ["ui.router"]);

  app.run(function($rootScope, $location, $state, LoginService) {
    $rootScope.$on("$stateChangeStart", function(
      event,
      toState,
      toParams,
      fromState,
      fromParams
    ) {
      console.log("Changed state to: " + toState);
    });

    if (!LoginService.isAuthenticated()) {
      $state.transitionTo("login");
    }
  });

  app.config([
    "$stateProvider",
    "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/home");

      $stateProvider
        .state("login", {
          url: "/login",
          templateUrl: "login.html",
          controller: "LoginController"
        })
        .state("home", {
          url: "/home",
          templateUrl: "home.html",
          controller: "HomeController"
        });
    }
  ]);

//controller pagina de logare
  app.controller("LoginController", function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    LoginService
  ) {
    $rootScope.title = "Bun venit la noi!";//pentru login form

    $scope.formSubmit = function() {
      if (LoginService.login($scope.username, $scope.password)) {
        $scope.error = "";
        $scope.username = "";
        $scope.password = "";
        $state.transitionTo("home");
      } else {
        $scope.error = "Incorrect username/password !";
      }
    };
  });
  
//controller pagin home
  app.controller("HomeController", function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    LoginService
  ) {
    $rootScope.title = "Produse";//pentru pagin home
	//denumirea, pretul si poza produselo, se poate de mai adaugat descrierea
	$scope.names = [
    
    {name:'Pioneer HD-701',price:'1267',photo:'Images/nav2.jpg',desc:'GPS navigatorul - este un model al anului 2018. Dispozitivul este echipat cu un display de 5 inci, care vă permite să vă..'},
    {name:'Samsung 50 G',price:'1320',photo:'Images/nav3.jpg',desc:'Auto GPS Navigator, care vă va permite să procesați rapid coordonatele receptorului GPS. Capacitatea RAM al acestui darad ..'},
    {name:'Navi HD 7012',price:'1450',photo:'Images/nav4.jpg',desc:'Navigator Navi G este echipat cu un ecran de 5 inch cu o rezoluție înaltă de 800x480 px Aceasta este rezoluția op..'},
    {name:'Pioneer HD 7012',price:'1450',photo:'Images/nav6.jpg',desc:'GPS navigatorul - este un model al anului 2017. Dispozitivul este echipat cu un display de 7 inci, care vă permite să vă..'},
    {name:'Nokian HD 70N ',price:'378',photo:'Images/nav7.jpg',desc:'GPS navigatorul - este un model al anului 2018. Dispozitivul este echipat cu un display de 7 inci, care vă permite să vă..'},
    {name:'NV GPS D 7099',price:'1550',photo:'Images/nav8.jpg',desc:'Auto GPS Navigator, care vă va permite să procesați rapid coordonatele receptorului GPS. Capacitatea RAM lui de a prinde ..'},
	{name:'Samsung 59',price:'1450',photo:'Images/nav9.jpg',desc:'Auto GPS Navigator, care vă va permite să procesați rapid coordonatele receptorului GPS. Capacitatea RAM al acestui radar ..'},
	{name:'Pioneer 5730',price:'1200',photo:'Images/nav1.jpg',desc:'Navigator Pioneer 50 D este echipat cu un ecran de 5 inch cu o rezoluție înaltă de 800x480 px. Aceasta este rezoluția o..'},
	
	{name:'Super Ka Plus',price:'500',photo:'Images/r1.jpg',desc:'Detector radar Super Ka Plus reprezinta o nouă generație de detectoare de radar concepute să funcționeze pe teritoriul U..'},
	{name:'Sho-Me 425',price:'800',photo:'Images/r2.jpg',desc:'Receptor Gama K: 24050-24250 MHz Gama Ka: 34,300-34,940 MHz Gama X: 10500-10550 MHz Detectarea radiației laser es..'},
	{name:'Street Storm STR-60',price:'950',photo:'Images/r3.jpg',desc:'Seria: BSP Receptor Tip: , cu dubla conversie Unitatea de incastrat: Fără Indicatori: afișare literală bazate pe diode e..'},
	{name:'Autofun ARD-1301',price:'1050',photo:'Images/r4.jpg',desc:'Autofun ARD-1301 - Detector radar Parametrii tehnici: Determinarea gamei de bandă largă X, K, Ki, Ka. Detectarea semnal..'},
	{name:'Crunch 221B',price:'1600',photo:'Images/r5.jpg',desc:'Receptor Gama K: 24050-24250 MHz Gama Ka: 33,400 la 36,000 MHz Gama X: 10500-10550 MHz Detectarea radiației laser este, ..'},
	{name:'Crunch 223B',price:'980',photo:'Images/r6.jpg',desc:'Display LED Detecție la 360 de grade laser Protecție împotriva VG-2 Direction Finder Frecvența avertizării sonore care pot fi ..'},
	{name:'Cobra RU 830',price:'1980',photo:'Images/r7.jpg',desc:'Receptor Gama K: 24050-24250 MHz Gama Ka: 33,400 la 36,000 MHz Gama Ku: 13400-13470 MHz Gama X: 10500-10550 MHz Det..'},
	{name:'Sho-Me 520',price:'2350',photo:'Images/r8.jpg',desc:'Receptor Gama K: 24050-24250 MHz Gama Ka: 34,300-34,940 MHz Gama X: 10500-10550 MHz Detectarea radiației laser este,..'},
	
	
	{name:'Radio auto-5983',price:'250',photo:'Images/m1.jpg',desc:'Specificații radio-auto 5983: Consola: 1DIN; Radio FM (stereo) Frecvență FM: 87,5 MHz ~ 108 MHz Grupuri: FM1, FM2,..'},
	{name:'SP-1236',price:'320',photo:'Images/m2.jpg',desc:'Radio SP-1236 Excelent radio de buget Se poate conecta prin USB sau printr-un slot pentru carduri de memorie microSD..'},
	{name:'MP3 5500',price:'1980',photo:'Images/m3.jpg',desc:'Descriere: Panoul frontal detașabil; Display pe 2 linii OEL (16 caractere); Iluminarea butonului roșu; Telecomandă..'},
	{name:'Sigma CP 100G',price:'500',photo:'Images/m4.jpg',desc:'Descriere Sigma CP 100G Receptorul media digital SIGMA CP 100 este echipat cu un ecran LCD informativ cu iluminare ..'},
	
  
  ];
  
  });

  app.factory("LoginService", function() {
    var admin = "nikita";
    var pass = "12345";
    var isAuthenticated = false;

    return {
      login: function(username, password) {
        isAuthenticated = username === admin && password === pass;
        return isAuthenticated;
      },
      isAuthenticated: function() {
        return isAuthenticated;
      }
    };
  });
  

})();
