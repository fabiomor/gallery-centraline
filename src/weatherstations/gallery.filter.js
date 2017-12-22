(function () {
    'use strict';

    angular.module('WeatherStations')
        .filter('dateRange', function () {
            return function (items, fromDate, toDate) {
                var filtered = [];
                var from_date = moment(fromDate);
                var to_date = moment(toDate).add(1,"days");
                angular.forEach(items, function (item) {
                    if (Date.parse(item.data) > from_date && Date.parse(item.data) < to_date) {
                        filtered.push(item);
                    }
                });
                return filtered;
            }
        }
        )
        .filter('hour', function () {
            return function (items, hour) {
                if (hour != "All") {
                    var filtered = [];
                    angular.forEach(items, function (item) {
                        if (new Date(Date.parse(item.data)).getHours() == hour) {
                            filtered.push(item);
                        }
                    });
                    return filtered;
                }
                return items;
            }
        }
        );


})();