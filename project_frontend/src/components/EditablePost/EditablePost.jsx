import React, { PureComponent } from 'react';
import ImageUploader from '../ImageUploader/ImageUploader';
import '../../styles/post.css';

class EditablePost extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editablePost: this.props.post,
      selectedImage: null
    }
  }

  handleInputChange = ({ target }) => {
    const { value, name } = target;
    const { editablePost } = this.state;
    
    this.setState({ 
      editablePost: {...editablePost, [name]: value} 
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    
    const { editablePost } = this.state;
    const formPostData = new FormData(event.target);
  
    if(this.state.selectedImage !== null) {
      formPostData.append('image', this.state.selectedImage);
    }

    this.props.submit(formPostData, editablePost);
  }

  selectImage = image => this.setState({ selectedImage: image });

  unselectImage = () => this.setState({ selectedImage: '' });

  render() {
    const { editablePost } = this.state;

    return (

      <React.Fragment>
          <div className="card-image card-padding">
            <ImageUploader
              image={editablePost.image}
              selectImage={this.selectImage}
              unselectImage={this.unselectImage} />
            </div>

          <div className="card-content">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="title" className="label">Title</label>
              <div className="control">
                <input
                  id="title"
                  name="title"
                  className="input"
                  type="text"
                  value={editablePost.title}
                  onChange={this.handleInputChange} />
              </div>
              <label htmlFor="description" className="label">Description</label>
              <div className="control">
                <textarea
                  id="description"
                  name="description"
                  className="textarea"
                  value={editablePost.description}
                  onChange={this.handleInputChange} />
              </div>
              
              <div className="control has-text-left editable-buttons">
                <input type="submit" value="Submit" className="button is-danger" />
              </div>
            </form>
          </div>
      </React.Fragment>
    );
  }
}

export default EditablePost;