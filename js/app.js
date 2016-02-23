angular.module('fireapp',[])


.controller('BioCtrl', ['$scope', function ($scope) {
	 var ref = new Firebase('https://bios-app.firebaseio.com');
	 $scope.bio={}
	 $scope.load=true;
	 $scope.bios=[];
	 $scope.flag=false;	
	 $scope.btnName="Add"
	 $scope.addBio =function (bio) {
	 	if (angular.isUndefined(bio.key))
	 	{
	 		console.log("In Added");
		 	ref.push(bio);
		 	$scope.bio={};
	 	}else{
	 		console.log("In Update")
		 	$scope.btnName="Add"
	 		var uref = new Firebase('https://bios-app.firebaseio.com/'+bio.key);
		 	uref.update(bio);
		 	$scope.flag=false;
		 	$scope.bio={};
	 	}
	 }

	 $scope.deleteInfo=function(key,index){
	 	ref.child(key).remove(function(response){
	 		// delete $scope.bios.index;
	 		// $scope.$apply();
	 	});

	 }
	
	 $scope.editInfo=function(key,item){
	 	$scope.btnName="Update"
	 	item.key=key;
	 	$scope.bio=item;
	 	$scope.flag=true;
	 }

	 ref.on("value",function(response){
	 	$scope.bios=response.val();
	 	$scope.load=false;
	 })
}])
