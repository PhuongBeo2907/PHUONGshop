console.log('Log để kiểm tra: Đã nhúng file updateDM thành công');

//5.1 Khai báo controller detailDM
app.controller("updateDM", function ($scope, $http, $routeParams) {
    console.log('Log để kiểm tra: Khai báo updateDM thành công');


    $scope.danhmuc = {
        id: '',
        ten: '',
        mo_ta: '',
        ngay_tao: '',
        ngay_cap_nhat: '',
        trang_thai: ''
    }

    $scope.formMessage = '';
    $scope.formStatus = true;

    $http({
        method: 'GET',
        url: 'http://localhost:3000/danh-muc/' + $routeParams.id
    }).then(function (response) {

        $scope.danhmuc = response.data;

        console.log('Log in thử giá trị của biến $scope.danhsach:', $scope.danhmuc);
    })

    $scope.OnClickUpdateDM = function () {
        // Lấy thời gian hiện tại dựa trên múi giờ của trình duyệt
        var browserTime = new Date().toLocaleString();

        // Gán giá trị browserTime vào thuộc tính ngay_cap_nhat
        $scope.danhmuc.ngay_cap_nhat = browserTime;

        console.log("Log thử giá trị biến $scope.danhmuc", $scope.danhmuc);

        $scope.formMessage = '';
        $scope.formStatus = true;

        if ($scope.danhmuc.ten === '') {
            $scope.formStatus = false;
            $scope.formMessage = 'Mời bạn nhập tên danh mục';
            return;
        }
        if ($scope.danhmuc.mo_ta === '') {
            $scope.formStatus = false;
            $scope.formMessage = 'Mời bạn nhập mô tả danh mục';
            return;
        }
        if ($scope.danhmuc.ngay_tao === '') {
            $scope.formStatus = false;
            $scope.formMessage = 'Mời bạn chọn ngày tạo cho danh mục';
            return;
        }
        if ($scope.danhmuc.trang_thai === '') {
            $scope.formStatus = false;
            $scope.formMessage = 'Mời bạn chọn trạng thái cho danh mục';
            return;
        }

        $http({
            method: 'PUT',
            url: 'http://localhost:3000/danh-muc/'+ $routeParams.id,
            data: $scope.danhmuc
        }).then(function (response) {
            alert('Đã cập nhật thành công');
            console.log("Thông tin hợp lệ");
        })
    }
})