import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EditablePost from '../EditablePost/EditablePost';
import NonEditablePost from '../NonEditablePost/NonEditablePost';
import '../../styles/post.css';
import {createComment} from '../../api/blogAPI'
import DeleteModel from '../Modals/DeleteModal'
import DeleteCommentModal from "../Modals/DeleteCommentModal"

class PostToggle extends PureComponent {

  static propTypes = {
        onSubmit: PropTypes.func.isRequired
   }

  constructor(props) {
    super(props);

    this.state = { 
                   isEditable: false,
                   deleteShow: false,
                   deleteCommentShow: false,
                   currentPost: 0,
                   comment: '',
                   fetchElements: undefined
                   };

    
  }

  deleteCreateModal  = e => {
    this.setState({
      deleteShow: !this.state.deleteShow
    });
  };

  deleteCommentModal = e => {
    this.setState({deleteCommentShow : !this.state.deleteCommentShow});
  };

  storeFetchFunction = (functionFetch) => {
    this.setState({
      fetchElements: functionFetch
    });
  }

  toogle = () => {
    this.setState(currentState => {
      return { isEditable: !currentState.isEditable }
    });
  }


  handleCommentChange = (e) => {
    this.setState({
      comment : e.target.value
    });
    
  }

  getCurrentPost = (recId) =>{
    this.setState({currentPost : recId})
  }

  submit = (formData, post) => {
    this.props.onSubmit({formData, post},
      () => this.toogle()
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formPostData = new FormData(event.target);

    formPostData.append('post_id', this.state.currentPost);
    formPostData.append('comment', this.state.comment);
    
   createComment(formPostData).then(response => {
      this.setState({comment : ''});
      this.state.fetchElements();
  }).catch(error => {
   alert(`Something went wrong: ${error}`)
  });
  }

  render() {
    return this.props.children({
      isEditable: this.state.isEditable,
      toogle: this.toogle,
      submit: this.submit,
      deleteCreateModal: this.deleteCreateModal,
      postDeleteValue: this.state.deleteShow,
      commentDeleteValue: this.state.deleteCommentShow,
      handleSubmit: this.handleSubmit,
      comment: this.state.comment,
      handleCommentChange: this.handleCommentChange,
      comments: this.state.comments,
      getCurrentPost: this.getCurrentPost,
      storeFetchFunction: this.storeFetchFunction,
      deleteCommentModal: this.deleteCommentModal
    })
  }
}





const Post = ({ post, update, onCreate }) => (
  
    <PostToggle 
    crossorigin="anonymous" onSubmit={update} > 
      {
        ({isEditable, toogle, submit, deleteCreateModal,
           postDeleteValue, handleSubmit, comment,
           getCurrentPost, handleCommentChange,
            storeFetchFunction, deleteCommentModal,
            commentDeleteValue}) => (
          
          <div className="column is-one-quarter">
              
                <div className="message-header " style={{ "background-color" : "#03A9F4" }}>
                  Post #{post.id}
                   {getCurrentPost(post.id)}
                   {storeFetchFunction(onCreate)}
                    <button className="delete"
                              onClick={deleteCreateModal}   >
                              
                    </button>
                    <DeleteModel onClose={deleteCreateModal}
                                 deleteShow={postDeleteValue}
                                 postId={post.id}
                                 onCreate={onCreate}
                                 >Message in Model </DeleteModel>
                </div>
          
            <div className="card">
                {isEditable
                  ?
                  <EditablePost
                  crossorigin="anonymous"
                    post={post}
                    submit={submit}
                    toogle={toogle} />
                  :
                  <NonEditablePost post={post} />
                }
                <div>
                    <div className="has-text-right buttons-padding">
                      <a
                        className="button is-primary"
                        onClick={toogle}
                        style={{ float: "right" }}>
                          {isEditable ? 'Close' : 'Edit'}
                      </a>
                    </div>
                </div>


                <nav class="panel" style={{ 'marginTop':2+'em', "border-top": "2px solid #CFD8DC" }}>
                    <p class="panel-heading" style={{'background-color': '#FFFF', 'text-align': 'center', "color" : "#78909C"}}>
                      Comments
                    </p>
                    
                      {                                      
                        post.comments.map( commentElement => (

                              <a >
                                <div className="message-header" style={{ "display": "flex", "flex-direction": "row", "background-color" : "#E0F7FA", "margin" : 1+"em"}} key={commentElement.id}>
                                    <h5 style={{ "float" : "left", color : "Black" }}>{commentElement.comment}</h5>
                                    <button className="delete" onClick={deleteCommentModal} style={{ "float" : "right" }} ></button>
                                    <DeleteCommentModal
                                          key={commentElement.id}
                                          onClose={deleteCommentModal}
                                          deleteCommentShow={commentDeleteValue}
                                          commentId={commentElement.id}
                                          onCreate={onCreate}>

                                    </DeleteCommentModal>
                                    
                                </div>
                             </a>   

                          ))}
                                            

                   <form onSubmit={handleSubmit}>

                    
                    <div class="field">
                      <div class="control" style={{ "margin" : 1+"em"}}>
                        <input class="input " name="comment" type="text" value={comment} onChange={handleCommentChange} placeholder="Type your comment"/>
                      </div>
                    </div>

                    <div class="panel-block">
                      <button class="button is-link is-outlined is-fullwidth">
                        Add Comment
                      </button>
                    </div>
                  </form>

                  </nav>


            </div>

          </div>
        )
      }
    </PostToggle>
  )

  Post.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      image: PropTypes.object,
      title: PropTypes.string,
      updated_at: PropTypes.string,
      comments: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    onCreate: PropTypes.func.isRequired,
  };
  
  export default Post;