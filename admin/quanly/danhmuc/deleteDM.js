app.controller('deleteDM', function($scope, $http, $routeParams) {
    $scope.danhsach = [];
    
    //khai báo controller createDM
    $http({
        method: 'GET',
        url: 'http://localhost:3000/danh-muc' 
    }).then(function(response) {
        $scope.danhsach = response.data;
    })

    $scope.onClickDeleteDM = function(id) {
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/danh-muc/' + id
        }).then(function(response) {
            alert("Xóa thành công");
        })
    }
})