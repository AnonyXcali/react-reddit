import React, { Component } from 'react';
import Posts from './Posts'

class DisplayPosts extends Component {

  renderPosts = subRedditPosts => {
    return subRedditPosts.map((post, iter) => {
      return(
        <li
          className='_post'
          key = {'_rdt'+'_'+iter}>
          <a className='_cardAnchor' href={post.url} target={'_blank'}>
          <Posts
            post = {post}
          />
          </a>
        </li>
      )
    })
  }


  render() {
    const { subRedditPosts, isFetching } = this.props;
    return (
      <div className="_postParent">
        <ul>
        {this.renderPosts(subRedditPosts)}
        </ul>
      </div>
    );
  }
}

export default DisplayPosts;
