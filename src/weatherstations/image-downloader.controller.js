(function () {
  'use strict';

  angular.module('WeatherStations')
    .controller('ImageDownloaderController', ImageDownloaderController);


  ImageDownloaderController.$inject = ['stations', '$scope', 'WeatherStationsService', '$timeout'];
  function ImageDownloaderController(stations, $scope, WeatherStationsService) {
    var dc = this;
    var stationSelection;
    var stationsSelectedCode;
    var zippedFile;
    var minHour, minMinute, maxHour, maxMinute;
    dc.stations = stations.data;
    dc.zipEnded = false;
    dc.isZipping = false;
    dc.currentProgress = 0;
    $scope.date = {};
    $scope.time = {};
    $scope.imageFormat = "small";
    $scope.date.start = new Date(moment().subtract(10,"days").startOf("day"));
    $scope.date.end = new Date();
    $scope.time.start = new Date(2018, 0, 1, 6, 0, 0);
    $scope.time.end = new Date(2018, 0, 1, 18, 0, 0);


    dc.resetFields = function () {
      dc.currentProgress = 0;
      dc.zipEnded = false;
      hideProgress();
    }

    dc.stationChanged = function () {
      stationsSelectedCode = [];
      dc.resetFields();
      $scope.stationSelection.forEach(item => {
        stationsSelectedCode.push(item.id_stazione);
      });
    }

    dc.getStationImages = function () {
      let parameters = {
        stationsCode: stationsSelectedCode,
        format: $scope.imageFormat,
        dateStart: $scope.date.start,
        dateEnd: $scope.date.end,
        timeStart: $scope.time.start,
        timeEnd: $scope.time.end
      };
      WeatherStationsService.getImagesByDates(parameters)
        .then(response => {
          zipImages(response.data);
        });
    }

    dc.downloadZip = function () {
      saveAs(zippedFile, "immagini.zip");
    }

    function zipImages(images) {
      dc.isZipping = true;
      let zip = new JSZip();
      images.forEach(item => {
        zip.file(
          item.name,
          urlToPromise("http://5.249.152.25:81/immagini/" + item.path,
            { binary: true })
        );
      });

      zip.generateAsync({ type: "blob" }, function updateCallback(metadata) {
        dc.currentProgress = metadata.percent;
        $scope.$apply();
        updatePercent(metadata.percent | 0);
      })
        .then(function callback(blob) {
          // see FileSaver.js
          //saveAs(blob, "immagini.zip");

          dc.zipEnded = true;
          dc.isZipping = false;
          dc.fileSize = Math.round(blob.size / 1000000);
          zippedFile = blob;
          $scope.$apply();
        }, function (e) {
          console.log(e);
        });
    }

    function urlToPromise(url) {
      return new Promise(function (resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }

    function updatePercent(percent) {
      $("#progress_bar").removeClass("hide")
        .find(".progress-bar")
        .attr("aria-valuenow", percent)
        .css({
          width: percent + "%"
        });
    }

    function hideProgress() {
      $("#progress_bar").addClass("hide")
        .find(".progress-bar")
        .attr("aria-valuenow", 0)
        .css({
          width: 0 + "%"
        });
    }
  }

})();
