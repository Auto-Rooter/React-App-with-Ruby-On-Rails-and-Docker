class CommentsController < ApplicationController

    def create
        
        @post = Post.find(params[:post_id])
        @comment = @post.comments.create(comment_params)

        if @comment.save
            render json: {}, status: :created
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    def destroy

        @comment = Comment.find(params[:id])
        
        if @comment.destroy
            render json: {}, status: :no_content
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    private
    

    # Only allow a trusted parameter "white list" through.
    def comment_params
      params.permit(:comment, :post_id, :id)
    end


end
