(function () {
    'use strict';
    
    angular.module('WeatherStations')
    .controller('InitController', InitController);
    
    
    InitController.$inject = ['$scope', 'WeatherStationsService'];
    function InitController($scope, WeatherStationsService) {
        $scope.setUser = function(id, level) {
            WeatherStationsService.setUser(id, level);
        }
    }
    
    })();
    