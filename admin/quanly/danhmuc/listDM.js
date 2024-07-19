app.controller("listDM", function($scope, $http, $routeParams) {
    $scope.danhsach = [];

    $http({
        method: 'get',
        url: 'http://localhost:3000/danh-muc'
    }).then(function(response) {
        $scope.danhsach = response.data;
    })
})