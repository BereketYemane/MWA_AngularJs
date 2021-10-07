angular.module("volleyballTeams").controller("teamController",teamController);

function teamController(teamsFactory,$routeParams){
    const vm = this;
    const id = $routeParams.teamId;
    teamsFactory.getTeam(id).then(function(response){
        vm.team = response;
    });
}