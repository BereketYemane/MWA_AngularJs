angular.module("myJokeApp").factory("JokeFactory", JokeFactory);
function JokeFactory($http) {
return {
getTenJokes: getTenJokes,
getOneJoke: getOneJoke
};
function getTenJokes() {
return $http.get("https://official-joke-api.appspot.com/jokes/ten").then(complete).catch(failed);
}
function complete(response) {
return response.data;
}
function failed(error) {
return error.statusText;
}
}