angular.module("meanGames").controller("gameController",gameController);

function _getStarRating(start){
    return new Array(start);
}

function gameController(GamesFactory,$routeParams) {
    const vm = this;
    const id = $routeParams.gameId;
    GamesFactory.getOneGame(id).then(function(response) {
        vm.game = response;
        vm.rating = _getStarRating(response.rate);
    })
}