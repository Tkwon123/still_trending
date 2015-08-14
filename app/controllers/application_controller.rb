class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

@client = Twitter::REST::Client.new do |config|
  config.consumer_key        = "2bUsByBlrGdWYjtpqC65VTl4F"
  config.consumer_secret     = "LQNEmVYI33VcfTWo9cPjKOqJLSebGeOdWKmRE3nkQBpaIDbcFa"
  config.access_token        = "1568771118-KA4PSZdKpflNHofKhQjAH49Bt5jezWl82CvMEzN"
  config.access_token_secret = "dfvKX4o7mRtb3uvlh9P9T55EgQEZWAr1lr5Sm5KzAKvHM"
end

@tweet = @client.search("to:justinbieber marry me", result_type: "recent").take(3).collect do |tweet|
  "#{tweet.user.screen_name}: #{tweet.text}"
end

end
