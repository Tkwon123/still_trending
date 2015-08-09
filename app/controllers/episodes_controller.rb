class EpisodesController < ApplicationController

  def index

  end

  def tv
  	@new = Show.new
  	@json = @new.parse
  	render json: @json
  end

end
