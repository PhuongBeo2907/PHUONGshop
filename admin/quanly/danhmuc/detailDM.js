app.controller("detailDM", function($scope, $http, $routeParams) {
    $scope.danhmuc = {
        id: '',
        ten: '',
        mo_ta: '',
        ngay_tao: '',
        ngay_cap_nhat: '',
        trang_thai: ''
    }

    $http({
        method: 'GET',
        url: 'http://localhost:3000/danh-muc/' + $routeParams.id
    }).then(function (response) {

        $scope.danhmuc = response.data;
    })
})