import React, { PureComponent } from 'react';
import axios from 'axios';
import { getPosts, updatePost } from '../src/api/blogAPI';
import { mapIntoObject } from './utils/data_structure_util';
import 'bulma/css/bulma.css';
import CreateModal from './components/Modals/CreateModal'
import TriangleModal from './components/Modals/TriangleModal'
import '../src/styles/ngProgress.css';
import PostsList from './components/PostsList/PostsList';
import nprogress from 'nprogress'

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      posts: {},
      createShow: false,
      triangleShow: false
    }
  }

  showCreateModal = e => {
    this.setState({
      createShow: !this.state.createShow
    });
  };

  showTriangleModal = e => {
    this.setState({
      triangleShow: !this.state.triangleShow
    });
  };



    componentWillMount() {
    axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  }  

  componentDidMount() {
    nprogress.start();
    this.fetchPosts();
  }


  fetchPosts = () => {
    
    getPosts().then(response => {
      this.setState({ posts: mapIntoObject(response.data) });
     nprogress.done();
    }).catch(error => {
      console.log(error);
    });
  }


  update = ({formData, post}, callback) => {
    const { posts } = this.state;

    updatePost(formData, post.id).then(response => {
      this.setState({
        posts: {...posts, [post.id]: response.data }
      }, () => callback())
    }).catch(error => {
      alert(`Something went wrong: ${error}`)
    });
  }


  render() {
    const { posts } = this.state;

    //let linkss  = new Array(this.state.pages).fill(0);

    return (
      <div>

          <div class="container">
              <button class="button is-primary is-rounded"
               onClick={ e => {
                  this.showCreateModal(e);
               }} 
              style={{margin:0.5+'em',float : 'right'}}>
                Add New Post
              </button>

              <button class="button is-primary is-rounded"
              onClick={ e => {
                 this.showTriangleModal(e);
              }} 
             style={{margin:0.5+'em',float : 'left', "background-color": "#FFEB3B", "color": "black"}}>
               Triangle check
             </button>

              <CreateModal onClose={this.showCreateModal} createShow={this.state.createShow} onCreate={this.fetchPosts}>Message in Model </CreateModal>
              <TriangleModal onClose={this.showTriangleModal} triangleShow={this.state.triangleShow} >Message in Model </TriangleModal>
          </div>

          <section className="section">
              <div className="container">
                <PostsList posts={Object.values(posts)} 
                update={this.update} onCreate={this.fetchPosts}
                />
              </div>
          </section>
      </div>
 
    );
  }
}