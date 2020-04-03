# Load the Rails application.
require_relative 'application'
# config.action_mailer.default_url_options = { host: ‘localhost:3000’ } 
# Rails.application.routes.default_url_options[:host] = ‘localhost:3000’

#config.action_mailer.default_url_options = { host: 'http://localhost:3000' }
Rails.application.routes.default_url_options[:host] = 'http://localhost:3000'

# Initialize the Rails application.
Rails.application.initialize!
