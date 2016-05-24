angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope) {

  $scope.current_balance = localStorage.getItem("current_balance");
  var reg = [];


  $scope.$on('$ionicView.enter', function(e) {
    if(typeof(Storage) != "undefined") {
      $scope.current_balance = localStorage.getItem("current_balance");
    } else {
      alert("Sorry, your browser does not support Web Storage...");
    }
  });

  $scope.save = function(concept, amount){

      if(typeof(Storage) != "undefined") {

        var key = (new Date().getTime()).toString(16);

        reg.push({
          'id': key,
          'concept': concept,
          'amount': amount
        });

        localStorage.setItem("registry", JSON.stringify(reg));
        $scope.current_balance = localStorage.getItem("current_balance") - amount;
        localStorage.setItem("current_balance", $scope.current_balance);

      } else {
        alert("Sorry, your browser does not support Web Storage...");
      }
  };

  $scope.setBalance = function(balance){

      if(typeof(Storage) != "undefined") {
        localStorage.setItem("current_balance", balance);
        $scope.current_balance = balance;

      } else {
        alert("Sorry, your browser does not support Web Storage...");
      }
  };
})

.controller('ExpensesCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.registy = {};

  $scope.$on('$ionicView.enter', function(e) {
    if(typeof(Storage) != "undefined") {
      reg = JSON.parse(localStorage.getItem("registry"));
      $scope.registy = reg;
    } else {
      alert("Sorry, your browser does not support Web Storage...");
    }
  });

  $scope.remove = function(id) {
    //Chats.remove(chat);
    console.log(id);
  };
})

.controller('ExpensesDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  var registryId = $stateParams.chatId;

  var registry = JSON.parse(localStorage.getItem("registry"));
  registry.forEach(function(currentValue, index, array){
    console.log(currentValue.id);

    if(currentValue.id == registryId){
      array.splice(index, 1);

      newBalance = (parseFloat(localStorage.getItem("current_balance")) + parseFloat(currentValue.amount));
      localStorage.setItem("current_balance", newBalance);
    }
    console.log(index);

  });

  localStorage.setItem("registry", JSON.stringify(registry));

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
