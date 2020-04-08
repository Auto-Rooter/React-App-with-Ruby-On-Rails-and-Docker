require 'rails_helper'

RSpec.describe TrianglesController, type: :controller do
  
    describe "#check" do
        

        context "Equilateral Triangle" do

            subject { get :check, params: {a: "2", b: "2", c: "2" } } 

            it 'should have 200 HTTP status' do
                subject
                expect(response).to have_http_status(:ok)
            end

            it 'should return proper body' do
                subject
                expect(json["msg"]).to eq("Equilateral")
            end
        end  


        context "Isosceles Triangle" do

            subject { get :check, params: {a: "2", b: "1", c: "2" } } 

            it 'should have 200 HTTP status' do
                subject
                expect(response).to have_http_status(:ok)
            end

            it 'should return proper body' do
                subject
                expect(json["msg"]).to eq("Isosceles")
            end
        end  


        context "Scalene Triangle" do

            subject { get :check, params: {a: "1", b: "2", c: "3" } } 

            it 'should have 200 HTTP status' do
                subject
                expect(response).to have_http_status(:ok)
            end

            it 'should return proper body' do
                subject
                expect(json["msg"]).to eq("Scalene")
            end
        end  


        context "Invalid parameters" do

            subject { get :check, params: {a: "asfasf", b: "2", c: "" } } 

            it 'should have 422 HTTP status' do
                subject
                expect(response).to have_http_status(:unprocessable_entity)
            end

            it 'should return proper error body' do
                subject
                expect(json["errors"]).to eq("Something wrong with yours params")
            end
        end  


    end


end