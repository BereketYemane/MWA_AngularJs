angular.module("meanGames").controller("gamesController",gamesController);

function gamesController(GamesFactory){
    const vm = this;
    vm.title = "MEAN GAMES APP";
    GamesFactory.getAllGames().then(function(response){
        vm.games = response;
    });  
}
