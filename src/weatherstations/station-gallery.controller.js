(function () {
'use strict';

angular.module('WeatherStations')
.controller('StationGalleryController', StationGalleryController);


StationGalleryController.$inject = ['images'];
function StationGalleryController(images) {
  var sg = this;
  sg.images = images.data;
  console.log(images);
}

})();