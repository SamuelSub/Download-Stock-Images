import React, { useReducer } from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, displatch] = useReducer(GithubReducer, initialState);

  // Search Users

  const searchUsers = async text => {

    setLoading();

    const res = await fetch(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    const data = await res.json();

    displatch({
      type: SEARCH_USERS,
      payload: data.items
    });

  }

  // Get User

  const getUser = async username => {

    setLoading();

    const res = await fetch(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    const data = await res.json();
    
    displatch( {
      type: GET_USER,
      payload: data
    } );
    // console.log(username);

  }

  // Get Repos

  const getUserRepos = async username => {
    setLoading();

    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    const data = await res.json();

    displatch( {
      type: GET_REPOS,
      payload: data
    } );
  }  

  // Clear Users

  const clearUsers = () => displatch( { type: CLEAR_USERS } );

  // Set Loading 

  const setLoading = () => displatch( { type: SET_LOADING } );

  return <GithubContext.Provider 
    value={ {
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      clearUsers,
      searchUsers,
      getUserRepos,
      getUser
    } }
  >
    {props.children}
  </GithubContext.Provider>
}

export default GithubState