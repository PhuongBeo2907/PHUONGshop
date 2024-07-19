app.controller("updateSP", function ($scope, $http, $routeParams) {
    console.log("Khai báo createSP thành công");

    $scope.sanpham = {
        id: '',
        ten: '',
        hinh_anh: '',
        danh_muc: '',
        gia_niem_yet: '',
        gia_ban: '',
        so_luong: '',
        so_luong_da_ban: '0',
        trang_thai: ''
    }


    $http({
        method: 'GET',
        url: 'http://localhost:3000/danh-muc'
    }).then(function (response) {

        $scope.danhmuc = response.data;

        console.log('Log in thử giá trị của biến $scope.danhsach:', $scope.danhmuc);
    });

    $http({
        method: 'GET',
        url: 'http://localhost:3000/san-pham/' + $routeParams.id
    }).then(function (response) {
        $scope.sanpham = response.data;
    })

    $scope.formMessage = '',
    $scope.formStatus = true;


    $scope.onClickUpdateSP = function () {
        // Lấy thời gian hiện tại dựa trên múi giờ của trình duyệt
        var browserTime = new Date().toLocaleString();

        // Gán giá trị browserTime vào thuộc tính ngay_tao
        $scope.sanpham.ngay_tao = browserTime;


        console.log("Log thử giá trị được thêm ", $scope.sanpham);

        $scope.formMessage = '',
            $scope.formStatus = true;

        if ($scope.sanpham.ten === '') {
            $scope.formStatus = false;
            $scope.formMessage = 'Vui lòng nhập tên sản phẩm';
            return;
        }
        if ($scope.sanpham.id === '') {
            $scope.formStatus = false;
            $scope.formMessage = 'Vui lòng nhập mã sản phẩm';
            return;
        }

        if ($scope.sanpham.danh_muc === '') {
            $scope.formStatus = false;
            $scope.formMessage = 'Vui lòng chọn danh mục cho sản phẩm';
            return;
        }
        if ($scope.sanpham.gia_niem_yet === '') {
            $scope.formStatus = false;
            $scope.formMessage = 'Vui lòng nhập giá gốc sản phẩm';
            return;
        }
        if (isNaN($scope.sanpham.gia_niem_yet)) {
            $scope.formStatus = false;
            $scope.formMessage = 'Vui lòng nhập giá niêm yết sản phẩm là số';
            return;
        }
        if (Number($scope.sanpham.gia_niem_yet) < 10000) {
            $scope.formStatus = false;
            $scope.formMessage = 'Vui lòng nhập giá niêm yết sản phẩm phải lớn hơn 10000';
            return;
        }
        if ($scope.sanpham.gia_ban === '') {
            $scope.formStatus = false;
            $scope.formMessage = 'Vui lòng nhập giá bán sản phẩm';
            return;
        }
        if (isNaN($scope.sanpham.gia_ban)) {
            $scope.formStatus = false;
            $scope.formMessage = 'Vui lòng nhập giá bán sản phẩm là số';
            return;
        }
        if (Number($scope.sanpham.gia_ban) < 10000) {
            $scope.formStatus = false;
            $scope.formMessage = 'Vui lòng nhập giá bán sản phẩm phải lớn hơn 10000';
            return;
        }

        if ($scope.sanpham.so_luong === '') {
            $scope.formStatus = false;
            $scope.formMessage = 'Vui lòng nhập số lượng sản phẩm';
            return;
        }
        if (isNaN($scope.sanpham.so_luong)) {
            $scope.formStatus = false;
            $scope.formMessage = 'Vui lòng nhập số lượng sản phẩm là số';
            return;
        }
        if (Number($scope.sanpham.so_luong) < 1) {
            $scope.formStatus = false;
            $scope.formMessage = 'Vui lòng nhập số lượng sản phẩm phải lớn hơn 1';
            return;
        }

        //if ($scope.sanpham.ngay_tao === '') {
        //    $scope.formStatus = false;
        //    $scope.formMessage = 'Vui lòng chọn ngày tạo sản phẩm';
        //    return;
        //}
        //if ($scope.sanpham.ngay_cap_nhat === '') {
        //$scope.formStatus = false;
        //$scope.formMessage = 'Vui lòng chọn ngày cập nhật sản phẩm';
        //return;
        //}
        //if ($scope.sanpham.trang_thai === '') {
        //    $scope.formStatus = false;
        //    $scope.formMessage = 'Vui lòng chọn trạng thái cho sản phẩm';
        //    return;
        //}

        // Định dạng giá niêm yết và giá bán trước khi gửi đi
        //$scope.sanpham.gia_niem_yet = formatCurrency($scope.sanpham.gia_niem_yet);
        //$scope.sanpham.gia_ban = formatCurrency($scope.sanpham.gia_ban);
        console.log("Log thử giá trị sau khi được format ", $scope.sanpham);
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/san-pham/' + $routeParams.id,
            data: $scope.sanpham
        }).then(function (response) {
            alert('Đã cập nhật thành công');
        })
    }

})