import fetch from 'isomorphic-fetch'

/**
TODO : Write about functions here.
**/

export const REQUEST_SUB_REDDIT_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'

/**
TODO : Explain
**/

function requestSubRedditPosts(subreddit) {
    return {
        type: REQUEST_SUB_REDDIT_POSTS,
        subreddit
    }
}

/**
TODO : Explain
**/

function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data)
    }
}

/**
TODO : Explain
**/

export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

/**
TODO : Explain
**/

export function fetchPosts(subreddit) {
    return dispatch => {
        dispatch(requestSubRedditPosts(subreddit))
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(subreddit, json)))
    }
}
