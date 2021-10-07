angular.module("volleyballTeams",["ngRoute"]).config(routeMap);

function routeMap($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"angularjs-app/main/welcome.html"
    }).when("/teams",{
        templateUrl:"angularjs-app/teams/teams.html",
        controller:"teamsController",
        controllerAs:"vm"
    }).when("/teams/:teamId",{
        templateUrl:"angularjs-app/team/team.html",
        controller:"teamController",
        controllerAs:"vm"
    })
}