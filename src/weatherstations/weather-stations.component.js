(function () {
'use strict';

angular.module('WeatherStations')
.component('weatherStations', {
  templateUrl: 'src/templates/stations-gallery.template.html',
  bindings: {
    stations: '<'
  }
});

})();
