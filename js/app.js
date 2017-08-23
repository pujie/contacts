var app = angular.module('contacts',['ngMaterial']);
app.controller('contactCtr',['$scope','$http','$mdDialog','$window',function($scope,$http,$mdDialog,$window){
    $http.get("http://localhost:3000/getcontacts")
    .then(function(res){
        console.log("Res",res.data.contact);
        $scope.names = res.data.contact;
    },function(err){
        console.log("Error http:",err);
    });
    var imagePath = '/assets/angular-logo.svg';
    $scope.image = imagePath;
    $scope.showInsertForm = function(contact_id){
		$window.location.href = "http://localhost:3000/editcontact/"+contact_id;
        console.log("Add contact clicked");
    }
    $scope.removeContact = function(obj){
        console.log("Add contact clicked");
        console.log("remove contact ",obj.name,obj.contact_id);
        $http.get("http://localhost:3000/deleteRecord/"+obj._id)
        .then(function(res){

            $http.get("http://localhost:3000/getcontacts")
            .then(function(res){
                console.log("Res",res.data.contact);
                $scope.names = res.data.contact;
            },function(err){
                console.log("Error http:",err);
            });
        },function(err){
            console.log("Error http:",err);
        });        
    }
    $scope.goHome = function(){
        console.log("Add contact clicked");
        $window.location.href = "http://localhost:3000";
    }
   $scope.showEntryPage = function(ev){
       $window.location.href = "http://localhost:3000/entrycontact";
   }
}]);
