"use strict";
MyApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("main");

    $stateProvider
        .state("main", {
            url: "/main",
            templateUrl: "app/features/main/mainView.html",
            controller: "MainController"
        });

    $stateProvider
        .state("games", {
            url: "/games/:player",
            templateUrl: "app/features/game/gameView.html",
            controller: "GameController"
        });

});

