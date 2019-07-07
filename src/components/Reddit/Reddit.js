import React, { Component, createRef } from 'react';
import options from '../../constants/constants'
import SubRedditSelector from './SubRedditSelector'
import DisplayPosts from './DisplayPosts'
import { selectSubreddit, fetchPosts } from '../../actions/actions'
import { connect } from 'react-redux'
import { Sticky, Ref, Icon } from 'semantic-ui-react'
import { Loader } from 'semantic-ui-react'

/**
@component Reddit
  @renders
    - @childComponent SubRedditSelector
    - @childComponent DisplayPosts
**/

class Reddit extends Component {

  /**
  For the sticky component as Refs provide a way to access DOM nodes or React elements created in the render method.
  **/
  contextRef = createRef()

  /**
  function selectedSubreddit
  @param subreddit
  Dispatches the selected subreddit to fetch subreddit posts.
  **/
  subRedditSelected = (subreddit) => {
    this.props.dispatch(selectSubreddit(subreddit))
    this.props.dispatch(fetchPosts(subreddit))
  }

  render() {
    const { selectedSubreddit, posts, isFetching } = this.props
    return (
      <div className='_reddit' ref={this.contextRef}>
        <Sticky context={this.contextRef}>
          <div className='_subRedditSelectDiv'>
            <SubRedditSelector
              id='_subRedditSelector'
              options={options}
              subRedditSelected={(subreddit) => {this.subRedditSelected(subreddit)}}
              />
              <div className='_appName'>
                <p>
                  <Icon className='reddit alien'/>
                  React Reddit App
                </p>
              </div>
          </div>
        </Sticky>
        {selectedSubreddit &&
          <div className='_currentSubRedditHeader'>
            <h1 className='_header'>r/{selectedSubreddit}</h1>
          </div>
        }
        {isFetching && posts.length === 0 &&
          <Loader active size='huge'>Loading</Loader>
        }
        {posts.length > 0 &&
          <div className='_posts'>
            <DisplayPosts
              subRedditPosts = {posts}
              isFetching = {isFetching}
              />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
    const { selectedSubreddit , postsBySubreddit } = state
    const {
        isFetching,
        items: posts
    } = postsBySubreddit[selectedSubreddit] || {
        isFetching: false,
        items: []
    }
    return {
      selectedSubreddit,
      posts,
      isFetching
     }
}

export default connect(mapStateToProps)(Reddit)
