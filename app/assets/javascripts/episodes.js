var tv = angular.module('tv', []);

/*$(function(){
	$('#nyan').click(function(){
		$('body').addClass('nyan');
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
});

