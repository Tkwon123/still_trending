class EpisodesController < ApplicationController

  def index

  end

  def tv
  	@new = Show.new
  	@json = @new.find_seasons
  	render json: @json
  	puts "#{@json.count} Seasons"
  	@episodes = 0
  	@json.each do |season|
		@episodes += season.count
	end
	puts "#{@episodes} episodes"
  end

end
