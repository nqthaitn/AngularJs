// create angular controller
angular.module("app", []).controller("productController", ["$scope", "$http", "helloWorldFromFactory", function ($scope, $http, helloWorldFromFactory) {

    //alert(helloWorldFromFactory.sayHello());

    var getAllProducts = function () {

        var onComplete = function (response) {
            $scope.products = response.data;
        };

        var onError = function (response) {
            alert("Could not fetch the data");
        };

        $http.get("Home/GetAllProduct").then(onComplete, onError);
        
    };

    var getAllCategory = function () {

        var onComplete = function (response) {
            $scope.categories = response.data;
        };

        var onError = function (response) {
            alert("Could not fetch the data");
        };

        $http.get("Home/GetAllCategory").then(onComplete, onError);

    };

    //product details
    var productDetails = {
        Id: "",
        Name: "",
        Description: "",
        Price: ""
    };

    //function auto fill description
    $scope.AutoFill = function () {
        productDetails.Description = "The description is auto filled.";
    };

    //function Add product
    $scope.Add = function () {
        clearProductDetails();
        $scope.mode = "Add";
    };
    
    //function Delete product
    $scope.Delete = function (p) {
        var res = $http.post("Home/Delete", { id: p.Id });
        res.success(function (data, status, headers, config) {
            if (data.success === true) {
                var index = $scope.products.indexOf(p);
                $scope.products.splice(index, 1);
            }
            else {
                alert(data.errorMessage);
            }
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({ data: data }));
        });
    };

    //function Edit product
    $scope.Edit = function (p) {
        $scope.mode = "Edit";
        productDetails.Id = p.Id;
        productDetails.Name = p.Name;
        productDetails.Description = p.Description;
        productDetails.Price = p.Price;
    };

    //function save changes
    $scope.Save = function () {

        switch ($scope.mode) {
            case "Add":
                addProduct();
                break;
            case "Edit":
                editProduct();
                break;
            default:
        }
    };

    //function Sort by Click on header of Table
    $scope.Sort = function (p) {
        if ($scope.tempOrder === p) {
            $scope.tempOrder = "-" + p;
        } else {
            $scope.tempOrder = p;
        }
    };

    $scope.GetProductByCategory = function (categoryId) {

        var onComplete = function (response) {
            $scope.products = response.data;
        };
        var onError = function () {
            alert("Could not fetch the data");
        };

        $http.get("Home/GetProductByCategory?id=" + categoryId).then(onComplete, onError);
    };

    var addProduct = function () {
        if (productDetails.Name === "") return;

        var p = {
            Id: "",
            Name: productDetails.Name,
            Description: productDetails.Description,
            Price: productDetails.Price
        };

        var res = $http.post("Home/Add", p);
        res.success(function (data, status, headers, config) {
            if (data.success === true) {
                p.Id = data.Id;
                $scope.products.push(p);
                clearProductDetails();
            }
            else {
                alert(data.errorMessage);
            }
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({ data: data }));
        });
    };

    var editProduct = function () {
        var res = $http.post("Home/Edit", productDetails);
        res.success(function (data, status, headers, config) {
            if (data.success === true) {
                for (var i = 0; i < $scope.products.length; i++) {
                    if ($scope.products[i].Id === productDetails.Id) {
                        $scope.products[i].Name = productDetails.Name;
                        $scope.products[i].Description = productDetails.Description;
                        $scope.products[i].Price = productDetails.Price;
                    }
                }
            }
            else {
                alert(data.errorMessage);
            }
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({ data: data }));
        });
    };

    var clearProductDetails = function () {
        productDetails.Id = "";
        productDetails.Description = "";
        productDetails.Name = "";
        productDetails.Price = "";
    };

    var init = function () {
        //create models
        $scope.productDetails = productDetails;
        $scope.tempOrder = "Name";
        $scope.mode = "Add";
        $scope.toggleObject = { item: -1 };
        $scope.itemPerPage = 5;
        $scope.currentPage = 1;

        getAllProducts();
        getAllCategory();
    };
    init();

}]);
