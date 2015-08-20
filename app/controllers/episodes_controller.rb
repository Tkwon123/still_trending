class EpisodesController < ApplicationController



  def home

  end

  def tv
  	@new = Show.new(params[:search])
  	@json = @new.find_seasons
  	render json: @json
  	debug_tv #print the number of episodes/seasons of show
  end

def test

end

def tweets(options = {})
	@show =  params[:show] || 'parksandrecreation'
	@start_date = params[:start_date] || '2015-02-25'
	@end_date = params[:end_date] || '2015-02-26'

	#need to edit out this url
	@url = "https://twitter.com/search?q=%23#{@show}%20since%3A#{@start_date}%20until%3A#{@end_date}&src=typd&lang=en"

	mechanize = Mechanize.new
	page = mechanize.get(@url)	
	@title = page.title
	tweets = page.parser.css('div.tweet-text')
	@tweets = tweets.map(&:text)
	render json: @tweets 
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



