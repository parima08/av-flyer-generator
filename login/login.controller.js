'use strict'

var app = angular.module('myApp'); 


app.controller('LoginController', LoginController);

LoginController.$inject = ['$scope','googleService', 
                      '$rootScope', '$location',
                      'userPersistenceService', '$window', '$http', 'accessList'];
function LoginController($scope, googleService, $rootScope, $location, userPersistenceService, $window, $http, accessList) {
  var allowedEmails;
  $window.init = function(){
      if(userPersistenceService.getUserNameData()){
        $scope.isSignedIn = true
      }
      else{
        $scope.isSignedIn = false;
      }

    function validateUser(userEmail){
      //prevents user from logging in
      if(allowedEmails.indexOf(userEmail) === -1){
        console.log("not a valid user");
         $rootScope.validUser= false;
        alert("You are not authorized to log in. Contact your adminstrator.");
        $scope.signOut();
        return false;
      }
      else{
        //allows a valid user to go through
        console.log("valid user");
        

        //check if it's an SRD email address
        if(userEmail.includes('divinetouch')){
          $rootScope.srdUser = true;
        }
        
        $rootScope.validUser= true;
        return true;
      }
    }
    //this loads all of the allowed emails from the whitelist in google spreadsheets
    accessList.load().then(function(){
      allowedEmails = accessList.getList();
    });

    //this actually goes through the login process;
    googleService.load().then(function(){
      $scope.signIn = function(){
        console.log("in signin"); 
        googleService.signIn().then(function(){
          console.log("loaded googleservice"); 
          $scope.isSignedIn = googleService.isSignedIn();
          var profile = googleService.getUserProfileInformation(); 
          $rootScope.loggedInUser = profile; 
          $rootScope.loggedInUser.fullName = profile.getName();
          $rootScope.loggedInUser.email = profile.getEmail();
          var redirect = validateUser($rootScope.loggedInUser.email);
          if(redirect){
            userPersistenceService.setCookieData(profile.getName(), profile.getEmail(), $rootScope.srdUser); 
            $location.path('/home').replace();
          }
        });
      };

      $scope.signOut = function(){
        googleService.signOut().then(function(){
          $scope.isSignedIn = googleService.isSignedIn();
          userPersistenceService.clearCookieData(); 
        });
      };
    });
  }
}; 

app.service('googleService', ['$q', function ($q) {
    var self = this;
    this.load = function(){
      var deferred = $q.defer();
      gapi.load('auth2', function(){
        var auth2 = gapi.auth2.init();
        //normally I'd just pass resolve and reject, but page keeps crashing (probably gapi bug)
        auth2.then(function(){
          deferred.resolve();
        });
        addAuth2Functions(auth2);
      });
      return deferred.promise;
    };

    function addAuth2Functions(auth2){
      self.signIn = function() {
        var deferred = $q.defer();
        auth2.signIn().then(deferred.resolve, deferred.reject);
        return deferred.promise;
      };

      self.getUserProfileInformation = function(){
        if(auth2.isSignedIn.get()){
          console.log("The User is signed in", auth2.currentUser); 
          return auth2.currentUser.get().getBasicProfile(); 
        }
      }; 
      
      self.isSignedIn = function(){
        return auth2.isSignedIn.get();
      };

      self.signOut = function(){
        var deferred = $q.defer();
        auth2.signOut().then(deferred.resolve, deferred.reject);
        return deferred.promise;
      };
    }
}]);

app.service('accessList', function($http, $q, $sce){
  var accessList = [];
  return{
    load: function(){
      var defered = $q.defer();
      var url = "https://spreadsheets.google.com/feeds/list/14XFRBqwnH28C3y86n0uuMZnZn4vgSbPWe1a6DRCbRAg/od6/public/values?alt=json-in-script"
      $sce.trustAsResourceUrl(url)
      $http.jsonp(url).then(function(data, status){
        data = data.data.feed.entry;
        for(let i = 0; i < data.length; i++){
          accessList.push(data[i].gsx$email.$t)
        }
        defered.resolve();
      });
      return defered.promise;
    },
    getList: function(){
      return accessList;
    }
  }
});

app.factory("userPersistenceService", [
  "$cookies", "$rootScope" , function($cookies, $rootScope) {

    return {
      setCookieData: function(userName, userEmail, srdUser) {
        $cookies.put("userName", userName);
        $cookies.put("userEmail", userEmail);
        $cookies.put("srdUser", srdUser);
      },
      getUserNameData: function() {
        return $cookies.get("userName");
      },
      getUserEmailData: function(){
        return $cookies.get("userEmail");
      },
      getSrdUserData: function(){
        return $cookies.get("srdUser");
      },
      clearCookieData: function() {
        console.log("Clearing Cookie Data")
        $cookies.remove("userName");
        $cookies.remove("userEmail"); 
      },
    }
  }
]);
