import React, { Fragment, useContext, useEffect } from 'react';
import Spinner from '../Spinner';
// import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../../context/github/githubContext';

const User = () => {

  const { user, loading} = useContext(GithubContext);

    if(loading) return <Spinner />

    console.log(user.links)

    return (
      <Fragment>
        <Link to='/' className="btn btn-light">Back To Search</Link>
          <a href={`https://unsplash.com/photos/${user.id}/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8Y2FyfGVufDB8fHx8MTY0NjU4OTc3NA&force=true`}download><button className='download-btn'>Download</button></a>
          <h1>{user.description}</h1>
          <img src={user.urls.regular} alt={user.alt_description} />
        {/* <Repos /> */}
      </Fragment>
    )
}

export default User
