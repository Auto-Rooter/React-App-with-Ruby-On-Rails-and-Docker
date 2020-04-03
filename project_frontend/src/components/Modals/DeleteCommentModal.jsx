import React from "react";
import PropTypes from "prop-types";
import 'bulma/css/bulma.css';
import {deleteComment} from '../../api/blogAPI'

export default class DeleteCommentModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          posts : {}
        }
      }


    onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };

    getSnapshotBeforeUpdate(props, state){
        return {
          posts: this.state.posts
        };
      }

    handleSubmit = event => {
      event.preventDefault();
        

         
      deleteComment(this.props.commentId).then(response => {
        this.props.onCreate();
        this.props.onClose && this.props.onClose("");
      }).catch(error => {
        alert(`Something went wrong: ${error}`)
      });
      }


  render() {
    if(!this.props.deleteCommentShow){
        return null;
    }
    else {
      return (
        <div className="modal is-active">
                <div className="modal-background"   />
                <div className="modal-card">
                    <header className="modal-card-head">
                    <p className="modal-card-title"> </p>
                        <button className="delete" onClick={this.onClose}/>
                    </header>
                    <section className="modal-card-body">


                            <div className="card-content">
                             <form onSubmit={this.handleSubmit}>

                                    <h2 class="subtitle" style={{ "text-align": "center", "font-weight" : "bold" }}>Are You sure you want to this Comment #{this.props.commentId}? </h2>
                                    <div>
                                        <input type="submit" value="Delete" className="button is-danger" style={{ float: "left" }} />
                                        <a className="button" onClick={this.onClose} style={{ float: "right" }}>Cancel</a>
                                    </div>
                                
                             </form>
                            </div>


                    </section>
                    
  </div>
</div>

)
    }
  
  }
}

DeleteCommentModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    deleteCommentShow: PropTypes.bool.isRequired,
    commentId: PropTypes.number.isRequired
  };