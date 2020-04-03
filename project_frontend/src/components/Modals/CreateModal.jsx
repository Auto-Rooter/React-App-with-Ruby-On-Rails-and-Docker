import React from "react";
import PropTypes from "prop-types";
import 'bulma/css/bulma.css';
import {createPost} from '../../api/blogAPI'
import ImageUploader from '../ImageUploader/ImageUploader';

export default class CreateModal extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          editablePost: this.props.post,
          selectedImage: null
        }
      }


    onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };


    handleSubmit = event => {
        event.preventDefault();
        
        
        const formPostData = new FormData(event.target);
      
        if(this.state.selectedImage !== null) {
           formPostData.append('image', this.state.selectedImage);
         }
         
         
        createPost(formPostData).then(response => {
        this.props.onCreate();
        this.props.onClose && this.props.onClose("");
      }).catch(error => {
        alert(`Something went wrong: ${error}`)
      });
      }

      selectImage = image => this.setState({ selectedImage: image });

      unselectImage = () => this.setState({ selectedImage: '' });



  render() {
    if(!this.props.createShow){
        return null;
    }
    else{
      return (
        <div className="modal is-active">
                <div className="modal-background"   />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title"> </p>
                        <button className="delete" onClick={this.onClose}/>
                    </header>

                    <section className="modal-card-body">

                            <div className="card-image card-padding">
                                    <ImageUploader 
                                        image=''
                                        selectImage={this.selectImage}
                                        unselectImage={this.unselectImage} 
                                    />
                            </div>

                            <div className="card-content">
                             <form onSubmit={this.handleSubmit}>
                                <label htmlFor="title" className="label">Title</label>
                                <div className="control">
                                    <input
                                    id="title"
                                    name="title"
                                    className="input"
                                    type="text" required/>
                                </div>
                                <label htmlFor="description" className="label">Description</label>
                                <div className="control">
                                    <textarea
                                    id="description"
                                    name="description"
                                    className="textarea" required/>
                                </div>
                                
                                <div className="control has-text-left editable-buttons">
                                    <input type="submit" value="Submit" className="button is-danger" />
                                </div>
                             </form>
                            </div>


                    </section>
                    <footer className="modal-card-foot">
                            <a className="button" onClick={this.onClose}>Cancel</a>
                    </footer>


                    
  </div>
</div>

)
    }

  }
}

CreateModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    createShow: PropTypes.bool.isRequired
  };