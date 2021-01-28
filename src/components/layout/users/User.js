import React, { Fragment, useContext, useEffect } from 'react';
import Spinner from '../Spinner';
import Repos from '../repos/Repos';
import { Link, useParams } from 'react-router-dom';
import GithubContext from '../../../context/github/githubContext';

const User = () => {

  const githubContext = useContext(GithubContext);

  const { user, loading, getUser, getUserRepos  } = githubContext;

  const { 
    name, 
    avatar_url, 
    location, 
    company, 
    bio, 
    blog, 
    // login, 
    html_url,
    followers, 
    following,      
    public_repos, 
    public_gists, 
    hireble 
   } = user;

   let { login } = useParams();

  useEffect(() => {
    getUser(login);
    getUserRepos(login);
    // eslint-disable-next-line
  }, []);


    if(loading) return <Spinner />

    return (
      <Fragment>
        <Link to='/' className="btn btn-light">Back To Search</Link>
        Hireble: {' '}
        {hireble ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" />}
        <div className="card grid-2">
          <div className="all-center">
            <img src={avatar_url} className="round-img" alt="" style={ { width: '150px' } }/>
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (<Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
              </Fragment>)}
              <a href={html_url} className="btn btn-dark my-1">Visit GitHub Profile</a>
              <ul>
                <li>
                  {login && <Fragment>
                    <strong>Username: {login}</strong>
                    </Fragment>}
                </li>
                <li>
                  {company && <Fragment>
                    <strong>Company: {company}</strong>
                    </Fragment>}
                </li>
                <li>
                  {blog && <Fragment>
                    <strong>Website: {blog}</strong>
                    </Fragment>}
                </li>
              </ul>
          </div>
        </div>

        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-light">Public Repos: {public_repos}</div>
          <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>

        <Repos />
      </Fragment>
    )
}

export default User
