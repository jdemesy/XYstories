// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var requestToken = "";
var accessToken = "";
var clientId = "269649216122-h860hf1h9g776fu24grbdv35t1g7tuir.apps.googleusercontent.com";
var clientSecret = "kdvhXT2Ci8yZ_f1yoGHnr13B";

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'backand', 'ngCookies', 'ngOpenFB'])

.run(function($ionicPlatform, ngFB) {
  ngFB.init({appId: '531660450322045'});
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login_oauth', {
            url: '/login_oauth',
            templateUrl: 'templates/login_oauth.html',
            controller: 'LoginController'
        })
        .state('secure', {
            url: '/secure',
            templateUrl: 'templates/secure.html',
            controller: 'SecureController'
        });
    $urlRouterProvider.otherwise('/login');
})

.config(function($stateProvider, $urlRouterProvider, BackandProvider) {

  BackandProvider.manageDefaultHeaders();
  BackandProvider.setAppName('xystories');
  BackandProvider.setSignUpToken('1fe6a74b-aaf6-48f0-91d6-9bae11c61ad1');
  BackandProvider.setAnonymousToken('74f1acd3-7316-4891-86c8-b92abd374a13');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.news', {
    url: '/dash/news',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-news.html',
        controller: 'NewsCtrl'
      }
    }
  })

  .state('tab.chats', {
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tab-chats.html',
        controller: 'ChatsCtrl'
      }
    }
  })
  .state('tab.chat-detail', {
    url: '/chats/:chatId',
    views: {
      'tab-chats': {
        templateUrl: 'templates/chat-detail.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })
  .state('tab.story-detail', {
    url: '/story/:storyId',
    views: {
      'tab-chats': {
        templateUrl: 'templates/story-detail.html',
        controller: 'StoryDetailCtrl'
      }
    }
  })

  .state('tab.shuffle', {
    url: '/shuffle',
    views: {
      'tab-shuffle': {
        templateUrl: 'templates/tab-shuffle.html',
        controller: 'ShuffleCtrl'
      }
    }
  })

  .state('tab.favorites', {
    url: '/favorites',
    views: {
      'tab-favorites': {
        templateUrl: 'templates/tab-favorites.html',
        controller: 'FavoritesCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  .state('callback', {
      url: '/callback',
      templateUrl: 'templates/login_oauth.html',
      controller: 'LoginCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
