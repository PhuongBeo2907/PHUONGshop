app.controller("createDM", function($scope, $http, $routeParams) {
    $scope.danhmuc = {
        id: '',
        ten: '',
        mo_ta: '',
        ngay_tao: '',
        ngay_cap_nhat: '',
        trang_thai: 'Đang bán'
    }

    $scope.formMessage = '';
    $scope.formStatus = true;

    $scope.onClickCreateDM = function() {
        var browserTime = new Date().toLocaleString();

        //gán giá trị browserTime vào thuộc tính ngày tạo
        $scope.danhmuc.ngay_tao = browserTime;

        $scope.formMessage = '';
        $scope.formStatus = true;

        if($scope.danhmuc.id === '') {
            $scope.formStatus = false;
            $scope.formMessage = "Mời bạn nhập id danh mục";
            return;
        }

        if($scope.danhmuc.ten_dm === '') {
            $scope.formStatus = false;
            $scope.formMessage = "Mời bạn nhập tên danh mục";
            return;
        }

        if($scope.danhmuc.mo_ta === '') {
            $scope.formStatus = false;
            $scope.formMessage = "Mời bạn nhập mô tả danh mục";
            return;
        }

        $http({
            method: 'POST',
            url: 'http://localhost:3000/danh-muc',
            data: $scope.danhmuc
        }).then(function(response) {
            alert("Tạo thành công");
        })
    }
})