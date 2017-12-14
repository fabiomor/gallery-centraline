(function () {
'use strict';

angular.module('WeatherStations')
.service('WeatherStationsService', WeatherStationsService)
.constant('ApiBasePath', "http://5.249.152.25:3000/api/v1/imagery");

WeatherStationsService.$inject = ['$http', 'ApiBasePath'];
function WeatherStationsService($http, ApiBasePath) {
	var service = this;

	service.getWeatherStations = function () {
		var response = $http({
			method: "GET",
			url: (ApiBasePath + "/getStations")
		});
		return response;
	}

	service.getImagesByStation = function (id) {
		var response = $http({
		      method: "GET",
		      url: (ApiBasePath + "/getImagesByStation"),
		      params: {
		        stationID: id 
		      }
		 	});

    	return response;
	}
};
})();