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

  it('Should identify the $scope', function() {
    inject(function($controller) {
      $controller('GameController', {'$scope': $scope});

      expect($scope).toBeDefined();
    });
  });

});