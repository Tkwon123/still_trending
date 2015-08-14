var tv = angular.module('tv', []);
	
tv.controller('SeasonsCtrl', function($scope, $http){
		//data 
		$scope.json = null;
		$scope.currentSeason = {};
		$scope.find_seasons = function(){
			$http.get('/episodes/tv')
				.success(function(data){
					$scope.json = data;
			});
		};

		$scope.alert = function(){
			alert('hi!');
		};

		$scope.setSeason = function(season){
			$scope.currentSeason = $scope.json[season];
		};

		$scope.setEpisode = function(episode){
			alert(episode);
		};

	});

tv.controller('TweetCtrl', function($scope,$http){

	$scope.search = {data:'hi'};
	$scope.test = function(){console.log($scope.search);};

	$scope.find_tweets = function(){
		$http.get('/episodes/tweets').
			success(function(data){
				$scope.json = data;
			})
			.error(function(data){
				alert(data);
			});
		};

	$scope.iterate_array = function(array){
		for(var i=0; i<array.length;i++){
			console.log(array[i]);
		}

	};
});

