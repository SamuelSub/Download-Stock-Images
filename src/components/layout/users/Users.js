import React from 'react';
import UserItem from './UserItem';
import Spinner from '../Spinner';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {
  const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
  }

  if(loading) {
    console.log('test')
    return (
      <div>
        <Spinner />
      </div>
    ) 
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem key={user.id} user={user}/>
        ))}
      </div>
    )
  }    
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Users
