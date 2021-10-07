angular.module("volleyballTeams").controller("teamsController",teamsController);

function teamsController(teamsFactory){
    const vm = this;
    vm.title = "VOLLEYBALL TEAMS APP";
    teamsFactory.getAllTeams().then(function(response){
        vm.teams = response;
    });
}