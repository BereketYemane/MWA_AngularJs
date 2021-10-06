angular.module("myApp").factory("GameFactory", GameFactory);
function GameFactory($http) {
return {
getPosts: getPosts,
};
function getPosts() {
return $http.get("https://anime-facts-rest-api.herokuapp.com/api/v1").then(complete).catch(failed);
}
function complete(response) {
return response.data;
}
function failed(error) {
return error.statusText;
}
}