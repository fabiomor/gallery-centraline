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
    templateUrl: '../weather-gallery/src/templates/home.template.html',
    controller: 'WeatherStationsController as ws',
    resolve : {
      stations: ['WeatherStationsService', function (WeatherStationsService) {
        return WeatherStationsService.getWeatherStations();
      }]
    }
  })

  .state('download-images', {
    url: '/download-images',
    templateUrl: '../weather-gallery/src/templates/download-images.template.html',
    controller: 'ImageDownloaderController as dc',
    resolve : {
      stations: ['WeatherStationsService', function (WeatherStationsService) {
        return WeatherStationsService.getWeatherStations();
      }]
    }
  })

  // Premade list page
  .state('stationGallery', {
    url: '/station-gallery/{stationId}',
    templateUrl: '../weather-gallery/src/templates/station-detail.template.html',
    controller: 'StationGalleryController as sg',
    resolve: {
      stations: ['WeatherStationsService', function (WeatherStationsService) {
        return WeatherStationsService.getWeatherStations();
      }],
      images: ['$stateParams', 'WeatherStationsService', function ($stateParams, WeatherStationsService) {
        return WeatherStationsService.getImagesByStation($stateParams.stationId);
      }]
    }
  });
}

})();