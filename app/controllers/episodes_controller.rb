class EpisodesController < ApplicationController



  def home

  end

  def tv
  	@new = Show.new
  	@json = @new.find_seasons
  	render json: @json
  	debug_tv #print the number of episodes/seasons of show

  end

  def tweets
  	@client = Twitter::REST::Client.new do |config|
		config.consumer_key        = "2bUsByBlrGdWYjtpqC65VTl4F"
		config.consumer_secret     = "LQNEmVYI33VcfTWo9cPjKOqJLSebGeOdWKmRE3nkQBpaIDbcFa"
		config.access_token        = "1568771118-KA4PSZdKpflNHofKhQjAH49Bt5jezWl82CvMEzN"
		config.access_token_secret = "dfvKX4o7mRtb3uvlh9P9T55EgQEZWAr1lr5Sm5KzAKvHM"
	end

	@tweet = @client.search("hilarious filter:links", result_type: "popular").take(20).collect do |tweet|
	  "#{tweet.user.screen_name}: #{tweet.text}"
	end

	render json: @tweet
  end


private
	
	#print out the number of seasons/eps to console
	def debug_tv
	  	puts "#{@json.count} Seasons"
	  	@episodes = 0
	  	@json.each do |season|
			@episodes += season.count
		end
		puts "#{@episodes} episodes"		
	end

end



