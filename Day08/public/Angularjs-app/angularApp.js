angular.module("meanGames",["ngRoute"]).config(routeMapp);

function routeMapp($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"angularjs-app/main/welcome.html"
    }).when("/games",{
        templateUrl:"angularjs-app/games/games.html",
        controller:"gamesController",
        controllerAs:"vm"
    }).when("/games/:gameId",{
        templateUrl:"angularjs-app/game/game.html",
        controller:"gameController",
        controllerAs:"vm"
    }).otherwise({
        redirectTo:"/"
    })
}