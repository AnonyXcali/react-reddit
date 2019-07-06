import React, { Component } from 'react';
import { Card, Icon, Image  } from 'semantic-ui-react'
import ReactPlayer from 'react-player'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';



class Posts extends Component {

  _decodeURIComponent = url => {
    if(url){
      return url.images[0].resolutions[url.images[0].resolutions.length-1].url.replace(/&amp;/g, "&");
    }
  }

  _decodeHtml = selfText => {
    return selfText
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/&#039;/gi, "'")
      .replace(/&#x200B;/gi, "  ")

  }

  _isValidURL = str => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(str);
    }

  _getCorrectMedia = media => {
    let urlArr = media.oembed.html.split('"');
    let validUrl = '';
    for(let i = 0; i< urlArr.length; i++){
      if(this._isValidURL(urlArr[i])){
        return urlArr[i].replace(/&amp;/g, "&");
      }
    }
  }

  render() {
    const { post } = this.props;
    const nullImages = ['self', 'default'];
    return (
      <Card className='_postCard'>
        <Card.Content>
          <div className='_authorAttr'>
            <Card.Meta className='_author'>
              <p>Posted By u/{post.author} </p>
            </Card.Meta>
            {post.author_flair_text &&
              <Card.Meta className='_authorFlair'>
                <p>{post.author_flair_text} </p>
              </Card.Meta>
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
                (<ReactPlayer url={this._getCorrectMedia(post.media)} controls={true} width='100%'
          height='500px'/>)
              :
              (post.is_video ?
                (<ReactPlayer url={post.media.reddit_video.fallback_url} controls={true}  width='100%'
          height='100%'/>)
                :  (post.thumbnail && post.thumbnail != 'self' && post.thumbnail != 'default' ?
                <Image className='_postThumbnail' src={this._decodeURIComponent(post.preview)} wrapped ui={true}/>
                : (<div className="_textContent">
                    <pre>
                    <span className='_semiPostContent'>
                      {this._decodeHtml(post.selftext)}
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
