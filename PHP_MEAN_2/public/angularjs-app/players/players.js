angular.module("volleyballTeams").controller("playersController", playersController);

function playersController(teamsFactory, $routeParams) {
    const vm = this;
    const teamId = $routeParams.teamId
    vm.title = "VOLLEYBALL Players";
    teamsFactory.getAllTeamPlayers(teamId).then(function (response) {
        vm.team = response;
    });

    vm.addPlayer = function () {
        const teamId = $routeParams.teamId
        if (vm.playersForm.$dirty && vm.playersForm.$valid) {
            const newPlayer = {
                number: vm.number,
                name: vm.name,
                birthdate: vm.birthdate,
                height: vm.height,
                weight: vm.weight
            }
            console.log("new player",newPlayer);
            teamsFactory.addTeamPlayer(teamId,newPlayer).then(function (response) {
                console.log("Add player called");
            }).catch(function (err) {
                console.log(err);
            });
        }
    }    
}