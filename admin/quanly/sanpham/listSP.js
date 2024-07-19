app.controller("listSP", function($scope, $http, $routeParams) {
    // 1. Khai báo biến cần thiết
    $scope.danhsachSP = [];


    // 2. Call api lấy danh sách sản phẩm
    $http({
        method: 'GET',
        url: 'http://localhost:3000/san-pham'
    }).then(function (response) {
        // Gán giá trị sau khi call api thành công
        $scope.danhsachSP = response.data

    })


})