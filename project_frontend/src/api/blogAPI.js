import axios from 'axios';

var axios1 = axios.create();
delete axios1.defaults.headers.common['X-CSRF-TOKEN'];
const API_URL = 'http://localhost:3000';


export function getPosts() {
  return axios1.get(`${API_URL}/api/v1/posts`);
}


export function updatePost(formData, postId) {
  return axios1({
    method: 'put',
    url: `${API_URL}/api/v1/posts/${postId}`,
    data: formData,
    headers: {'Content-Type': 'multipart/form-data'}
  });
}

export function createPost(formData) {
  return axios1({
    method: 'post',
    url: `${API_URL}/api/v1/posts`,
    data: formData,
    headers: {'Content-Type': 'multipart/form-data'}
  });
}


export function deletePost(postId) {
  return axios1.delete(`${API_URL}/api/v1/posts/${postId}`);
}

export function createComment(formData) {
  return axios1({
    method: 'post',
    url: `${API_URL}/api/v1/comments`,
    data: formData,
    headers: {'Content-Type': 'multipart/form-data'}
  });
}

export function deleteComment(commentId) {
  return axios1.delete(`${API_URL}/api/v1/comments/${commentId}`);
}

export function triangleChecker(a,b,c){
  return axios1.get(`${API_URL}/api/v1/triangle?a=${a}&b=${b}&c=${c}`);
}