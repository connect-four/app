"use strict";
MyApp
    .factory("Config", [function () {
        var factory = {
            getApiUrl : function () {
                return "http://connectfourapi.herokuapp.com/api";
            }
        };
        return factory;
    }]);