app.controller('payController', function($scope, $http) {
    $scope.donHang = [];
    $scope.danhsach2 = [];

    $http({
        method: 'get',
        url: 'http://localhost:3000/san-pham'
    }).then(function(response) {
        $scope.donHang = response.data;
    })

    $http({
        method: 'get',
        url: "http://localhost:3000/shopping-cart"
        
    }).then(function(response) {
        $scope.danhsach2 = response.data;
    })
})