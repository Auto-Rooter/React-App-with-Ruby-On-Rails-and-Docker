export function mapIntoObject(arr) {
    return arr.reduce((acc, curr) => {
                          acc[curr.id] = curr;
                          return acc;
                        }, {})
  
  
  }

  export function getNumersOfPages(arr) {
    return arr.reduce((pages, post) => {
                          pages = post.posts_per_page;
                          return pages;
                        }, {})
  
  }
  