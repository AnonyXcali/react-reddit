import React, { Component } from 'react';
import Posts from './Posts'

/**
@component DisplayPosts
This component is responsible rendering the unordered list of subreddits
  - Can be used to prepare the individual content for UL
    before rendering them individually
  @renders
    - Unordered List of Posts
    - Anchor link to redirect user to individual post context
**/

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
    const { subRedditPosts } = this.props;
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
