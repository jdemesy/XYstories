angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, Backand) {
  $http.get(Backand.getApiUrl() + '/1/objects/stories').success(function(data) {
    // you can do some processing here
    console.log("loading json");
    $scope.stories = data.data;
    console.log(data);
  });
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
  $http.get(Backand.getApiUrl() + '/1/query/data/getRandomStory').success(function(data) {
    $scope.story = data;
    console.log(data);
  });
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
