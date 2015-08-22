var tv = angular.module('tv', []);

/*$(function(){
	$('#nyan').click(function(){
		$('body').addClass('nyan');
	});
});*/

tv.filter('clean', [function(){
	return function(input){

		if (typeof input == 'string') {
			return input.replace(/<p>|<\/p>/g,"");
		} else {
			console.log(input);
		}
	};
}]);

tv.controller('SeasonsCtrl', [function($scope, $http, $timeout, $interval, $rootScope){

	//NYAN!!!
	$scope.nyan = false;
	$scope.changeNyan =  function(){
		$scope.nyan = $scope.nyan === false ? true: false;

	};
	$scope.search = '';
	$scope.json = {};
	$scope.currentSeason = {};
	var userSearch = {};

	$scope.setSearch = function(search){
		userSearch = search;
	};



	$scope.find_seasons = function(show){
		$rootScope.show = show.replace(/\s/g, '');
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


	var evaluate = function(){
		if (counter === 0) {
			$interval.cancel(promise);
			$scope.find_seasons($scope.search);
			counter = 1;
		} else {
			tick();
		}
	};

	var tick = function(){
		counter -= 1;
		console.log(counter);
	};


	var counter = 1;
	var counting = false;
	var promise;
	

	$scope.setTimer = function(){
		$scope.stopTimer();
		promise = $interval(function(){evaluate();}, 500);
	};

	$scope.stopTimer = function(){
		$interval.cancel(promise);
	};

	$scope.timerAction = function(){
		if (counter === 0) {
			alert('hello there!');
		} else {
			counter = counter--;
			console.log(counter);
		}
	};


	$scope.timeout = function(){
		$timeout(function(){
			alert('hello');
		}, 500);
	};

}]);

tv.controller('TweetCtrl', [function($scope,$http,$timeout, $rootScope){

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
					$scope.tweets = ["HM. I'm not sensing any chatter in the 'Twitter-sphere'... Did things even trend back then?"];
					}
				})
			.error(function(data){
				alert("something looks like it went wrong here...");
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
		//Need to reor <i class="material-icons prefix">account_circle</i>ganize date into YYYY-MM-DD for the Twitter API
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
}]);

