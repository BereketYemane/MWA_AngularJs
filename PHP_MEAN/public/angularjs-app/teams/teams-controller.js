angular.module("volleyballTeams").controller("teamsController",teamsController);

function teamsController(teamsFactory){
    const vm = this;
    vm.country = "VOLLEYBALL TEAMS APP";
    teamsFactory.getAllTeams().then(function(response){
        vm.teams = response;
    });
}