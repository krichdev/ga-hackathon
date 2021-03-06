angular.module('AppCtrl', ['AppServices'])
.controller('SignupCtrl', ['$scope', '$http', '$state', 'Auth', function($scope, $http, $state, Auth) {
    $scope.user = {
        name: '',
        email: '',
        password: '',
        portfolio: '',
        userType: '',
        profilePic: '',
        bio: '',
        frontDev: false,
        backDev: false,
        fullDev: false,
        mobileDev: false,
        visualUX: false,
        interfaceUX: false,
        interationUX: false,
        frontUX: false,

    };
    $scope.userSignup = function() {
        // to implement
        $http.post('/api/users', $scope.user).then(function success(res) {
            $scope.currentUser = {
                email: $scope.user.email,
                password: $scope.user.password
            }
            $http.post("/api/auth", $scope.currentUser).then(function success(res){
                Auth.saveToken(res.data.token);
                $state.go("users");
            }, function error(err){
                console.log("bad auth")
            })
        }, function error(err) {
        console.log("Error", err)
        })
    };
}])
.controller('LoginCtrl', ['$scope', '$http', '$state', 'Auth', function($scope, $http, $state, Auth) {
    $scope.user = {
        email: '',
        password: ''
    };
    $scope.userLogin = function() {
        // to implement
        $http.post("/api/auth", $scope.user).then(function success(res) {
        Auth.saveToken(res.data.token);
        $state.go("users")
        }, function error(err) {
            console.log("Yo dawg")
        })
        }
}])
// .controller('AlertsCtrl', ['$scope', 'Alerts', function($scope, Alerts){
//     $scope.alerts = Alerts.getAll();
// }])
.controller('NavCtrl', ['$scope', 'Auth', '$location', '$state', function($scope, Auth, $location, $state) {
  $scope.isLoggedIn = function() {
    return Auth.isLoggedIn();
  }
  $scope.logout = function() {
    // to implement
    console.log("Before Logout", Auth.getToken());
    Auth.removeToken();
    console.log("After Logout", Auth.getToken());
    $location.path("/login");
  };
}])
