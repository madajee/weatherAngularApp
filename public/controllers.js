// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });

    $scope.appkey = cityService.appkey;
    $scope.$watch('appkey', function(){
        cityService.appkey = $scope.appkey;
    });

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams','cityService', function($scope, $resource, 
    $routeParams, cityService) {
    $scope.city = cityService.city;
    $scope.appkey = cityService.appkey;
    $scope.days = $routeParams.days || '2';  

    $scope.weatherAPI = 
        $resource("https://api.openweathermap.org/data/2.5/forecast/daily", {
            callback: "JSON_CALLBACK" }, {get: { method: "JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days, appid: $scope.appkey});
    console.log($scope.weatherResult);

    $scope.convertToFahrenheit = function(degK){
        return Math.round((1.8 * (degK-273)) + 32);
    }

    $scope.convertToDate = function(dt){
        return new Date(dt * 1000);
    }

}]);