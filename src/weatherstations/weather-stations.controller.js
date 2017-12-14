(function () {
'use strict';

angular.module('WeatherStations')
.controller('WeatherStationsController', WeatherStationsController);


WeatherStationsController.$inject = ['stations'];
function WeatherStationsController(stations) {
  var ws = this;
  ws.stations = stations.data;
}

})();
