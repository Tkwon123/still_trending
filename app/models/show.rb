require 'open-uri'
require 'json'

class Show
	attr_accessor :root

	def initialize(show = 'breaking bad')
		@show = show
		@search = @show.gsub(' ', '+')
		@root = "http://api.tvmaze.com/singlesearch/shows?q=" + @search + "&embed=episodes"
	end

	def find_episodes
		@episodes = parse['_embedded']['episodes']
	end

	def find_seasons
		@episodes = parse['_embedded']['episodes']
		@episodes.group_by{|h| h['season']}.values
	end

	def parse
		@data = open(@root).read
		@json = JSON.parse(@data)
	end
end
