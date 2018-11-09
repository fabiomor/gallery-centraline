(function () {
'use strict';

angular.module('WeatherStations')
.component('weatherStations', {
  templateUrl: '../weather-gallery/src/templates/stations-gallery.template.html',
  bindings: {
    stations: '<'
  }
});

})();
