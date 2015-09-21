ref = "";
angular.module('starter.controllers', ['ngOpenFB'])

.controller('DashCtrl', function($scope, $http, $location, Backand) {
  $http.get(Backand.getApiUrl() + '/1/objects/stories').success(function(data) {
    // you can do some processing here
    console.log("loading json");
    $scope.stories = data.data;
    console.log(data);
  });
  alert($location.absUrl());
  if ($location.absUrl().indexOf("code") > -1) {
    requestToken = ($location.absUrl()).split("code=")[1];
    requestToken = requestToken.split("#")[0];
    console.log(requestToken);
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $http.post("https://accounts.google.com/o/oauth2/token", {data: "client_id=" + clientId + "&client_secret=" 
    + clientSecret + "&redirect_uri=http://localhost:8100/" + "&grant_type=authorization_code" + "&code=" + requestToken})
                        .success(function(data) {
                            alert(data);
                            $location.path("/secure");
                            alert('ok');
                        })
                        .error(function(data, status) {
                            alert("ERROR: " + data);
                        });
                    ref.close();
  }
})

.controller('NewsCtrl', function($scope, $http, Backand) {
  $http.get(Backand.getApiUrl() + '/1/objects/news').success(function(data) {
    // you can do some processing here
    console.log("loading json");
    $scope.news = data.data;
    console.log(data);
  });
})

.controller('ChatsCtrl', function($scope, $http, Backand) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //$scope.chats = Chats.all();
  $http.get(Backand.getApiUrl() + '/1/objects/categories').success(function(data) {
    // you can do some processing here
    console.log("loading json");
    $scope.chats = data.data;
    console.log(data);
  });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, $http, Backand) {
  //$scope.chat = Chats.get($stateParams.chatId);
  console.log($stateParams.chatId);
  $http.get(Backand.getApiUrl() + '/1/query/data/getStories', {params: {parameters: {category: $stateParams.chatId}}}).success(function(data) {
    $scope.chat = data;
    console.log(data);
  });
})

.controller('StoryDetailCtrl', function($scope, $stateParams, $http, Backand) {
  $http.get(Backand.getApiUrl() + '/1/objects/stories/' + $stateParams.storyId).success(function(data) {
    $scope.story = data;
    console.log(data);
  });
})

.controller('ShuffleCtrl', function($scope, $stateParams, $http, Backand) {
  $scope.random = function() {
    $http.get(Backand.getApiUrl() + '/1/query/data/getRandomStory').success(function(data) {
      $scope.story = data[0];
      console.log($scope.story);
    });
  };
  $scope.random();
})

.controller('LoginCtrl', function($scope, ngFB) {
  $scope.data = {};
  $scope.fbLogin = function () {
      ngFB.login({scope: 'email,publish_actions'}).then(
          function (response) {
              if (response.status === 'connected') {
                  console.log('Facebook login succeeded');
              } else {
                  alert('Facebook login failed');
              }
          });
  };

  $scope.login = function() {
     LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
         $state.go('tab.dash');
     }).error(function(data) {
         var alertPopup = $ionicPopup.alert({
             title: 'Login failed!',
             template: 'Please check your credentials!'
         });
     });
  }
})

.controller('LoginController', function($scope, $http, $location) {

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    $scope.login = function() {
        var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=http://localhost:8100/&scope=email&approval_prompt=force&response_type=code&access_type=offline', '_blank', 'location=no');

        window.setTimeout(function() {
          console.log(ref);
        ref.addEventListener('load', function(event) {

                alert(event.url);

          

        });
        }, 0);
    }

    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (str){
            return this.indexOf(str) == 0;
        };
    }
})

.controller('SecureController', function($scope, $http) {
    $scope.accessToken = accessToken;
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
