import React from "react";
import PropTypes from "prop-types";
import 'bulma/css/bulma.css';
import {deletePost} from '../../api/blogAPI'

export default class DeleteModal extends React.Component {

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
        

         
      deletePost(this.props.postId).then(response => {
        this.props.onCreate();
        this.props.onClose && this.props.onClose("");
      }).catch(error => {
        alert(`Something went wrong: ${error}`)
      });
      }

      selectImage = image => this.setState({ selectedImage: image });

      unselectImage = () => this.setState({ selectedImage: '' });



  render() {
    //
    if(!this.props.deleteShow){
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

                                    <h2 class="subtitle" style={{ "text-align": "center", "font-weight" : "bold" }}>Are You sure you want to Delete Post #{this.props.postId}? </h2>
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

DeleteModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    deleteShow: PropTypes.bool.isRequired,
    postId: PropTypes.number.isRequired,
    onCreate: PropTypes.func.isRequired,
  };