class TrianglesController < ApplicationController
   before_action :triangle_params
    
    def check
      if (params[:a].to_i != 0 && params[:b].to_i != 0 && params[:c].to_i != 0)
         if (params[:a].to_i == params[:b].to_i &&  params[:b].to_i == params[:c].to_i)
            render json: {"msg": "Equilateral"}, status:200

         elsif (params[:a].to_i == params[:b].to_i) || (params[:a].to_i == params[:c].to_i) || (params[:b].to_i == params[:c].to_i)
            render json: {"msg": "Isosceles"}, status:200
         else
            render json: {"msg": "Scalene"}, status:200 
         end
      else
        render json: {"errors": "Something wrong with yours params"}, status:422
      end
      
    end


  
    private
      # Only allow a trusted parameter "white list" through.
      def triangle_params
        params.permit(:a, :b, :c)
      end
  end