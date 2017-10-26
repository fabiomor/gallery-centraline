angular.module('App', [])

.controller('ImageLayout', ImageLayout)


function ImageLayout($scope, $http){
  //$http.get('http://5.249.152.25:3000/api/v1/imagery/getPaths').success(function(imgs){
  // $http.get('https://xieranmaya.github.io/images/cats/cats.json').success(function(imgs){
  // 	console.log(imgs)
  //   $scope.imgs = imgs
  // })

  $http({
    url: "http://5.249.152.25:3000/api/v1/imagery/getPaths",
    dataType: "json",
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}).success(function(response){
    $scope.imgs = response;
}).error(function(error){
	console.log("error " + error)
    $scope.error = error;
});
}