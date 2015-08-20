var tv = angular.module('tv', []);

/*$(function(){
	$('#seasons').click(function(){
		alert('hi');
	});
});*/

tv.filter('clean', function(){
	return function(input){

		if (typeof input == 'string') {
			return input.replace(/<p>|<\/p>/g,"");
		} else {
			console.log(input);
		}
	};
});


tv.controller('SeasonsCtrl', function($scope, $http, $timeout, $interval, $rootScope){

		$scope.json = {};
		$scope.currentSeason = {};
		var userSearch = {};

		$scope.setSearch = function(search){
			userSearch = search;
		};
/*
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
		};*/
/*
		$scope.clean = function(text){
			return text.replace(/<p>|<\/p>/g,"");
		};
*/
		$scope.find_seasons = function(show){
			$rootScope.show = show;
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


		$scope.setSeason = function(season){
			$scope.currentSeason = $scope.json[season];
		};

	});

tv.controller('TweetCtrl', function($scope,$http,$timeout, $rootScope){

	$scope.search = {data:'hi'};
	$scope.tweets = [];
	$scope.find_tweets = function(show, start, end){
		$http({
			method: "get",
			url: '/episodes/tweets',
			params: {show: show, start_date: start, end_date: end}})
			.success(function(data){
				$scope.tweets = data;
				if ($scope.tweets.length) {
					} else {
					$scope.tweets = ["HM. I'm not sensing any chatter in the Twitter-sphere-- did things even trend back then?"];
					}
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

	$scope.setEpisode = function(airDate){

		var date = airDate;
		//Need to reorganize date into YYYY-MM-DD for the Twitter API
		date = date.split('-');
		date = {year: parseInt(date[0]), month: parseInt(date[1]), day: parseInt(date[2])};
		//Setting +1 and +2 days after airdate to show relevent tweets
		$scope.start_date = date.year + '-' + date.month + '-' + (date.day+1);
		$scope.end_date = date.year + '-' + date.month + '-' + (date.day+2);
		$scope.setTweets();
	};

	$scope.setTweets = function(){
		$scope.find_tweets($rootScope.show, $scope.start_date, $scope.end_date);
	};
});

