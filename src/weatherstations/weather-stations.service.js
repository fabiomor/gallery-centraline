(function () {
'use strict';

angular.module('WeatherStations')
.service('WeatherStationsService', WeatherStationsService)
.constant('ApiBasePath', "http://5.249.152.25:3000/api/v1/imagery");

WeatherStationsService.$inject = ['$http', 'ApiBasePath'];
function WeatherStationsService($http, ApiBasePath) {
	var service = this;
	var user = {};

	service.setUser = function (id, level) {
		user.id = id;
		user.level = level;
	}

	service.getUser = function () {
		return user;
	}

	service.getWeatherStations = function () {
		let response = $http({
			method: "GET",
			url: (ApiBasePath + "/getStations"),
			params: {
		        userID: user.id 
		    }
		});
		return response;
	}

	service.getImagesByStation = function (id) {
		let response = $http({
		      method: "GET",
		      url: (ApiBasePath + "/getImagesByStation"),
		      params: {
		        stationID: id 
		      }
		 	});
    	return response;
	}

	service.getImagesByDates = function (parameters) {
		let response = $http({
			method: "POST",
			url: (ApiBasePath + "/getImagesByDates"),
			data: parameters
		});
		return response;
	}
};
})();