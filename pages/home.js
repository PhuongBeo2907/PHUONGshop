console.log('log kieemr tran: ');

app.controller('HomeController', function($scope, $http) {
    $scope.danhSachSP = [];
    $scope.danhSachSPBanChay = [];
    $scope.danhSachDM = [];

   

    $http({
        method: 'GET',
        url: 'http://localhost:3000/san-pham'
    }).then(function(response) {
        $scope.danhSachSP = response.data;
        
    })

    $scope.sortForSanPhamBanChay = function() {
        $scope.danhSachSPBanChay = angular.copy($scope.danhSachSP);
        $scope.danhSachSPBanChay.sort(function(a, b) {
            return b.so_luong_da_ban - a.so_luong_da_ban;
        })
    };
})

// app.config(function($routeProvider) {
//     $routeProvider
//         .when('/', {
//             templateUrl: 'pages/home.html',
//             controller: 'HomeController'
//         })
//         .when('/detail_products/:id', {
//             templateUrl: '/pages/detail_products.html',
//             controller: 'detailCtrl'
//         })
// })