angular.module("myApp").controller("mainController", mainController);
function mainController(AnimeFactory) {
    const vm= this;
    AnimeFactory.Animes().then(function(response) {
    vm.Animes= response.data;

    });
    }
