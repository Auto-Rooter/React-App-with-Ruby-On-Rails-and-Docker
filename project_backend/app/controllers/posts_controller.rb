class PostsController < ApplicationController
    before_action :set_post, only: %I[show update destroy]
  
    # GET /api/posts
    def index
      #values = {"posts" => {Post.all.with_attached_image.page(params[:page]).per(2)} }
      render json: Post.recent.with_attached_image
    end
  

    # GET /api/posts/1
    def show
      render json: @post
    end

    # PUT /api/posts/1
    def update
      if UpdatePostService.new(@post, post_params).call
        render json: @post
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end

    # POST /posts
  def create
    
    if (params.has_key?(:image) && params[:image] == "")
      @post = Post.new(post_params.except(:image))
    else
      @post = Post.new(post_params)
    end
   
    if @post.save
      render json: Post.recent.with_attached_image, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/posts/1
  def destroy
    @post.destroy
    render json: {}, status: :no_content
  end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_post
        @post = Post.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def post_params
        params.permit(:title, :description, :image)
      end
  end