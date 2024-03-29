import React, { Component } from 'react';
import { Card, Icon, Image  } from 'semantic-ui-react'
import ReactPlayer from 'react-player'
import { _postedAgo, _isValidURL, _decodeHtml, _isImage } from '../../utils/utils'

/**
@component Posts
This component is responsible for individual posts.
  @renders
    - Posted By User
    - Badge (if present)
    - Posted ago (time)
    - Textual Content (if present)
    - Image Content (if present)
    - Video (if present)
    - Comments
    - Likes
**/

class Posts extends Component {

  shouldComponentUpdate = (nextProps, nextState) => {
       if (this.props.post === nextProps.post) return false;
       return true;
   }

  /**
  function _decodeImageUrl
  @params url
  @returns string
  Returns image url for display
  **/
  _decodeImageUrl = (post) => {
    if(_isImage(post.url)) return post.url;
    if(post.preview){
      return post.preview.images[0].resolutions[post.preview.images[0].resolutions.length-1].url.replace(/&amp;/g, "&");
    }
  }

  _renderAwards = (awards, subreddit) => {
    let awardsArr = awards.map((key, index) => {
      return(
        <Card.Meta key={Date.now()+index} className={'_award _'+key.name}>
          <img alt={key.name} src={key.resized_icons[0].url}/>
          <span>{key.count}</span>
        </Card.Meta>
      )
    })
    return awardsArr;
  }

  /**
  function _getCorrectMedia
  @params media
  @returns string
  Return url for video links
  **/
  _getCorrectMedia = post => {
    let url = '';
    if(post.subreddit === 'gifs' || post.domain === 'gfycat.com')
      return post.preview.reddit_video_preview.fallback_url.replace(/&amp;/g, "&");
    let urlArr = post.media.oembed.html.split('"');
    for(let i = 0; i< urlArr.length; i++){
      if(_isValidURL(urlArr[i])){
        url = urlArr[i].replace(/&amp;/g, "&");
      }
    }
    if(url.indexOf('embedly') > -1){
      return post.media.oembed.url;
    }
    return url;
  }

  render() {
    const { post } = this.props;
    return (
      <Card className='_postCard'>
        <Card.Content>
          <div className='_authorAttr'>
            <Card.Meta className='_author'>
              <p>Posted by u/{post.author} </p>
            </Card.Meta>
            {post.author_flair_text &&
              <Card.Meta className='_flair'>
                <p>{post.author_flair_text} </p>
              </Card.Meta>
              }
              <Card.Meta className='_postedAgo'>
                <p>{_postedAgo(post.created_utc)}</p>
              </Card.Meta>
              {post.all_awardings.length > 0 &&
                (this._renderAwards(post.all_awardings, post.subreddit).map(el => {
                  return (el)
                }))
                }
            </div>
            <Card.Header>
              <span className='_postHeader'>{post.title}
              {post.link_flair_text &&
                <span className='_flair link_flair'>{post.link_flair_text}</span>
              }
              </span>
            </Card.Header>
            <div className='_subRedditContent'>
              { post.media && post.media.type ?
                (<ReactPlayer url={this._getCorrectMedia(post)} controls={true} width='100%'
          height='500px'/>)
              :
              (post.is_video ?
                (<ReactPlayer url={post.media.reddit_video.fallback_url} controls={true}  width='100%'/>)
                :  ((post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default')
                || post.subreddit === 'hmmm' ?
                <Image className='_postThumbnail' src={this._decodeImageUrl(post)} wrapped ui={true}/>
                : (<div className="_textContent">
                    <pre>
                    <span className='_semiPostContent'>
                      {_decodeHtml(post.selftext)}
                    </span>
                    </pre>
                    <p className="_readMore"></p>
                    </div>
                  )
                 )
               )
              }
            </div>
        </Card.Content>
        <Card.Content extra>
            <Icon name='comment' />
              {post.num_comments}<span className='_commentNos'> {post.num_comments ? 'comments' : 'comments'}</span>
            <Icon name='thumbs up outline' />
              {post.ups}<span> {post.ups ? 'likes' : 'likes'}</span>
        </Card.Content>
      </Card>
    );
  }
}

export default Posts;
