app.controller("deleteSP", function ($scope, $http, $routeParams) {
    console.log("Log để kiểm tra: Khai báo deleteSP thành công");

    // 1. Khai báo biến cần thiết
    $scope.deleteSP = [];


    // 2. Call api lấy danh sách sản phẩm
    $http({
        method: 'GET',
        url: 'http://localhost:3000/san-pham'
    }).then(function (response) {
        // Gán giá trị sau khi call api thành công
        $scope.deleteSP = response.data
        console.log("Log thử giá trị biến QLSanPham", $scope.deleteSP);

    })

    $scope.onClickDeleteSP = function (id) {
        console.log("Log thử id chọn xóa:", id);

        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/san-pham/' + id
        }).then(function (response) {
            alert("Xóa thành công ")
        })
    }

});