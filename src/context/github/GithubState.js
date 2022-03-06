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
let unsplashClientID;

if(process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
  unsplashClientID = process.env.REACT_APP_ACCESS_KEY;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
  unsplashClientID = process.env.ACCESS_KEY;
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

    // test

    const findImages = await fetch(`https://api.unsplash.com/search/photos/?client_id=${unsplashClientID}&query=${text}&per_page=30`);

    const resImages = await findImages.json();

    // console.log(resImages['results']);  

    // const res = await fetch(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    // const data = await res.json();

    displatch({
      type: SEARCH_USERS,
      payload: resImages['results']
    });

  }

  // Get User

  const getUser = async username => {

    setLoading();

    const findImage = await fetch(`https://api.unsplash.com/photos/${username}?client_id=${unsplashClientID}`);

    const resImage = await findImage.json();

    // console.log(resImage)

    // const res = await fetch(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    // const data = await res.json();
    
    displatch( {
      type: GET_USER,
      payload: resImage
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