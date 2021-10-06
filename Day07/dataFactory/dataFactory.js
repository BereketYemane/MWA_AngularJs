angular.module("myApp").factory("AnimeFactory", AnimeFactory);
function AnimeFactory($http) {
return {
Animes: getAnimes,
};
function getAnimes() {
return $http.get("https://anime-facts-rest-api.herokuapp.com/api/v1").then(complete).catch(failed);
}
function complete(response) {
return response.data;
}
function failed(error) {
return error.statusText;
}
}