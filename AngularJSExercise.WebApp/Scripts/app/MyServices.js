(function () {
    var app = angular.module('app');

    app.service('MathService', function () {
        this.add = function (a, b) { return a + b };

        this.subtract = function (a, b) { return a - b };

        this.multiply = function (a, b) { return a * b };

        this.divide = function (a, b) { return a / b };
    });

    app.service('CalculatorService', function (MathService) {

        this.square = function (a) { return MathService.multiply(a, a); };
        this.cube = function (a) { return MathService.multiply(a, MathService.multiply(a, a)); };

    });

    app.controller('CalculatorController', function ($scope, CalculatorService) {

        $scope.doSquare = function () {
            $scope.answer = CalculatorService.square($scope.number);
        }

        $scope.doCube = function () {
            $scope.answer = CalculatorService.cube($scope.number);
        }
    });

    //service style, probably the simplest one
    app.service('helloWorldFromService', function () {
        this.sayHello = function () {
            return "Hello, World!"
        };
    });

    //factory style, more involved but more sophisticated
    app.factory('helloWorldFromFactory', function () {
        return {
            sayHello: function () {
                return "Hello, World!"
            }
        };
    });

    //provider style, full blown, configurable version     
    app.provider('helloWorld', function () {
        // In the provider function, you cannot inject any
        // service or factory. This can only be done at the
        // "$get" method.

        this.name = 'Default';

        this.$get = function () {
            var name = this.name;
            return {
                sayHello: function () {
                    return "Hello, " + name + "!"
                }
            }
        };

        this.setName = function (name) {
            this.name = name;
        };
    });
}());



