angular.module("meanGames").factory("GamesFactory",GamesFactory);

function GamesFactory($http) {
    return{
        getAllGames: getAll,
        getOneGame: getOne
    }

    function getAll() {
        return $http.get("/api/games").then(complete).catch(failed);
    }
    function getOne(gameId) {
        return $http.get("/api/games/"+gameId).then(complete).catch(failed);
    }
    function complete(response) {
        return response.data;
    }
    function failed(err){
        return err;
    }
}