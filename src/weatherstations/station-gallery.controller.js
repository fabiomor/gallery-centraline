(function () {
'use strict';

angular.module('WeatherStations')
.controller('StationGalleryController', StationGalleryController)


StationGalleryController.$inject = ['$scope','images','dateRangeFilter', 'hourFilter'];
function StationGalleryController($scope, images, dateFilter, hourFilter) {
  let sg = this;
  var minHour, minMinute, maxHour, maxMinute;
  init();

  if($scope.date.start) {
    sg.images = dateFilter(images.data, $scope.date.start, $scope.date.end);
  }
  else {
    sg.images = images.data;
  }

  sg.dateChanged = function () {
    sg.images = dateFilter(images.data, $scope.date.start, $scope.date.end);
    let startHour = $scope.time.start ? toDoubleDigit($scope.time.start.getHours()) : toDoubleDigit(minHour);
    let endHour = $scope.time.end ? toDoubleDigit($scope.time.end.getHours()) : toDoubleDigit(maxHour);
    let startMinute = $scope.time.start ? toDoubleDigit($scope.time.start.getMinutes()) : toDoubleDigit(minMinute);
    let endMinute = $scope.time.end ? toDoubleDigit($scope.time.end.getMinutes()) : toDoubleDigit(maxMinute);
    sg.images = hourFilter(sg.images, startHour + ":" + startMinute, endHour + ":" + endMinute);
  }

  sg.timeChanged = function() {
    sg.images = dateFilter(images.data, $scope.date.start, $scope.date.end);
    let startHour = $scope.time.start ? toDoubleDigit($scope.time.start.getHours()) : toDoubleDigit(minHour);
    let endHour = $scope.time.end ? toDoubleDigit($scope.time.end.getHours()) : toDoubleDigit(maxHour);
    let startMinute = $scope.time.start ? toDoubleDigit($scope.time.start.getMinutes()) : toDoubleDigit(minMinute);
    let endMinute = $scope.time.end ? toDoubleDigit($scope.time.end.getMinutes()) : toDoubleDigit(maxMinute);
    sg.images = hourFilter(sg.images, startHour + ":" + startMinute, endHour + ":" + endMinute);
  }

  function init() {
    sg.stationName = images.data[0].codice_centralina;
    // init date filter fields
    $scope.date = {};
    $scope.date.start = new Date(moment().subtract(1,"days").startOf("day"));
    $scope.date.end = new Date((moment().startOf("day")));
    var times = extractUniqueTimes(images.data);
    // init time hour and minutes max min ranges
    minHour = times.hours[0];
    minMinute = times.minutes[0];
    maxHour = times.hours[times.hours.length - 1];
    maxMinute = times.minutes[times.minutes.length - 1];
    // init time filter fields
    $scope.time = {};
    $scope.time.minTime = toDoubleDigit(times.hours[0]) + ":00";
    $scope.time.maxTime = toDoubleDigit(times.hours[times.hours.length - 1]) + ":59" //+ toDoubleDigit(times.minutes[times.minutes.length - 1]) + ":00";
    $scope.time.start = new Date(1970, 0 , 1, times.hours[0], times.minutes[0], 0, 0);
    $scope.time.end = new Date(1970, 0 , 1, times.hours[times.hours.length - 1], times.minutes[times.minutes.length - 1], 0, 0);
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