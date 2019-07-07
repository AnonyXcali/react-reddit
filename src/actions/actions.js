import fetch from 'isomorphic-fetch'

export const REQUEST_SUB_REDDIT_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'

/**
function requestSubRedditPosts
@params subreddit
returns Object containing type(action) , subreddit
**/

function requestSubRedditPosts(subreddit) {
    return {
        type: REQUEST_SUB_REDDIT_POSTS,
        subreddit
    }
}

/**
function receivePosts
@params subreddit, json
returns Object containing type(action) ,subreddit & posts
**/

function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data)
    }
}

/**
function selectSubreddit
@params subreddit, json
returns Object containing type(action) ,subreddit & posts
**/

export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

/**
function fetchPosts
  @params subreddit
  Responsible for -
    - Dispatching request to fetch data
    - Handling loading states via action dispatch
**/

export function fetchPosts(subreddit) {
    return dispatch => {
        dispatch(requestSubRedditPosts(subreddit))
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(subreddit, json)))
    }
}
