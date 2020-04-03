module JsonApiHelpers
    def json
        JSON.parse(response.body)
    end
end