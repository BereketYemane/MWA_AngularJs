angular.module("myControllerApp").controller("MainController", MainController);
function MainController(JokeFactory) {
    const vm= this;
    JokeFactory.getTenJokes().then(function(response) {
    vm.jokes= response;
    });
    }