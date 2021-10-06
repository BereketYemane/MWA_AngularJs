angular.module("myApp").controller("mainController", mainController);
function mainController(GameFactory) {
    const vm= this;
    GameFactory.getPosts().then(function(response) {
    vm.Animes= response.data;

    });
    }
