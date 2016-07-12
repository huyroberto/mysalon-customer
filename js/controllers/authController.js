app
    .controller('LoginCtrl', function ($scope, $state, $window, $rootScope, $stateParams, $ionicLoading, $q, $ionicPopup) {
        $rootScope.toggledrag = false;
        $rootScope.islogin = false;
        $rootScope.show = false;
        $scope.setlogin = function () {
            $rootScope.islogin = true;
            $rootScope.show = true;
        }
        $scope.login = function (user_data) {
            console.log('call login');
            Backendless.UserService.login(user_data.username.toLowerCase(), user_data.password, true,
                new Backendless.Async(userLoggedInStatus, gotError));
        }

        function userLoggedInStatus(user) {
            $rootScope.islogin = true;
            $rootScope.user_profile = user;
            $state.go('app.home');
        }
        function gotError(err) { // see more on error handling
            var alertPopup = $ionicPopup.alert({
                title: 'Login Error!',
                template: '<center>' + err.message + '</center>'
            });
        }
        console.log('Load login page');

    })

    .controller('RegisterCtrl', function ($scope, $state, $window, $rootScope,$ionicPopup, $stateParams) {

        $scope.register = function (user_data) {
            var user = new Backendless.User();
            user['email'] = user_data.email;
            user['password'] = user_data.password;
            user['name'] = user_data.name;
            user['address'] = user_data.address;
            user['customer_type'] = 'PERSONAL';
            user['mobile'] = '';
            console.log(Backendless.UserService.register(user, new Backendless.Async(userRegistered, gotErrorRegister)));
        }

        function gotErrorRegister(err) { // see more on error handling
            var alertPopup = $ionicPopup.alert({
                title: 'Register Error!',
                template: '<center>' + err.message + '</center>'
            });
        }
        function userRegistered(user) {
            var alertPopup = $ionicPopup.alert({
                title: 'Register Success!',
                template: '<center>You"re registered success! Please check email and confirm account</center>'
            });
            $state.go('app.login');
        }
    })

   .controller('MyProfileCtrl', function ($scope, $state, $window, $rootScope, $stateParams) {
       
   })