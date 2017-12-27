(function () {
'use strict';

angular.module('WeatherStations')
.controller('StationGalleryController', StationGalleryController)


StationGalleryController.$inject = ['$scope','images','dateRangeFilter', 'hourFilter'];
function StationGalleryController($scope, images, dateFilter, hourFilter) {
  let sg = this;
  init();

  if($scope.date.start) {
    sg.images = dateFilter(images.data, $scope.date.start, $scope.date.end);
  }
  else {
    sg.images = images.data;
  }

  sg.dateChanged = function () {
    sg.images = dateFilter(images.data, $scope.date.start, $scope.date.end);
    sg.images = hourFilter(sg.images,
        toDoubleDigit($scope.time.start.getHours()) + ":" + toDoubleDigit($scope.time.start.getMinutes()),
        toDoubleDigit($scope.time.end.getHours()) + ":" + toDoubleDigit($scope.time.end.getMinutes()));
  }

  sg.timeChanged = function() {
    sg.images = dateFilter(images.data, $scope.date.start, $scope.date.end);
    sg.images = hourFilter(sg.images,
      toDoubleDigit($scope.time.start.getHours()) + ":" + toDoubleDigit($scope.time.start.getMinutes()),
      toDoubleDigit($scope.time.end.getHours()) + ":" + toDoubleDigit($scope.time.end.getMinutes()));
  }

  function init() {
    sg.stationName = images.data[0].codice_centralina;
    $scope.date = {};
    $scope.date.start = new Date(moment().subtract(7,"days"));
    $scope.date.end = new Date();
    let times = extractUniqueTimes(images.data);
    $scope.time = {};
    $scope.time.minTime = toDoubleDigit(times.hours[0]) + ":00";
    $scope.time.maxTime = toDoubleDigit(times.hours[times.hours.length - 1]) + ":59" //+ toDoubleDigit(times.minutes[times.minutes.length - 1]) + ":00";
    $scope.time.start = new Date(1970, 0 , 1, times.hours[0], times.minutes[0]);
    $scope.time.end = new Date(1970, 0 , 1, times.hours[times.hours.length - 1], times.minutes[times.minutes.length - 1]);
    console.log($scope.time);
    sg.hourSelection = [
      {id: 0, value:'All'},
      {id: 1, value:'10'},
      {id: 2, value:'13'},
      {id: 3, value:'15'}
    ];
    $scope.date.hour = sg.hourSelection[0];
  }

  function extractUniqueTimes(stations) {
    let hours = [];
    let minutes = [];
    let times = {};
    angular.forEach(stations, function (station) {
      hours.push(moment(station.data).hour());
      minutes.push(moment(station.data).minutes());
    });
    times.hours = hours.unique().sort(sortNumber);
    times.minutes = minutes.unique().sort(sortNumber);
    return times;
  }
}

})();