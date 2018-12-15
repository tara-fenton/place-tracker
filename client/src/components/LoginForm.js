import React from 'react';
import UserForm from './UserForm';

export default (props) => {
  return (
    <div>
      <h2>Login</h2>
      <UserForm
        onChange={props.onChange}
        onSubmit={props.onSubmit}
      />
    </div>
  )
}
