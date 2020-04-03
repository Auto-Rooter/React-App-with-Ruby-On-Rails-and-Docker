import React from 'react';
import PropTypes from 'prop-types';

const NonEditablePost = ({ post }) => {
  let imageSrc = post.image !== null ? post.image.url : "https://bulma.io/images/placeholders/1280x960.png";
  
    return (
      <React.Fragment>

        <div className="card-image">
          <figure className=" is-5by4">
            <img src={imageSrc} alt="post image" />
          </figure>
        </div>
        <div className="card-content">
          <p className="title is-4">{post.title}</p>
          <div className="content">
            <p>{post.description}</p>
            <time><i><p style={{ 'text-align': 'right'}}> <font size="1">  {post.updated_at.toLocaleString()} </font> </p></i></time>
          </div>
        </div>
      </React.Fragment>
    )
  }


  NonEditablePost.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      image: PropTypes.shape({url: PropTypes.string}),
      title: PropTypes.string,
      updated_at: PropTypes.string
    }).isRequired,

  };
  
  export default NonEditablePost;