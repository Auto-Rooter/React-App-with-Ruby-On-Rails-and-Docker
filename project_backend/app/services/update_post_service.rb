class UpdatePostService
    def initialize(post, params)
      @post = post
      @params = params
    end
  
    def call
      if @params[:image] && !file?(@params[:image])
        delete_image if @post.image.attached?
        @params.delete(:image)
      end
  
      @post.update(@params)
    end
  
    private
  
    def file?(param)
      param.is_a?(ActionDispatch::Http::UploadedFile)
    end
  
    def delete_image
      @post.image.purge
    end
  end