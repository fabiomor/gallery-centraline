(function () {
'use strict';

angular.module('WeatherStations')
.controller('StationGalleryController', StationGalleryController);

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
    sg.images = hourFilter(sg.images, $scope.date.hour.value);
  }

  sg.hourChanged = function() {
    sg.images = dateFilter(images.data, $scope.date.start, $scope.date.end);
    sg.images = hourFilter(sg.images, $scope.date.hour.value);
  }

  function init() {
    $scope.date = {};
    $scope.date.start = new Date("2017-12-1")
    $scope.date.end = new Date("2017-12-2")
    sg.hourSelection = [
      {id: 0, value:'All'},
      {id: 1, value:'10'},
      {id: 2, value:'13'},
      {id: 3, value:'15'}
    ];
    $scope.date.hour = sg.hourSelection[0];
  }
}

})();