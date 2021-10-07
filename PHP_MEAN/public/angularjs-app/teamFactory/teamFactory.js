angular.module("volleyballTeams").factory("teamsFactory",teamsFactory);

function teamsFactory($http) {
    return{
        getAllTeams: getAll,
        getTeam:getOne
    }

    function getAll() {
       return $http.get("/api/teams").then(complete).catch(failed);
    }
    function getOne(teamId){
        return $http.get("/api/teams/"+teamId).then(complete).catch(failed);
    }
    function complete(response){
        return response.data;
    }
    function failed(err){
        return err;
    }
    
}