MyApp
    .controller('MainController', function($scope, $rootScope,$sce, $http, $location, $timeout, $state) {
        angular.element("#loading-app").fadeOut();
        angular.element("#container").fadeIn("slow");
        $scope.choosePlayer = function(number){
            $state.transitionTo("games", {player:number});
        }
    });
