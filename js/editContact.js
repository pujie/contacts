angular
  .module('inputBasicDemo', ['ngMaterial', 'ngMessages'])
  .controller('editContact', ['$scope','$http','$window',function($scope,$http,$window) {
	id=window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    $http.get("http://localhost:3000/getone/"+id)
    .then(function(res){
        $scope.user = {
          _id:res.data.contact._id,
          name:res.data.contact.name,
          title:res.data.contact.title,
          phone:res.data.contact.phone,
          email:res.data.contact.email,
          fullname:res.data.contact.fullname,
          company:res.data.contact.company,
          address:res.data.contact.address
        };
    },function(err){
		console.log("Error http:",err);
    });
    var imagePath = '/assets/angular-logo.svg';
    $scope.image = imagePath;
    $scope.showInsertForm = function(){
        console.log("Add contact clicked");
    }
	$scope.provinces = ('Aceh,Bali,Banten,Bengkulu,Gorontalo,Jakarta,Jambi,Jawa Barat,Jawa Tengah,Jawa Timur,Kalimantan Barat,Kalimantan Selatan,Kalimantan Tengah,Kalimantan Timur,Kepulauan Bangka Belitung,Kepri,Lampung,Maluku,Maluku Utara,NTB,NTT,Papua,Papua Barat,Riau,Sulawesi Barat,Sulsel,Sulteng,Sultra,Sulut,Sumbar,Sumsel,Sumut,Yogyakarta ').split(',').map(function(province) {
		return {nm: province};
	});
	$scope.updateContact = function(){
		$http.post(
			"http://localhost:3000/updateContact",
			{
				"_id":$scope.user._id,
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

