app.controller('detailProductController', function ($scope, $http, $routeParams, $rootScope) {
    console.log("Khai bao Detailproduct thành công");

    $scope.product = {
        id: '',
        ten: '',
        hinh_anh: '',
        danh_muc: '',
        gia_niem_yet: '',
        gia_ban: '',
        so_luong: '',
        quantity: 1, // Khởi tạo giá trị mặc định cho quantity
    };

    // Lấy thông tin sản phẩm
    $http({
        method: 'GET',
        url: 'http://localhost:3000/san-pham/' + $routeParams.id
    }).then(function (response) {
        $scope.sanpham = response.data;
        console.log("Hiển thị thành công sản phẩm!", $scope.sanpham);

        // Lấy thông tin danh mục tương ứng
        $http({
            method: 'GET',
            url: 'http://localhost:3000/danh-muc/' + $scope.sanpham.danh_muc
        }).then(function (ResponseDM) {
            $scope.danhmuc = ResponseDM.data;
            console.log("Hiển thị thành công danh mục!", $scope.danhmuc);
        });
    });

    // Tính tổng giá bán
    $scope.calculateTotalPrice = function () {
        return $scope.sanpham.gia_ban * $scope.product.quantity;
    };

    // Xử lý khi giá trị số lượng thay đổi
    $scope.quantityChanged = function () {
        // Kiểm tra xem giá trị mới có phải là số không
        if (isNaN($scope.product.quantity)) {

        } else {
            // Giới hạn giá trị số lượng không bé hơn 1
            if ($scope.product.quantity < 1) {
                $scope.product.quantity = 1;
            }

            // Giới hạn giá trị số lượng không vượt quá giá trị ở cột so_luong trong bảng sản phẩm
            if ($scope.product.quantity > $scope.sanpham.so_luong) {
                $scope.product.quantity = $scope.product.so_luong;
            }

            // Cập nhật giá bán của sản phẩm dựa trên số lượng mới
            $scope.sanpham.gia_ban = $scope.calculateTotalPrice();

            // Cập nhật tổng tiền khi số lượng thay đổi
            $scope.tongTien = $scope.calculateTotalPrice();
        }
    };

    // Thêm sản phẩm vào giỏ hàng
    $scope.addToCart = function () {
        // Lấy thông tin giỏ hàng hiện tại
        $http({
            method: 'GET',
            url: 'http://localhost:3000/shopping-cart'
        }).then(function (response) {
            var cartItems = response.data;
            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
            var existingCartItem = cartItems.find(function (item) {
                return item.id_sp === $scope.sanpham.id;
            });
            if (existingCartItem) {
                // Nếu sản phẩm đã tồn tại, tính số lượng có thể thêm vào giỏ hàng
                var availableQuantity = $scope.sanpham.so_luong - existingCartItem.quantity;
                // Giới hạn số lượng thêm vào giỏ hàng theo số lượng có sẵn trong kho
                var quantityToAdd = Math.min(availableQuantity, $scope.product.quantity);
                // Cập nhật số lượng và giá trị thanh_tien của sản phẩm trong giỏ hàng
                existingCartItem.quantity += quantityToAdd;
                existingCartItem.thanh_tien = $scope.calculateTotalPrice();
                // Gọi API để cập nhật giỏ hàng
                $http({
                    method: 'PUT',
                    url: 'http://localhost:3000/shopping-cart/' + existingCartItem.id,
                    data: existingCartItem
                }).then(function () {
                    // Cập nhật số lượng trong biến rootScope
                    $rootScope.cartNumber += quantityToAdd;
                });
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
                var cartItem = {
                    id_sp: $scope.sanpham.id,
                    hinh_anh: $scope.sanpham.hinh_anh,
                    ten: $scope.sanpham.ten,
                    gia_ban: $scope.sanpham.gia_ban,
                    gia_niem_yet: $scope.sanpham.gia_niem_yet,
                    quantity: $scope.product.quantity,
                    thanh_tien: $scope.calculateTotalPrice()
                };

                // Gọi API để thêm vào giỏ hàng
                $http({
                    method: 'POST',
                    url: 'http://localhost:3000/shopping-cart',
                    data: cartItem
                }).then(function () {
                    // Cập nhật số lượng trong biến rootScope
                    $rootScope.cartNumber += $scope.product.quantity;
                });
            }
        });
    };
});


