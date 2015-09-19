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

    it('should load the tableView.html template', function(){
        $httpBackend.whenGET('app/features/table/tableView.html').respond('');
        $httpBackend.flush();

        $state.transitionTo('table');

        expect($state.current.name).toBe('table');
        expect($state.current.templateUrl).toBe('app/features/table/tableView.html');
        expect($state.current.controller).toBe('TableController');
    });

});