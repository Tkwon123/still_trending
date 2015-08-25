var tv = angular.module('tv', []);

tv.filter('clean', function(){
	return function(input){

		if (typeof input == 'string') {
			return input.replace(/<p>|<\/p>/g,"");
		} else {
			console.log(input);
		}
	};
});

tv.controller('SeasonsCtrl', ['$scope', '$http', '$timeout', '$interval', '$rootScope', function($scope, $http, $timeout, $interval, $rootScope){
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
		/*$('#episode-container').promise().done(
			function(){alert($('#episode-container').height());}
		);*/
		$timeout(function(){
			$('#season-container').height($('#episode-container').height());
		},100);


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

tv.controller('TweetCtrl', ['$scope', '$http', '$timeout', '$rootScope', function($scope, $http, $timeout, $rootScope){

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
		$scope.tweets = ["Loading..."];
		var date = airDate;
		//Need to reorganize date into YYYY-MM-DD for the Twitter API. We're subtracting a month because JS uses 0-11 month range
		//meanwhile Twitter's Advanced search 1-12, and it seems most inuitive to allow JS to interpret days natively (i.e. in 
		//situations where the month rolls over or on leap years.)
		date = date.split('-');
		date = {year: parseInt(date[0]), month: parseInt(date[1]), day: parseInt(date[2])};

		//The plus option sets the interval for how many days AFTER the show has aired. Grabbing a 24 hour range after the date given.
		var start = createDay(date.year, date.month-1 , date.day, {plus:1});
		$scope.start_date = start.getFullYear() + '-' + (start.getMonth()+1) + '-' + start.getDate();
		alert ($scope.start_date);

		var end = createDay(date.year, date.month-1 , date.day, {plus:2});
		$scope.end_date = end.getFullYear() + '-' + (end.getMonth()+1) + '-' + end.getDate() ;
		alert ($scope.end_date);

		$scope.setTweets();
	};

	createDay = function(year, month, day, moreDays){
		var date = new Date(year, month, day);
		var addedDays = new Date (date.setDate(date.getDate() + moreDays.plus));
		return addedDays;
	};


	

	$scope.setTweets = function(){
		$scope.find_tweets($rootScope.show, $scope.start_date, $scope.end_date);
	};
}]
);