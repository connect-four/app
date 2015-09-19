'use strict';

describe('TableController', function () {
  var page;

  var $scope, $httpBackend, Config;

  beforeEach(function() {
    module('MyApp');
    inject(function($injector, _$httpBackend_) {
      $scope = $injector.get('$rootScope').$new();
      Config = $injector.get('Config');

      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET', Config.getApiUrl() + '/teams')
          .respond([{id: '1'}]);
    });
  });

  it('Should identify at least one team', function() {
    inject(function($controller) {
      $controller('TableController', {'$scope': $scope});
      $httpBackend.flush();

      expect($scope.teams["1"]).toBeDefined();
    });
  });

});