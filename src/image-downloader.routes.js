(function () {
    'use strict';
    
    angular.module('WeatherStations')
    .config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
    
      // Redirect to home page if no other URL matches
      $urlRouterProvider.otherwise('/');
    
      // *** Set up UI states ***
      $stateProvider
      
      .state('home', {
        url: '/',
        templateUrl: '../weather-gallery/src/templates/download-images.template.html',
        controller: 'ImageDownloaderController as dc',
        resolve : {
          stations: ['WeatherStationsService', function (WeatherStationsService) {
            return WeatherStationsService.getWeatherStations();
          }]
        }
      });
    }
    
    })();