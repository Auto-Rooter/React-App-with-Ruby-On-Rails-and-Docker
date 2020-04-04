class CommentsController < ApplicationController

    def create
        #@comment = Comment.new(comment_params)
        #@comment = @post.comments.create(comment_params)
        #render json: Post.all.with_attached_image  

        @post = Post.find(params[:post_id])
        @comment = @post.comments.create(comment_params)

        if @comment.save
            render json: Post.all.with_attached_image
        else
            render json: @post.errors, status: :unprocessable_entity
        end
    end

    def destroy
        Comment.find(params[:id]).destroy
        render json: Post.all.with_attached_image
    end

    private
    

    # Only allow a trusted parameter "white list" through.
    def comment_params
      params.permit(:comment, :post_id, :id)
    end


end
