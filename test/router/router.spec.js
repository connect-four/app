'use strict';

describe('routes', function(){

    var $httpBackend;
    var $state;
    var $scope;
    var rootScope;

    beforeEach(function () {
        module('MyApp');
    });

    beforeEach(inject(function (_$httpBackend_, _$state_, $rootScope) {
        $httpBackend = _$httpBackend_;
        $state = _$state_;
        rootScope = $rootScope;
        $scope = $rootScope.$new();
    }));

    it('should load the gameView.html template', function(){
        $httpBackend.whenGET('app/features/game/gameView.html').respond('');
        $httpBackend.whenGET('app/features/main/mainView.html').respond('');
        $httpBackend.flush();

        $state.transitionTo('games',{player:1});
        
        expect($state.current.name).toBe('games');
        expect($state.current.templateUrl).toBe('app/features/game/gameView.html');
        expect($state.current.controller).toBe('GameController');
    });

});