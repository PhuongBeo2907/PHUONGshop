app.controller("shoppingCartController", function($scope, $http) {
    $scope.giohang = [];
    $scope.selectedItems = [];
    $scope.selectedTotalPrice = 0;

    //mặc định tổng giá trị là 0
    $scope.tongTien = 0;

    //hàm lấy danh sach giỏ hagnf
    function getGioHang() {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/shopping-cart'
        }).then(function(response) {
            $scope.giohang = response.data;
        });
    }

    //hàm xóa sp khỏi giỏ hàng
    $scope.deleteProduct = function(id) {
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/shopping-cart' + id
        }).then(function(response) {
            //sau khi xóa, cập nhật lại ds và tổng giá trị sp
            getGioHang();
        });
    }

    //hàm tính tổng giá trị thanh_tien
    $scope.calculateTotalPrice = function() {
        //kiểm tra xem cso sp được chọn hay không
        if($scope.selectedItems && $scope.selectedItems.length > 0) {
            //hiển thị tổng giá trị của các sp đc chọn
            $scope.tongTien = $scope.selectedTotalPrice;
        }else {
            //hiển thị tônge giá trị của toàn bộ giỏ hàng nếu có sp trong giỏ hagnf
            if($scope.giohang && $scope.giohang.length > 0) {
                $scope.tongTien = $scope.giohang.reduce(function (total, item) {
                    return total + item.thanh_tien;
                }, 0);
            }else {
                //k có sp trong giỏ hàng, tổng giá trị là 0
                $scope.tongTien = 0;
            }
        }
    };

    //hàm được gọi khi checkbox của 1 sp thay đổi
    $scope.updateSelectedProducts = function() {
        $scope.selectedItems = $scope.giohang.filter(function (item) {
            return item.selected;
        });

        //tính tổng giá trị của các sp được chọn
        $scope.selectedTotalPrice = $scope.selectedItems.reduce(function (total, item) {
            return total + item.thanh_tien;
        }, 0);

        //kiểm tra xem cso sp được chọn hay không
        if($scope.selectedItems.length > 0) {
            //hiển thị tổng giá trị của các sp đc chọn
            $scope.tongTien = $scope.selectedTotalPrice;
        }else {
            //k có sp đc chọn tổng giá trị là 0
                $scope.tongTien = 0;
        }
    };

    // Hàm được gọi khi click vào checkbox SelectAllSP
    $scope.selectAllProducts = function () {
        $scope.selectAll = !$scope.selectAll; // Đảo ngược trạng thái selectAll

        angular.forEach($scope.giohang, function (item) {
            item.selected = $scope.selectAll;
        });

        // Cập nhật danh sách các sản phẩm được chọn
        $scope.updateSelectedProducts();
    };

    $scope.deleteGioHangChecked = function () {
        if ($scope.selectedItems && $scope.selectedItems.length > 0) {
            var confirmDelete = confirm("Bạn có chắc chắn muốn xóa các sản phẩm đã chọn?");
            if (confirmDelete) {
                // Tạm lưu lại tổng giá trị của các sản phẩm được chọn
                var selectedTotalBeforeDelete = $scope.selectedTotalPrice;

                angular.forEach($scope.selectedItems, function (item) {
                    console.log("Đang xóa sản phẩm với ID:", item.id);
                    $scope.deleteProduct(item.id);
                });

                // Sau khi đã xóa tất cả, cập nhật lại tổng giá trị
                $scope.tongTien = selectedTotalBeforeDelete;
                alert("Xóa thành công");
            }
        } else {
            // Không có sản phẩm nào được chọn, đặt tổng giá trị về 0
            $scope.tongTien = 0;
            alert("Vui lòng chọn ít nhất một sản phẩm để xóa.");
        }
    };


    // Gọi hàm lấy danh sách giỏ hàng khi trang được tải lên
    getGioHang();


})