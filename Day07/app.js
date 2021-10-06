angular.module("myApp", ["ngRoute"]).config(config);
function config($routeProvider) {
$routeProvider.when("/", {
templateUrl: "main/main.html",
controller: "mainController",
controllerAs: "mainCtrl"
}).otherwise({
    redirectTo: "/"
    });
}