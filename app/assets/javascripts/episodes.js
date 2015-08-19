var tv = angular.module('tv', []);
	
tv.controller('SeasonsCtrl', function($scope, $http, $timeout, $interval){

		$scope.json = {};
		$scope.currentSeason = {};
		var userSearch = {};
		$scope.setSearch = function(search){
			userSearch = search;
			alert(userSearch);
		};

		$scope.timeout = function(){
			$timeout(function(){
				$scope.hello();
			}, 1000);
		};

		var counter = 3;

		$scope.increment = function(){
			if (counter === 0){
				$interval(function(){
						while(counter > 0){console.log(counter--);}
					},1000);
			}
		};

		$scope.hello = function(){alert('hi');};

		$scope.test = function(){alert($scope.search);};

		$scope.find_seasons = function(show){
			$http({
				method: 'get',
				url: '/episodes/tv',
				params: {search: show},
				timeout: 3000
			})
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

tv.controller('TweetCtrl', function($scope,$http,$timeout){

	$scope.search = {data:'hi'};
	$scope.tweets = [];
	$scope.find_tweets = function(show, start, end){
		$http({
			method: "get",
			url: '/episodes/tweets',
			params: {show: show, start_date: start, end_date: end}})
			.success(function(data){
				$scope.tweets = data;
			})
			.error(function(data){
				alert(data);
			});
		};

	$scope.empty_tweets = function(){
		$timeout(function(){
			$scope.tweets = [];}, 500);
	};

	$scope.iterate_array = function(array){
		for(var i=0; i<array.length;i++){
			console.log(array[i]);
		}

	};
});

