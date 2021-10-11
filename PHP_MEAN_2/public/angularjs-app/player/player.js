angular.module("volleyballTeams").controller("playerController", playerController);
function playerController(teamsFactory, $routeParams) {
    const vm = this;
    const teamId = $routeParams.teamId;
    const playerId = $routeParams.playerId;
    vm.teamId=teamId;
    teamsFactory.getTeamPlayer(teamId,playerId).then(function (response) {
        vm.player = response;
        console.log(vm.player);
    });

    vm.editPlayer = function () {
        const teamId = $routeParams.teamId
        const playerId = $routeParams.playerId
        if (vm.playersForm.$dirty && vm.playersForm.$valid) {
            const newPlayer = {
                number: vm.number,
                name: vm.name,
                birthdate: vm.birthdate,
                height: vm.height,
                weight: vm.weight
            }
            teamsFactory.updateTeamPlayer(teamId,playerId,newPlayer).then(function (response) {
                console.log("Update player called");
            }).catch(function (err) {
                console.log(err);
            });
        }
    }  
    vm.deletePlayer = function(playerId){
        const teamId = $routeParams.teamId;
        teamsFactory.deleteTeamPlayer(teamId,playerId).then(function(response){
            console.log("delete player called");
        });
    }
}
