class PostsController < ApplicationController
    before_action :set_post, only: %I[show update destroy]
  
    # GET /api/posts
    def index
      #values = {"posts" => {Post.all.with_attached_image.page(params[:page]).per(2)} }

      render json: Post.all.with_attached_image
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
    @post = Post.new(post_params)

    if @post.save
      render json: Post.all.with_attached_image
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/posts/1
  def destroy
    @post.destroy
    render json: Post.all.with_attached_image
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