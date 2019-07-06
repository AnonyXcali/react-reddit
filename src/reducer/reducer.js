import { combineReducers } from 'redux'
import { SELECT_SUBREDDIT, REQUEST_SUB_REDDIT_POSTS, RECEIVE_POSTS } from '../actions/actions'

/**
TODO : Explain
**/

const selectedSubreddit = (state = 'Search for a Sub Reddit...', action) => {
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit
        default:
            return state
    }
}

const posts = (state = {
                   isFetching: false,
                   items: []
               }, action) => {
    switch (action.type) {
        case REQUEST_SUB_REDDIT_POSTS:
            return Object.assign({}, state, {
                isFetching: true
              })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.posts
              })
        default:
            return state
    }
}

const postsBySubreddit = (state = { }, action) => {
    switch (action.type) {
        case RECEIVE_POSTS:
        case REQUEST_SUB_REDDIT_POSTS:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
            });
        default:
            return state
    }
}



const reduceToGlobalStore = combineReducers({
  selectedSubreddit,
  postsBySubreddit
})


export default reduceToGlobalStore
