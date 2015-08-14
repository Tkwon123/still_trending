require 'oauth'

require 'oauth'
module Twitter
class Tweet

	def initialize 
		consumer_key = OAuth::Consumer.new(
		    Rails.application.secrets.API_KEY,
		    Rails.application.secrets.API_SECRET)
		access_token = OAuth::Token.new(
		    Rails.application.secrets.ACCESS_TOKEN,
		    Rails.application.secrets.ACCESS_TOKEN_SECRET)

		# All requests will be sent to this server.
		baseurl = "https://api.twitter.com"

		# The verify credentials endpoint returns a 200 status if
		# the request is signed correctly.
		address = URI("#{baseurl}/1.1/account/verify_credentials.json")

		# Set up Net::HTTP to use SSL, which is required by Twitter.
		http = Net::HTTP.new address.host, address.port
		http.use_ssl = true
		http.verify_mode = OpenSSL::SSL::VERIFY_PEER

		# Build the request and authorize it with OAuth.
		request = Net::HTTP::Get.new address.request_uri
		request.oauth! http, consumer_key, access_token

		# Issue the request and return the response.
		http.start
		response = http.request request
		puts "The response status was #{response.code}"
	end
end
end
