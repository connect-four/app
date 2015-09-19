MyApp
    .factory('GameService', function($http, Config) {
        var service = {
            getPlays:function(){
                return $http.get(Config.getApiUrl() + "/game");
            },
            save:function(obj){
                return $http.post(Config.getApiUrl() + "/game", obj);
            }
        };
        return service;
    });
