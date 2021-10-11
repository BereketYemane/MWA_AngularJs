angular.module("volleyballTeams").factory("teamsFactory",teamsFactory);

function teamsFactory($http) {
    return{
        getAllTeams: getAll,
        getTeam:getOne,
        addTeam:addOne,
        deleteTeam:deleteOne,
        updateTeam:updateOne,
        getAllTeamPlayers:getAllTeamPlayers,
        addTeamPlayer:addPlayer,
        getTeamPlayer:getPlayer,
        updateTeamPlayer:updatePlayer,
        deleteTeamPlayer:deletePlayer,
        
        addUser: addUser
    }

    function getAll(offset) {
       return $http.get("/api/teams?offset="+offset).then(complete).catch(failed);
    }
    function getOne(teamId){
        return $http.get("/api/teams/"+teamId).then(complete).catch(failed);
    }
    function addOne(newTeam) {
        return $http.post("/api/teams",newTeam).then(complete).catch(failed);
     }
     function deleteOne(teamId){
        return $http.delete("/api/teams/"+teamId).then(complete).catch(failed);
    }
    function updateOne(teamId,team){
        return $http.put("/api/teams/"+teamId,team).then(complete).catch(failed);
    }
    function getAllTeamPlayers(teamId) {
        return $http.get("/api/teams/"+teamId+"/players").then(complete).catch(failed);
    }
    function addPlayer(teamId,player) {
        return $http.post("/api/teams/"+teamId+"/players",player).then(complete).catch(failed);
    }
    function getPlayer(teamId,playerId) {
        return $http.get("/api/teams/"+teamId+"/players/"+playerId).then(complete).catch(failed);
    }

    function updatePlayer(teamId,playerId,player) {
        return $http.put("/api/teams/"+teamId+"/players/"+playerId,player).then(complete).catch(failed);
    }
    function deletePlayer(teamId,playerId) {
        return $http.delete("/api/teams/"+teamId+"/players/"+playerId).then(complete).catch(failed);
    }

    function addUser(newUser) {
        return $http.post("/api/users",newUser).then(complete).catch(failed);
     }

    function complete(response){
        return response.data;
    }
    function failed(err){
        return err;
    }
    
}