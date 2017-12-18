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

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html',
    controller: 'WeatherStationsController as ws',
    resolve : {
      stations: ['WeatherStationsService', function (WeatherStationsService) {
        return WeatherStationsService.getWeatherStations();
      }]
    }
  })

  // Premade list page
  .state('stationGallery', {
    url: '/station-gallery/{stationId}',
    templateUrl: 'src/templates/station-detail.template.html',
    controller: 'StationGalleryController as sg',
    resolve: {
      images: ['$stateParams', 'WeatherStationsService', function ($stateParams, WeatherStationsService) {
        return WeatherStationsService.getImagesByStation($stateParams.stationId);
      }]
    }
  });
}

})();