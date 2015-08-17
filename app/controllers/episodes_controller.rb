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

	tweets = @client.search('from:justinbieber until:2015-08-13')
	@tweets = tweets.take(20).collect do |tweet|
	  "#{tweet.user.screen_name}: #{tweet.text} : #{tweet.created_at}"
	end

	render json: @tweets

  end

def test(options = {})
	@show = options[:show]
	@start_date = options[:start_date]
	@end_date = options[:end_date]

	#need to edit out this url
	@url = 'https://twitter.com/search?q=%23breakingbad%20since%3A2013-09-30%20until%3A2013-10-01&src=typd&lang=en'

	mechanize = Mechanize.new
	page = mechanize.get(@url)	
	@title = page.title
	tweets = page.parser.css('div.tweet-text')
	@tweets = tweets.map(&:text)
	binding.pry
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



