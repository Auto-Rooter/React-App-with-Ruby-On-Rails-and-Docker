import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post/Post';




const splitEvery = (array, length) =>(
  array.reduce(
    (result, item, index) => {
      if ( index % length === 0 ) result.push([])
      result[Math.floor(index / length)].push(item)
      return result
    },
    []
  ));

  const PostList = ({ posts, update, onCreate }) => (
<div>{
       splitEvery(posts, 4).map( usersChunk => (
          <div className="columns" style={{marginTop:1+'em', marginBottom:2.5+'em'}}>
            { usersChunk.map( post => (
                
              <Post
                key={post.id}
                post={post}
                update={update}
                onCreate={onCreate} 
              />
              ))
            }
          </div>
        ))
          }
        </div>
       );
  
  
  PostList.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    update: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
  };
  
  export default PostList;