angular
	.module('inputBasicDemo', ['ngMaterial', 'ngMessages'])
	.controller('DemoCtrl', ['$scope','$http','$window',function($scope,$http,$window) {
	$scope.user = {
		name		:'',
		title		:'',
		phone		:'',
		email		:'',
		fullname	:{
			firstname	:'',
			lastname	: '',
		},
		company: '',
		address: {
			street	:'',
			city	:'',
			province:''
		}
    };
	$scope.provinces = ('Aceh,Bali,Banten,Bengkulu,Gorontalo,Jakarta,Jambi,Jawa Barat,Jawa Tengah,Jawa Timur,Kalimantan Barat,Kalimantan Selatan,Kalimantan Tengah,Kalimantan Timur,Kepulauan Bangka Belitung,Kepri,Lampung,Maluku,Maluku Utara,NTB,NTT,Papua,Papua Barat,Riau,Sulawesi Barat,Sulsel,Sulteng,Sultra,Sulut,Sumbar,Sumsel,Sumut,Yogyakarta ').split(',').map(function(province) {
		return {nm: province};
    });
	$scope.saveContact = function(){
		$http.post(
			"http://localhost:3000/saveContact",
			{
				"name":$scope.user.name,
				"title":$scope.user.title,
				"email":$scope.user.email,
				"fullname":$scope.user.fullname,
				"phone":$scope.user.phone,
				"address":$scope.user.address,
				"company":$scope.user.company
			},
			function(error,response,body){
				console.log("save contact",response);
				$window.location.href = "http://localhost:3000"
			}
		)
		.then(function(res){
			console.log("RES",res);
			$window.location.href = "http://localhost:3000"
		},function(err){
			console.log("Error http:",err);
		});
	}
	$scope.goHome = function(){
		console.log("Add contact clicked");
		$window.location.href = "http://localhost:3000";
	}
  }])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
  });
