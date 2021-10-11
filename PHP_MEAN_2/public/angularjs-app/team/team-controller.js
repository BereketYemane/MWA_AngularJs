angular.module("volleyballTeams").controller("teamController",teamController);

function teamController(teamsFactory,$routeParams){
    const vm = this;
    const id = $routeParams.teamId;
    teamsFactory.getTeam(id).then(function(response){
        vm.team = response;
    });

    vm.deleteTeam = function(teamId){
        teamsFactory.deleteTeam(teamId).then(function(response){
            console.log("delete team");
        });
    }

    vm.updateTeam = function (teamId) {
        if (vm.teamForm.$dirty && vm.teamForm.$valid) {
            const newTeam = {
                country: vm.teamCountry,
                dateStarted: vm.timeStarted
            }
            teamsFactory.updateTeam(teamId,newTeam).then(function (response) {
                console.log("update team called");
            }).catch(function (err) {
                console.log(err);
            });
        }
    }
}