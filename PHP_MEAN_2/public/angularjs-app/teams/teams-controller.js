angular.module("volleyballTeams").controller("teamsController", teamsController);

function teamsController(teamsFactory) {
    const vm = this;
    vm.offset = 0;
    vm.title = "VOLLEYBALL TEAMS APP";
    vm.getAll = function (offset) {
        teamsFactory.getAllTeams(offset).then(function (response) {
            vm.teams = response;
            console.log(vm.teams);
        });
    }
    vm.addTeam = function () {
        if (vm.teamForm.$dirty && vm.teamForm.$valid) {
            const newTeam = {
                country: vm.teamCountry,
                dateStarted: vm.timeStarted
            }
            console.log("DateStarted", newTeam.dateStarted);
            teamsFactory.addTeam(newTeam).then(function (response) {
                console.log("Add team called");
            }).catch(function (err) {
                console.log(err);
            });
        }
    }
    vm.next = function () {
        vm.offset += 6;
        if (vm.offset>vm.teams.length) {
            vm.offset = vm.teams.length;
        }
        vm.getAll(vm.offset);
    }
    vm.prev = function () {
        vm.offset -= 6;
        if (vm.offset < 0) {
            vm.offset = 0;
        }
        vm.getAll(vm.offset)
    }
    vm.getAll(vm.offset)
}